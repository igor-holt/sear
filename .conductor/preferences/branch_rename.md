# forge://preferences/branch_rename@1.0

When renaming a fresh branch, derive the name from the first user message.

Format: `<type>/<scope>-<slug>`

- `type` is one of `feat`, `fix`, `chore`, `docs`, `refactor`, `perf`, `test`, `infra`
- `scope` is inferred from touched paths, falling back to the repo primary area
- `slug` is lowercase, hyphenated, and at most 40 characters

Rules:

- Never include dates, initials, or ticket IDs
- If the first message is ambiguous, ask one clarifying question before renaming
- Existing renamed branches are never re-renamed
