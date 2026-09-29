# Genova · Item Setup: clickable prototype

**Representative prototype · synthetic data.** This is not McKesson's production system. All suppliers, NDCs, cases and numbers are synthetic.

A single, self-contained HTML prototype for the Project Genova Phase 2 proposal. It opens on a simulated Okta sign-in, then follows one case (CASE-0091) around the full loop: PM queue → case review with a calibrated trust score → PM correction → Rule Tower (rule change, compiled rule, checks, sandbox, change proposal, review, merge, revert) → case re-run → approval and output → AI Ops.

The look follows the McKesson design reference (`cash-flow-intelligence-v12.html`): its tokens, type scale, app shell, landing page and components.

Prototype by Tiger Analytics.

## Run it

- **Locally:** double-click `genova_demo.html`. It runs fully offline and makes no network calls.
- **Hosted:** GitHub Pages serves the same file (the site root redirects to it).

No build step, framework or install is needed. It uses system fonts only and keeps all state in memory. State persists across persona switches and sign-outs; **Reset demo** (director panel) restores the starting state and returns to the landing page.

Optimised for 1440×900 on a projector. It also works at 1280×720.

## Personas

Roles, not headcount: one person may hold several roles, but never proposes and approves the same change. No personal names appear anywhere.

| Persona | Starts in | Does |
|---|---|---|
| Product Manager · Generics | Case Queue | Works cases (edit with reason codes, accept, approve and submit, re-run), authors rules, runs the sandbox, opens proposals and answers review comments |
| Category Lead · Generics | Rule Tower · Proposals | Reviews, comments, requests changes, approves and merges proposals; approves golden-set promotions and rollbacks |
| Genova Platform Owner | AI Ops | Second approval on Interpretive (prompt) changes and model-pin changes; owns cost, drift, consistency and reliability; approves triage fixes; sees the access log |

Approvals: Governed, Deterministic and Reference changes need the Category Lead; Interpretive changes and model-pin changes need the Category Lead and the Platform Owner; a rollback needs one of them. The proposer's Approve button is always disabled ("Proposer cannot approve their own change").

Sign in from the landing page with **Sign in with Okta** → choose a persona tile → Okta push verify. The tiles' "today" lines are computed from live state. Switch persona from the user chip (top right) or the director; hand-off buttons ("Switch to Category Lead to review →") switch with a short verify and land on the right screen.

## Presenter controls

| Key / control | What it does |
|---|---|
| `→` | Advance to the next step of the scripted happy path |
| `D` | Show or hide the demo director panel |
| `Esc` | Close popovers, drawers and dialogs |
| `Alt+←` / `Alt+→` | Back and forward through every screen visited (also the arrows in the top bar) |
| Director · Jump to | Queue, AI Ops, Case 0091 before edit / after re-run, audit logs (0091, 0098), rule map (coverage, dependency, Masters), AI boundaries, Proposals, Proposal CP-0014, or any Rule Tower scenario |
| Director · Sign in as… | Switch to any persona without the verify step; **Back to landing page** signs out |
| Director · Speed | Normal or Fast (Fast cuts simulated latencies, including Okta verify, by 70%) |
| Director · Presenter zoom | 100%, 110% (default) or 125% for projector readability |
| Director · Spotlight: next callout | Steps a spotlight through the key regions of the current screen; Alt+click spotlights any tile |
| Director · toggles | Show trace panels, LLM lens, Scripted review comment |
| Director · Approve case | Shortcut to the approved, locked state of CASE-0091 |
| ✦ LLM lens (top bar) | Tints every place an LLM is involved and marks the controls an LLM never decides |
| User chip (top right) | Switch persona (demo) or sign out |

## The scripted path

Sign in as the Product Manager → Queue → CASE-0091 (25 of 34 fields ≥ 95%, expected corrections 2.0) → trust drill-down on MOQ (72%) → spot-audit and accept the 25 high-trust fields → edit MOQ to 1 with reason "Write-in overrides checkbox" → pattern suggestion card → Rule Tower (S1 prefilled, still the PM) → Interpret → Confirm → compiled rule → Checks → Golden sandbox → Replay → open change proposal CP-0014 → switch to the Category Lead → approve → Merge (MOQ v0.4) → switch to the Product Manager → Re-run (MOQ = 1 at 96%, 26/34, 1.7) → Approve & Submit (values locked, output checked 34/34) → switch to the Platform Owner → AI Ops.

With **Scripted review comment** on, the Category Lead first asks about illegible handwriting and requests changes; the Product Manager adds the fallback step, checks re-run, and the review completes.

The audit-log clock is deterministic: scripted actions stamp their planned times (09:40:12 opened, 09:43:37 MOQ edit, …) so every rehearsal shows identical timestamps.

Every step works by mouse, or by pressing `→` repeatedly; the `→` path hands off between personas with the short Okta verify.

## Rule Tower scenarios

The LLM is **simulated**: every interpretation comes from preconfigured scenarios, so the demo is deterministic and cannot fail on stage. Free text is matched to a scenario by keyword; unmatched text falls back to S0.

| Chip | Scenario | Shows |
|---|---|---|
| Handwritten MOQ | S1 · Direct rule update | Happy path: MOQ v0.3 → v0.4, 3 golden changes, replay matches 9 of 11 PM edits |
| Supplier MOQ override | S2 · Rule clash | Clash with the live MOQ rule; resolution (a) causes a regression, (b) passes |
| Bulk packs | S3 · Ambiguous wording | Two clarification questions, then an intended change the Category Lead must confirm |
| Manufacturer size formula | S4 · Dependency loop | Circular dependency caught; fixed by reading a raw input |
| Selling unit = EA | S5 · Regression | Checks pass but 12 golden regressions block submit; narrowed suggestion fixes it |
| Cold-chain flag to EDM | S6 · Needs a release | Outside Rule Tower scope; raises change request CR-0142 |
| Read '10 x 1 mL' | S7 · Prompt edit | Interpretive tier: prompt diff, consistency 3/3, shadow run on by default, needs the Category Lead and the Platform Owner |
| Abbreviation VL | S8 · Lookup update | Reference tier, lighter test path |
| Injection attempt | S9 · Guardrail | Blocked at the model gateway, logged as AUD-7781 |
| (any unmatched text) | S0 · Fallback | Asks which attribute the rule is about |

Recommended live path: S1 (via the PM hand-off) → S2 → S5 or S6. The others are for Q&A. Each of S1–S8 ends in a change proposal (CP-0014 onwards); S6 raises a change request instead, and S9 creates nothing but a security event.

## What else is in the demo

- **Calibrated trust score:** each field shows a probability that its value is correct, calibrated on PM decisions (weighted geometric mean of OCR, LLM, rule, lookup and cross-check signals → calibration curve v5). Bands: ≥ 95 good to accept, 80–94 review, < 80 escalate.
- **Execution tags:** every field is tagged Static, Direct, Lookup, Interpretive (LLM step) or Derived (code); 29 of 34 fields use no LLM at runtime.
- **Audit log:** a hash-chained timeline per case with field lineage, filters and JSON/CSV export; live actions append as they happen.
- **Proposals and versions:** rule changes go through propose → review → merge, with separation of duties, tier-based approvals, three-layer diffs, version history with case counts, and one-approval reverts.
- **Rule map:** coverage and dependency lenses, seeded gaps, and an illustrative Masters inheritance view.
- **AI boundaries:** what the LLM does, what runs without an LLM, and what an LLM must never decide.
- **CASE-0098:** a failed intake handled loudly (retries, dead-letter, routed to the PM).
- **AI Ops:** cost panel, reliability, consistency monitor, drift, autonomy ladder, gateway trace, triage and (for the Platform Owner) the Okta access log.

## Tests

`tests/` holds a headless-Chrome test harness that walks every scenario and the full path at both display sizes. See [tests/README.md](tests/README.md).

## Repository layout

```
genova_demo.html   the prototype (all CSS and JS inline)
index.html         redirects the Pages root to genova_demo.html
tests/             headless-Chrome test harness
```
