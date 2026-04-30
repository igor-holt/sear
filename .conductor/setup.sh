#!/usr/bin/env bash
set -Eeuo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$repo_root"

export CONDUCTOR_PHASE="${CONDUCTOR_PHASE:-setup}"
START="$(date -u +%s)"

log() {
  printf '[setup] %s\n' "$*" >&2
}

lockfile_fingerprint() {
  local lockfile
  local -a hash_cmd

  for lockfile in pnpm-lock.yaml package-lock.json; do
    [ -f "$lockfile" ] || continue

    if command -v shasum >/dev/null 2>&1; then
      hash_cmd=(shasum -a 256)
    elif command -v sha256sum >/dev/null 2>&1; then
      hash_cmd=(sha256sum)
    else
      printf 'none\n'
      return 0
    fi

    "${hash_cmd[@]}" "$lockfile" | awk '{print substr($1, 1, 12)}'
    return 0
  done

  printf 'none\n'
}

emit() {
  local event_type="${1}"
  local status="${2:-ok}"
  local payload

  if [ -z "${CONDUCTOR_WORKSPACE:-}" ] || [ -z "${CONDUCTOR_API_KEY:-}" ]; then
    log "skipping ${event_type} emit; missing Conductor workspace context"
    return 0
  fi

  if ! command -v python3 >/dev/null 2>&1; then
    log "skipping ${event_type} emit; python3 is unavailable"
    return 0
  fi

  payload="$(
    EVENT_TYPE="$event_type" \
    EVENT_STATUS="$status" \
    EVENT_PHASE="$CONDUCTOR_PHASE" \
    EVENT_WORKSPACE="$CONDUCTOR_WORKSPACE" \
    EVENT_STARTED_AT="$START" \
    EVENT_LOCKFILE_HASH="$(lockfile_fingerprint)" \
    python3 - <<'PY'
import json
import os
import time

started_at = int(os.environ["EVENT_STARTED_AT"])
payload = {
    "schema_version": "1.0",
    "event_type": os.environ["EVENT_TYPE"],
    "workspace_id": os.environ["EVENT_WORKSPACE"],
    "phase": os.environ["EVENT_PHASE"],
    "status": os.environ["EVENT_STATUS"],
    "duration_s": max(0, int(time.time()) - started_at),
    "idempotency_key": (
        f"setup:{os.environ['EVENT_WORKSPACE']}:{os.environ['EVENT_LOCKFILE_HASH']}"
    ),
}
print(json.dumps(payload, separators=(",", ":")))
PY
  )"

  curl -fsS -X POST "${CONDUCTOR_URL:-https://conductor.build}/a2a/emit" \
    -H "Authorization: Bearer ${CONDUCTOR_API_KEY}" \
    -H 'Content-Type: application/json' \
    -d "$payload" >/dev/null || log "failed to emit ${event_type}"
}

trap 'emit "workspace.setup.failed" "$?"' ERR

ensure_node() {
  if command -v node >/dev/null 2>&1 && node -v | grep -q '^v22\.'; then
    return 0
  fi

  if ! command -v curl >/dev/null 2>&1; then
    log "curl is required to install Node.js 22"
    return 1
  fi

  if ! command -v fnm >/dev/null 2>&1; then
    curl -fsSL https://fnm.vercel.app/install | bash
    export PATH="$HOME/.fnm:$PATH"
  fi

  eval "$(fnm env --shell bash)"
  fnm install 22
  fnm use 22
}

pnpm_exec() {
  if command -v corepack >/dev/null 2>&1; then
    corepack enable >/dev/null 2>&1 || true
    corepack pnpm "$@"
    return 0
  fi

  if ! command -v pnpm >/dev/null 2>&1; then
    npm i -g pnpm@10.27.0
  fi

  pnpm "$@"
}

hydrate_env() {
  if [ -f .env.local ]; then
    return 0
  fi

  if [ -z "${CONDUCTOR_WORKSPACE:-}" ]; then
    log "skipping secrets pull; CONDUCTOR_WORKSPACE is unset"
    return 0
  fi

  if ! command -v conductor >/dev/null 2>&1; then
    log "skipping secrets pull; conductor CLI is unavailable"
    return 0
  fi

  conductor secrets pull --workspace "${CONDUCTOR_WORKSPACE}" > .env.local
}

seed_local_state() {
  [ -f scripts/seed-local.ts ] || return 0
  if ! pnpm_exec exec tsx scripts/seed-local.ts; then
    log "local seed failed; continuing without seeded state"
  fi
}

mkdir -p .conductor/logs

ensure_node
pnpm_exec install --frozen-lockfile
hydrate_env
seed_local_state
emit "workspace.setup.completed" "ok"
