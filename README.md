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

Any Senior PM can approve a rule change, but never their own. No personal names appear anywhere.

| Persona | Starts in | Does |
|---|---|---|
| Product Manager · Generics | Item setup case queue | Works cases (edit with reason codes, accept, approve and submit, close, re-run), authors rules, runs the sandbox, opens proposals, answers review comments, requests golden-set promotions and proposes rollbacks |
| Senior Product Manager · Generics | Rule Tower · Proposals › Awaiting me | Reviews, comments, requests changes, approves and merges proposals; approves golden-set promotions and rollbacks; case queue and AI Ops are read-only |
| Admin · Genova platform | AI Ops | Monitors cost, drift, consistency and reliability; confirms triage priority and approves triage fixes; sees the sign-in log; proposes model-pin changes (seed CP-0009) and rollbacks; never approves rule changes |

Approvals:

| Change type | Proposed by | Required to merge |
|---|---|---|
| Governed tier rule | Product Manager | Senior PM approval |
| Interpretive tier (prompt edits) | Product Manager | Senior PM approval and all automated technical gates passed |
| Reference tier (lookups) | Product Manager | Senior PM approval |
| Model pin change | Admin | Senior PM approval and all automated technical gates passed |
| Golden-set promotion | Product Manager | Senior PM approval |
| Rollback (revert proposal) | Product Manager or Admin | Senior PM approval |

The proposer's Approve button is always disabled ("Proposer cannot approve their own change"); anyone else who is not the Senior PM sees a disabled Approve with "Rule changes are approved by the Senior Product Manager".

**Technical gates · automated** replace a human technical approval on Interpretive and model-pin proposals. They run right after the 8 proposal checks: Consistency (10/10 runs identical), Golden-set regression (0 regressions on 50 golden cases), Output schema unchanged, Model gateway checks (8/8) and Cost impact within budget headroom. They appear as their own group on the Checks tab and as a stage in the approval tracker (Draft → Checks passed → Technical gates · automated → Senior PM review → Merged · live); Governed and Reference proposals skip the stage. A failing gate shows in red and disables merge ("Technical gate failed · fix and re-run checks"); the director toggle **Fail a technical gate (demo)** makes Consistency fail on gated proposals.

Sign in from the landing page with **Sign in with Okta** → choose a persona tile → Okta push verify. The tiles' "today" lines are computed from live state. Switch persona from the user chip (top right) or the director; hand-off buttons ("Switch to Senior PM to review →") switch with a short verify and land on the right screen.

## Presenter controls

| Key / control | What it does |
|---|---|
| `→` | Advance to the next step of the scripted happy path |
| `D` | Show or hide the demo director panel |
| `Esc` | Close popovers and dialogs |
| `Alt+←` / `Alt+→` | Back and forward through every screen, Rule Tower tab, selected rule and opened proposal (also the arrows in the top bar) |
| `Ctrl+K` / `Cmd+K` | Open the rule picker anywhere in the Rule Tower (↑ ↓ move, Enter open, Esc close) |
| Director · Jump to | Queue, AI Ops, Case 0091 before edit / after re-run, audit logs (0091, 0098), rule map (coverage, dependency, Masters), AI boundaries, Rule Tower · Overview as the current persona, Proposals, Open CP-0014 |
| Director · Rule Tower scenarios | S0–S9 open Proposals › New proposal for the target rule with the stepper at Describe and the text prefilled (S4 opens Manufacturer size) |
| Director · Sign in as… | Switch to any persona without the verify step; **Back to landing page** signs out |
| Director · Speed | Normal or Fast (Fast cuts simulated latencies, including Okta verify, by 70%) |
| Director · Presenter zoom | 100%, 110% (default) or 125% for projector readability |
| Director · Spotlight: next callout | Steps a spotlight through the key regions of the current screen; Alt+click spotlights any tile |
| Director · toggles | Scripted review comment · Fail a technical gate (demo) |
| Director · Queue | **Simulate new email** (see Case queue), **Finish digitizing CASE-0097** (otherwise it finishes 60 s after the queue is first shown) or a simulated case, and **Reset queue filters** |
| Director · Approve case | Shortcut to the approved, locked state of CASE-0091 |
| User chip (top right) | Switch persona (demo) or sign out |

## The scripted path

Sign in as the Product Manager → Queue → CASE-0091 (fields ready 25/34 · case confidence 94% · alert checks 8/9, lowest field MOQ 72%) → trust drill-down on MOQ (72%) → spot-audit and accept the 25 high-trust fields → edit MOQ to 1 with reason "Write-in overrides checkbox" → pattern suggestion card → Proposals › New proposal · MOQ with the stepper at Describe (S1 prefilled, still the PM) → Interpret → Confirm → Checks → Test (golden set, replay) → Submit: open change proposal CP-0014 → switch to the Senior PM → Proposals › Awaiting me → approve → Merge (MOQ v0.4) → switch to the Product Manager → Re-run (MOQ = 1 at 96% · fields ready 26/34 · case confidence 95% · lowest field Pallet Ti × Hi 76%) → Approve & Submit (values locked, output checked 34/34) → switch to the Admin → AI Ops.

With **Scripted review comment** on, the Senior PM first asks about illegible handwriting and requests changes; the Product Manager adds the fallback step, checks re-run, and the review completes.

The audit-log clock is deterministic: scripted actions stamp their planned times (09:40:12 opened, 09:43:37 MOQ edit, …) so every rehearsal shows identical timestamps.

Every step works by mouse, or by pressing `→` repeatedly; the `→` path hands off between personas with the short Okta verify.

## Rule Tower layout

Four tabs: **Overview · Rules · Proposals · Map**. The Rule Tower opens on Overview for every persona.

- **Overview**: KPIs (rules live 31/34, open proposals, coverage gaps, accepted unchanged), persona-specific *Needs your attention* items, coverage gaps and recent changes.
- **Rules**: a searchable rule picker below the tabs (34 attribute rules + 4 lookups and prompts, with a pinned *Needs attention* group for rules at or above their review threshold or with an open proposal; Ctrl+K from any Rule Tower tab). Each rule page has:
  - on the left, a rule summary (name, one status chip plus an open-proposal chip, the live rule as numbered steps, *Cases on v…* and *PM corrections* with the last-30-days and since-live rates, a trend and bars against the 2.0% review threshold) and a corrections card (reason-code bars that filter the recent corrections list; rows open the case on the field);
  - on the right, the primary action (Propose a change, Continue draft or Create rule for the Product Manager; read-only text for the Senior PM and Admin), the correction pattern card and the version history (Compare with the previous version, Test evidence).
  - MOQ starts at 5 of 215 cases (2.3%, rising) in the last 30 days and 10 of 860 since v0.3 went live; the demo edit on CASE-0091 moves it to 6 of 215 (2.8%) and 11 of 860, and the pattern card to 4 corrections.
- **Proposals › New proposal**: every authoring entry point (Propose a change, Continue draft, Create rule, Start proposal from this pattern, the case suggestion card and the director presets) opens a new draft proposal with a back link to the rule, the current rule, and the **Propose a change** stepper (Describe · Confirm · Checks · Test · Submit).
- **Proposals**: Awaiting me · My proposals · All. A proposal page has the same skeleton: hero with the persona's primary action, Changes / Checks / Conversation, and a rail with the approval flow, versions and impact. CP-0012 (INFOREM, changes requested) and CP-0013 (Storage temperature, Interpretive, technical gates passed, awaiting the Senior PM) are live and can be answered, approved and merged. CP-0009 (model pin, proposed by the Admin) is historical.
- **Map**: coverage and dependency lenses. Clicking an attribute opens its rule page.

## Rule Tower scenarios

The LLM is **simulated**: every interpretation comes from preconfigured scenarios, so the demo is deterministic and cannot fail on stage. Free text is matched to a scenario by keyword; unmatched text falls back to S0.

| Chip | Scenario | Shows |
|---|---|---|
| Handwritten MOQ | S1 · Direct rule update | Happy path: MOQ v0.3 → v0.4, 3 golden changes, replay matches 9 of 11 PM edits |
| Supplier MOQ override | S2 · Rule clash | Clash with the live MOQ rule; resolution (a) causes a regression, (b) passes |
| Bulk packs | S3 · Ambiguous wording | Two clarification questions, then an intended change the Senior PM must confirm |
| Manufacturer size formula | S4 · Dependency loop | Circular dependency caught; fixed by reading a raw input |
| Selling unit = EA | S5 · Regression | Checks pass but 12 golden regressions block submit; narrowed suggestion fixes it |
| Cold-chain flag to EDM | S6 · Needs a release | Outside Rule Tower scope; raises change request CR-0142 |
| Read '10 x 1 mL' | S7 · Prompt edit | Interpretive tier: prompt diff, consistency 3/3, shadow run on by default, automated technical gates, then the Senior PM |
| Abbreviation VL | S8 · Lookup update | Reference tier, lighter test path |
| Injection attempt | S9 · Guardrail | Blocked at the model gateway, logged as AUD-7781 |
| (any unmatched text) | S0 · Fallback | Asks which attribute the rule is about |

Recommended live path: S1 (via the PM hand-off) → S2 → S5 or S6. The others are for Q&A. Each of S1–S8 ends in a change proposal (CP-0014 onwards); S6 raises a change request instead, and S9 creates nothing but a security event.

## Case queue

The Product Manager's start screen, **Item setup case queue**. Times derive from the demo clock (`DEMO_DATE`, today 10:00); SLA time left is computed from each case's stored due time.

- **Four statuses:** Digitizing · Needs action · Ready to approve (all fields ≥ 95% and all 9 alert checks passed) · Done (submitted or closed). A muted second line shows the digitizing step, an intake problem, "Follows CASE-0096", or the outcome.
- **Real-time mailbox:** the header shows **Gx mailbox connected · real-time** with a pulsing dot; its tooltip gives the last email time (09:58 for CASE-0101). Every case's audit log starts with "Email received via mailbox push notification · Gx mailbox · 3 attachments". The director's **Simulate new email** creates CASE-0102 (then 0103…) from Supplier R, S, … with a highlighted row, a toast and a mailbox pulse; it steps through digitizing every 6 s and becomes Ready to approve after about 36 s (or on **Finish digitizing**).
- **Tiles:** Needs action 6 · Ready to approve 3 · Digitizing 2 · Done 17 by default. They follow the Received and Supplier filters, and clicking one filters the table.
- **Filters:** search (case ID, NDC, supplier), Open / Done / All tabs with counts, Received (Today, Last 7 days, Last 30 days, This month), Supplier, and the chips SLA at risk, Failed alert checks and Low confidence (combined with AND). Case, SLA and Case confidence headers sort.
- **Safeguard:** a time filter never silently hides open work. Open cases received before the period raise a notice; **Show** adds them with an "Outside period" chip (CASE-0068 by default).
- **Columns:** Fields ready (fields ≥ 95% across all NDCs), Case confidence (simple average of all scored fields), Lowest field (opens the case on that field), Alert checks (hover card lists all 9, failures open the case on the related field), Download, Open case.
- **Closing a case:** Close case (in any open case) takes a reason: Duplicate NDC, More info requested from supplier, Not a new item, Wrong category, Supplier withdrew. There is no "waiting on supplier": the supplier's reply arrives as a new, linked case (CASE-0096 → CASE-0100). CASE-0098's resubmission request closes it with "More info requested from supplier".
- **Case pages:** CASE-0091 and CASE-0098 have their full walkthrough views; every other case opens a read-only summary with its per-NDC fields, scores, failed checks and audit log. Done cases open on the audit log.

## Excel downloads

Submitted cases download the **approved output**; Ready and Needs action cases (with digitized fields) download a **draft**. Files are Excel 2003 XML Spreadsheets (`.xls`, generated in the browser; Excel may warn about the format), named like `CASE-0091_Xiromed_APPROVED.xls`:

- **Item setup:** header block (case, supplier, NDC count, received, exported by the current persona, then the approval line with checksum, or a red **DRAFT – NOT APPROVED** row), then one row per NDC with the 34 attributes.
- **Evidence:** one row per NDC × attribute with group, value, confidence, field type, source, rule and version, and PM edits.
- **Alert checks:** one row per NDC × check with result and detail.

CASE-0091 exports its live values (edits, re-run, approval); other cases use deterministic synthetic values that reproduce their queue numbers exactly. Every download adds an audit event with the persona's role.

## What else is in the demo

- **Calibrated trust score:** each field shows a probability that its value is correct, calibrated on PM decisions (weighted geometric mean of OCR, LLM, rule, lookup and cross-check signals → calibration curve v5). Bands: ≥ 95 good to accept, 80–94 review, < 80 escalate.
- **Execution tags:** every field is tagged Static, Direct, Lookup, Interpretive (LLM step) or Derived (code); 29 of 34 fields use no LLM at runtime.
- **Audit log:** a hash-chained timeline per case with field lineage, filters and JSON/CSV export; live actions append as they happen.
- **Proposals and versions:** rule changes go through propose → review → merge, with separation of duties, Senior PM approval, automated technical gates for prompt and model-pin changes, three-layer diffs, version history with case counts, and reverts.
- **Rule map:** coverage and dependency views, seeded gaps, and an illustrative Masters inheritance view.
- **Category roadmap:** Masters, Northstar, OTC and Specialty are labelled **Future release** (discovery and readiness assessment come first).
- **AI boundaries:** what the LLM does, what runs without an LLM, and what an LLM must never decide.
- **CASE-0098:** a failed intake handled loudly (retries, dead-letter, routed to the PM).
- **AI Ops:** cost panel, reliability, consistency monitor, drift, autonomy ladder, gateway trace, triage and (for the Admin) the Okta access log.

## Tests

`tests/` holds a headless-Chrome test harness that walks every scenario and the full path at both display sizes. See [tests/README.md](tests/README.md).

## Repository layout

```
genova_demo.html   the prototype (all CSS and JS inline)
index.html         redirects the Pages root to genova_demo.html
tests/             headless-Chrome test harness
```
