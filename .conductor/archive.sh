#!/usr/bin/env bash
set -euo pipefail

mkdir -p ".conductor/logs"
printf 'workspace.archive schema_version="1.0" idempotency_key="archive:%s"\n' "$(pwd)"
