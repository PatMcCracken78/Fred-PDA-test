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
4. Read current Ax-Bridge documentation before assuming transport, approval, HODOR/OPEN-HOLD, Away Mode, OAuth, or capability semantics.
5. Use registered semantic operations only. Never substitute arbitrary shell, sudo, root shell, or free-form command execution.
6. Return and preserve execution evidence: request ID, decision, bridge state, session, operation, return code, stdout/stderr metadata, Hold metadata when present, and relevant digests when available.

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

## Normal OPEN mode

Normal OPEN uses a sliding inactivity lease with a hard session lifetime. Successful authorized work may renew inactivity within that normal hard boundary. Denied, malformed, status-only, unknown, or no-op traffic does not renew it.

## HODOR / OPEN-HOLD mode

`OPEN-HOLD` is implemented and qualified. Bridgetender exposes it as **HODOR MODE / HOLD THE DOOR**.

HODOR is a bounded liveness mode, not a broader authorization level.

Qualified behavior:

- Greg/Storm must first OPEN the bridge locally.
- HODOR can only be armed or re-armed locally through Bridgetender.
- Qualified presets are **30 minutes, 2 hours, 4 hours, and 8 hours**.
- Eight hours is the maximum Hold window.
- While active, normal idle expiry is suspended.
- Activity does **not** slide or extend the Hold deadline.
- Hold can outlive the normal OPEN four-hour hard lifetime because it is a separate locally authorized Hold lease.
- Manual CLOSE/kill immediately overrides Hold.
- At the Hold deadline the bridge automatically becomes CLOSED; it does not fall back to normal OPEN.
- Re-arm is a fresh local authorization with a new Hold ID and fresh deadline.
- Remote broker traffic, Ax, projects, GitHub, or capabilities cannot arm, re-arm, or extend HODOR.
- Daemon crash/restart clears Hold authority and the replacement daemon starts CLOSED.

Each Hold is recorded in a dedicated hash-chained audit and sealed when the Hold ends.

Broker crossing evidence during HODOR exposes `OPEN-HOLD`, session ID, Hold ID, Hold expiry, and remaining seconds. Ax can therefore answer live questions such as **“how long until the door closes?”** from bridge evidence rather than UI inference.

## Approval behavior during HODOR

HODOR does **not** make plain chat text an authorization credential.

A newly pending capability still requires a qualified approval path. Remote chat approval is not considered authoritative until Greg/Storm's remote identity can be strongly bound to the exact request/capability, request digest, Hold ID, bridge session, timestamp, and expiry.

No blanket, wildcard, inherited, or changed-request approval is valid.

OAuth-backed remote identity/authorization remains the permanent target.

## Bridgetender operating model

Bridgetender is the local macOS control surface. The menu-bar bridge icon is intended to remain available while logged in even when the bridge itself is CLOSED.

Local control model:

- show Bridgetender from the menu bar;
- OPEN or CLOSE the bridge locally;
- arm/re-arm HODOR locally;
- review/approve registered capability requests;
- inspect current gate/session/Hold state.

Closing the bridge closes the gate; it should not terminate Bridgetender.

## Future Away Mode

Rare multi-day travel/vacation continuity will require a separate future **Away Mode** rather than extending HODOR for days.

Away Mode is **not implemented or qualified**. Do not infer remote wake/open authority from HODOR. Until a separate design is implemented and qualified, current remote transport cannot independently OPEN the bridge.

## Repository responsibility

This repository remains authoritative for its own domain behavior. Do not move project intelligence into Ax-Bridge. If a new project action is needed, define a narrow semantic capability in the project repository, document its side effects and evidence, then let Ax-Bridge enforce the crossing policy.

## Canonical source and drift rule

Canonical bridge architecture, security rules, qualification evidence, lifecycle decisions, HODOR semantics, and future OAuth/Away Mode decisions live in `PatMcCracken78/Ax-Bridge`.

If this distributed instruction copy conflicts with newer Ax-Bridge documentation, **Ax-Bridge wins**. Update the distributed copy rather than inventing local bridge policy.
