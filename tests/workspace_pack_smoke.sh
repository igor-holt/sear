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
