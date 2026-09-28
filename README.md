# Genova · Item Setup: clickable prototype

**Representative prototype · synthetic data.** This is not McKesson's production system. All suppliers, NDCs, cases and numbers are synthetic.

A single, self-contained HTML prototype for the Project Genova Phase 2 proposal. It follows one case (CASE-0091) around the full loop: PM queue → case review with trust drill-down → PM correction → Rule Tower (rule change, checks, sandbox, maker/checker, publish, rollback) → case re-run → AI Ops.

Prototype by Tiger Analytics.

## Run it

- **Locally:** double-click `genova_demo.html`. It runs fully offline and makes no network calls.
- **Hosted:** GitHub Pages serves the same file (the site root redirects to it).

No build step, framework or install is needed. It uses system fonts only and keeps all state in memory; **Reset demo** (in the footer or the director panel) restores the starting state.

Optimised for 1440×900 on a projector. It also works at 1280×720.

## Presenter controls

| Key / control | What it does |
|---|---|
| `→` | Advance to the next step of the scripted happy path |
| `D` | Show or hide the demo director panel |
| `Esc` | Close popovers, drawers and dialogs |
| Director · Jump to | Queue, Case 0091 before edit / after re-run, AI Ops, or any Rule Tower scenario |
| Director · Speed | Normal or Fast (Fast cuts simulated latencies by 70%) |
| Director · toggles | Show trace panels, Show numbered callouts (1–5) |
| Role switcher (top right) | PM, Rule owner (maker), Rule approver (checker), AI Ops |

## The scripted path

Queue → CASE-0091 → trust drill-down on MOQ → edit MOQ to 1 with reason "Write-in overrides checkbox" → pattern suggestion card → Rule Tower (S1 prefilled) → Interpret → Confirm → Checks → Golden sandbox → Replay → Submit → switch to checker → Approve → Publish → back to the case → Re-run (MOQ = 1, High, 26/34) → AI Ops.

Every step works by mouse, or by pressing `→` repeatedly.

## Rule Tower scenarios

The LLM is **simulated**: every interpretation comes from preconfigured scenarios, so the demo is deterministic and cannot fail on stage. Free text is matched to a scenario by keyword; unmatched text falls back to S0.

| Chip | Scenario | Shows |
|---|---|---|
| Handwritten MOQ | S1 · Direct rule update | Happy path: MOQ v0.3 → v0.4, 3 golden changes, replay matches 9 of 11 PM edits |
| Supplier MOQ override | S2 · Rule clash | Clash with the live MOQ rule; resolution (a) causes a regression, (b) passes |
| Bulk packs | S3 · Ambiguous wording | Two clarification questions, then an intended change the checker must confirm |
| Manufacturer size formula | S4 · Dependency loop | Circular dependency caught; fixed by reading a raw input |
| Selling unit = EA | S5 · Regression | Checks pass but 12 golden regressions block submit; narrowed suggestion fixes it |
| Cold-chain flag to EDM | S6 · Needs a release | Outside Rule Tower scope; raises change request CR-0142 |
| Read '10 x 1 mL' | S7 · Prompt edit | Interpretive tier: prompt diff, consistency 3/3, shadow run on by default |
| Abbreviation VL | S8 · Lookup update | Reference tier, lighter test path |
| Injection attempt | S9 · Guardrail | Blocked at the model gateway, logged as AUD-7781 |
| (any unmatched text) | S0 · Fallback | Asks which attribute the rule is about |

Recommended live path: S1 (via the PM hand-off) → S2 → S5 or S6. The others are for Q&A.

## Tests

`tests/` holds a headless-Chrome test harness that walks every scenario and the full path at both display sizes. See [tests/README.md](tests/README.md).

## Repository layout

```
genova_demo.html   the prototype (all CSS and JS inline)
index.html         redirects the Pages root to genova_demo.html
tests/             headless-Chrome test harness
```
