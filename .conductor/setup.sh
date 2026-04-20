#!/usr/bin/env bash
set -euo pipefail

log_dir=".conductor/logs"
mkdir -p "$log_dir"

printf 'workspace.setup schema_version="1.0" idempotency_key="setup:%s"\n' "$(pwd)"
