#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$repo_root"

python3 - <<'PY'
import json
from pathlib import Path

data = json.loads(Path("conductor.json").read_text())
expected = {
    "setup": ".conductor/setup.sh",
    "run": ".conductor/run.sh",
    "archive": ".conductor/archive.sh",
}
assert data.get("scripts") == expected, data
PY

for file in \
  .conductor/setup.sh \
  .conductor/run.sh \
  .conductor/archive.sh \
  tests/workspace_pack_smoke.sh
do
  [ -x "$file" ] || { echo "$file is not executable"; exit 1; }
  bash -n "$file"
done

for file in \
  .conductor/preferences/branch_rename.md \
  .conductor/preferences/general.md \
  .conductor/logs/.gitkeep
do
  [ -f "$file" ] || { echo "missing $file"; exit 1; }
done

grep -qxF '.conductor/logs/' .gitignore

tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT
mkdir -p "$tmpdir/bin" "$tmpdir/home"

cat > "$tmpdir/bin/node" <<'EOF'
#!/usr/bin/env bash
printf 'v22.14.0\n'
EOF

cat > "$tmpdir/bin/corepack" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

if [ "${1:-}" = "enable" ]; then
  exit 0
fi

if [ "${1:-}" = "pnpm" ]; then
  shift
  exec pnpm "$@"
fi

echo "unexpected corepack args: $*" >&2
exit 1
EOF

cat > "$tmpdir/bin/pnpm" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
printf '%s\n' "$*" >> "$TEST_PNPM_LOG"
EOF

cat > "$tmpdir/bin/curl" <<'EOF'
#!/usr/bin/env bash
echo "curl should not run without Conductor auth context" >&2
exit 99
EOF

cat > "$tmpdir/bin/conductor" <<'EOF'
#!/usr/bin/env bash
echo "conductor should not run without CONDUCTOR_WORKSPACE" >&2
exit 98
EOF

chmod +x "$tmpdir/bin/node" \
  "$tmpdir/bin/corepack" \
  "$tmpdir/bin/pnpm" \
  "$tmpdir/bin/curl" \
  "$tmpdir/bin/conductor"

TEST_PNPM_LOG="$tmpdir/pnpm.log" PATH="$tmpdir/bin:$PATH" HOME="$tmpdir/home" \
  env -u CONDUCTOR_API_KEY -u CONDUCTOR_WORKSPACE bash .conductor/setup.sh

grep -qxF 'install --frozen-lockfile' "$tmpdir/pnpm.log"
