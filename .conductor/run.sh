#!/usr/bin/env bash
set -euo pipefail

printf 'workspace.run schema_version="1.0" idempotency_key="run:%s" status="unconfigured"\n' "$(pwd)"
printf 'Update %s when the repo gains a runnable service or test target.\n' ".conductor/run.sh"
