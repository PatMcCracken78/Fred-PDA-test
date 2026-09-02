# Ax-Bridge Participation Instructions

## Purpose

Ax-Bridge is the bounded transport and policy bridge between ChatGPT/Ax and local project environments. It is a **bridge, not a brain**: project logic, data, and domain decisions remain in the project repository. Ax-Bridge only provides controlled discovery, authorization, execution, and evidence return.

This repository carries a synchronized copy of the canonical participation guide from `PatMcCracken78/Ax-Bridge` so a fresh chat can discover how to use the bridge without relying on prior conversation memory.

## Fresh-chat startup procedure

When working in this repository from a new chat:

1. Read this file first.
2. Read the repository's current `README`, architecture/security docs, and engineering ledger entries relevant to the requested work.
3. Look for a root-level `AX_BRIDGE_CAPABILITIES.json` manifest.
   - If present, treat it as the repository's advertised semantic capability surface.
   - If absent, the repository is **not automatically executable through Ax-Bridge** merely because this instruction file exists.
4. Read the current Ax-Bridge repository documentation before assuming transport, approval, OPEN-HOLD, OAuth, or capability semantics.
5. Use registered semantic operations only. Never substitute arbitrary shell, sudo, root shell, or free-form command execution.
6. Return and preserve execution evidence: request ID, decision, session, operation, return code, stdout/stderr metadata, and relevant digests when available.

## Core security model

- Greg/Storm is the Bridgetender and retains authority over consequential actions.
- The bridge starts CLOSED after daemon lifecycle changes and must fail closed on ambiguity.
- OPEN state and operation approval are separate controls.
- A successful authorized crossing may renew the normal inactivity lease; denied, malformed, status-only, unknown, or no-op traffic must not.
- Manual CLOSE and kill-switch actions always win.
- Targets define their own roots, manifests, adapters, and allowed operations.
- Filesystem access must stay inside registered/canonicalized roots.
- No unrestricted remote shell or general sudo/admin credential path is allowed.
- Never request, transmit, store, or log the macOS administrator password.
- Capability approvals are exact and scoped. Do not broaden approval through wildcard interpretation.
- Persistent `Trust` must not be relied upon until approval is bound to a capability definition fingerprint/digest.

## Capability discovery and execution

A participating project advertises semantic operations in `AX_BRIDGE_CAPABILITIES.json`. The manifest describes what the project can do; Ax-Bridge policy decides whether a requested operation may run.

Expected flow:

`authorized client -> Ax-Bridge -> policy/authorization -> registered target capability -> result/evidence`

A valid advertised capability can still require approval. Discovery is broad; execution authority remains narrow.

If a capability changes meaning, argv, adapter, privilege, or side effects before definition-bound approval exists, use a **new capability name/version** so a previous approval cannot silently carry forward.

## Approval behavior

Normal mode uses the local Bridgetender approval surface for new capability approval. If the UI is unavailable, use only the documented local fallback control path; do not smuggle new behavior through an already-approved capability.

A planned interim `OPEN-HOLD` mode has been architected to support bounded remote continuity while Greg is away from the Mac. It is **not permanent architecture** and must not be assumed available until the Ax-Bridge repo marks it implemented and qualified. The intended interim design suspends idle expiry for a bounded locally armed window, enables sealed audit logging, and may permit exact-request remote approval bound to Greg's authenticated session. The long-term replacement is OAuth-backed remote identity/authorization.

## Bridgetender operating model

Bridgetender is the local macOS control surface. The menu-bar bridge icon is intended to remain available while logged in even when the bridge itself is CLOSED.

Normal local control model:

- show Bridgetender from the menu bar
- OPEN or CLOSE the bridge locally
- review/approve registered capability requests
- inspect current gate/session state

Closing the bridge closes the gate; it should not terminate Bridgetender.

## Repository responsibility

This repository remains authoritative for its own domain behavior. Do not move project intelligence into Ax-Bridge. If a new project action is needed, define a narrow semantic capability in the project repository, document its side effects and evidence, then let Ax-Bridge enforce the crossing policy.

## Canonical source and drift rule

Canonical bridge architecture, security rules, qualification evidence, and lifecycle decisions live in `PatMcCracken78/Ax-Bridge`.

If this distributed instruction copy conflicts with newer Ax-Bridge documentation, **Ax-Bridge wins**. Update the distributed copy rather than inventing local bridge policy.
