# velyncash-core

Core domain logic for **Velyn.Cash** — authentication, wallets, payments, cards, and notifications.

This repository is intentionally **framework-agnostic**.  
No UI. No API transport. No database drivers.  
Only reusable business rules that can be shared across:
- `velyn-app` (mobile)
- `velyn-web` (frontend)
- `velyncash-backend` (API/services)

---

## Modules

- **auth**: signup/signin flows, PIN verification, session rules
- **wallet**: wallet identity, balances, address book, transfer intent
- **payments**: payment request (QR), pay flow, fiat/crypto conversion rules
- **cards**: virtual card lifecycle (create/lock/unlock), limits, security rules
- **notifications**: notification events + templates (wallet activity, payment status)

---

## Package structure

- `src/*/entities` : domain entities (pure types + invariants)
- `src/*/services` : business logic (use-cases)
- `src/*/adapters` : interface contracts for infra (blockchain, providers, etc.)
- `src/shared` : errors, utilities, constants

---

## Install

```bash
npm install
