# Architecture

`velyncash-core` contains domain rules only.

Boundaries:
- No UI rendering
- No HTTP handlers
- No database drivers
- No provider secrets

All integrations are abstracted via adapters/contracts.
