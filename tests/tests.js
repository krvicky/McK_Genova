// ---- 01_queue
__has('Representative prototype · synthetic data'); __has('Genova · Item Setup'); __has('Prototype by Tiger Analytics');
__has('12'); __has('SLA at risk'); __has('25/34 · 9 need review'); __has('Showing 6 of 12 cases · sorted by SLA, then fields needing review');
S.speed = 'fast';
// ---- 02_readonly_drawer
__c('tr[data-v="CASE-0094"]'); __has('Read-only view'); __c('.drawer .x');
// ---- 03_masters_tab
__c('[data-a="cat"][data-v="Masters"]'); __has('Onboarding via configuration after discovery · same platform, category rule set'); __c('[data-a="cat"][data-v="Generics"]');
// ---- 04_case_open
__c('tr[data-v="CASE-0091"] button'); __has('CASE-0091 · Xiromed · NDC 70700-0172-23'); __has('25 of 34 ready'); __has('9 need review');
__c('#ar-moq'); await __w(500);
if (document.querySelectorAll('.hl').length !== 2) throw new Error('expected 2 highlight boxes');
// ---- 05_trust_moq
__c('[data-pill="moq"]'); await __w(300);
const p = document.querySelector('.pop').innerText;
if (!p.includes('Lowest step: LLM · conflicting handwritten value')) throw new Error('callout ' + p);
if (!p.includes('0.62') || !p.includes('MOQ rule v0.3 uses checkbox only')) throw new Error('rows');
// ---- 06_trust_inforem
__c('[data-pill="inforem"]'); await __w(300);
const p2 = document.querySelector('.pop').innerText;
if (!p2.includes('Not used (deterministic lookup)') || !p2.includes('0.74')) throw new Error(p2);
__c('[data-pill="sell"]'); await __w(200);
if (!document.querySelector('.pop').innerText.includes('parsed identically in 3/3 runs')) throw new Error('sell');
document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
if (document.querySelector('.pop')) throw new Error('esc did not close');
// ---- 07_edit_moq
__c('[data-a="thumb"][data-k="ndc"]'); __has('feedback logged');
__c('[data-a="edit"][data-k="moq"]');
__set('#ed-val', '1'); __set('#ed-reason', 'Write-in overrides checkbox'); __set('#ed-com', 'Supplier wrote 1 by hand; checkbox shows 16');
__c('[data-a="saveedit"]');
__has('(was 16)'); __has('Edited'); __has('4 MOQ edits in 30 days');
if (!document.getElementById('toasts').innerText.includes('Feedback captured · MOQ · reason: write-in overrides checkbox')) throw new Error('toast');
// ---- 08_rule_tower_s1
__c('[data-a="propose"]');
if (S.role !== 'maker' || S.screen !== 'tower') throw new Error('handoff');
if (document.getElementById('rule-text').value !== SC.S1.text) throw new Error('prefill');
__c('[data-a="interpret"]'); await __until(() => document.querySelector('[data-a="confirm"]'));
__has('Read handwritten MOQ · HDA p.2'); __has('MOQ · draft v0.4 (live v0.3)'); __has('1,860 in / 212 out · 2.1 s · $0.006');
// ---- 09_checks_sandbox
__c('[data-a="confirm"]'); await __idle();
__has('No other live rule sets MOQ'); __has('All checks passed');
__c('[data-a="sbmode"][data-v="one"]'); __c('[data-a="sbrun"]'); await __idle(); __has('CASE-0091 · MOQ changes 16 → 1');
__c('[data-a="sbmode"][data-v="golden"]'); __c('[data-a="sbrun"]'); await __idle();
__has('No regressions · 3 cases change · 0 new alerts'); __has('+ 45 unchanged golden cases');
// ---- 10_replay
__c('[data-a="sbmode"][data-v="replay"]'); __c('[data-a="sbrun"]'); await __idle();
__has('9 of 11 match edits PMs already made'); __c('[data-a="review"]'); __has('handwritten'); __c('.modal .x');
// ---- 11_submit_checker
const ap = document.querySelector('[data-a="approve"]'); if (!ap.classList.contains('dis')) throw new Error('maker approve not disabled');
__c('[data-a="submit"]'); __c('[data-a="tochecker"]'); await __w(100);
__has('JSON diff'); __has('Sandbox evidence');
// ---- 12_publish
__c('[data-a="approve"]'); await __w(100);
if (document.querySelector('[data-c="shadow"]').checked) throw new Error('shadow default should be off for S1');
__c('[data-a="publish"]'); await __idle();
__has('MOQ v0.4 is live · new cases use it from now · open cases can be re-run on request · approved cases unchanged');
__has('Roll back to v0.3'); __has('Accuracy tracked vs PM decisions');
// ---- 13_case_rerun
__c('[data-a="gocase"]'); __has('Rule updated since this case was digitized · MOQ v0.4');
__c('[data-a="rerun"]'); await __idle();
__has('Matches your edit ✓'); __has('26 of 34 ready'); __has('Handwritten value, HDA p.2 · rule v0.4');
__c('[data-pill="moq"]'); await __w(200);
const p3 = document.querySelector('.pop').innerText; if (!p3.includes('0.94') || !p3.includes('High')) throw new Error(p3);
// ---- 14_rollback
S.popover = null; S.role = 'maker'; S.screen = 'tower'; render();
__c('[data-a="rollback"]'); __has('Rolled back');
__c('[data-a="tab"][data-v="versions"]'); __has('Rolled back from v0.4 to v0.3');

// ---- 15_rerun_after_rollback
S.role = 'pm'; S.screen = 'case'; render(); __has('Rule rolled back'); __c('[data-a="rerun"]'); await __idle();
if (moqState().value !== '16' || moqState().tier !== 'Medium') throw new Error('not reverted');
// ---- 16_s2_v03
preset('S2'); __c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await __idle();
__has('"MOQ v0.3 (checkbox)"'); __has('4 cases');
__c('input[data-c="res"][value="b"]'); __c('[data-a="recheck"]'); await __idle();
__has('Precedence explicit: handwritten → supplier default → checkbox');
__c('[data-a="sbrun"]'); await __idle(); __has('No regressions · 3 cases change');
if (S.traces[0].tokensIn !== 2410 && !S.traces.some(t => t.tokensIn === 2410)) throw new Error('trace2');
// ---- 17_s2_a_regression
preset('S2'); __c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await __idle();
__c('input[data-c="res"][value="a"]'); __c('[data-a="recheck"]'); await __idle();
__c('[data-a="sbrun"]'); await __idle(); __has('1 regression'); __has('Publish is disabled');
if (!document.querySelector('[data-a="submit"]').classList.contains('dis')) throw new Error('submit should be disabled');
// ---- 18_s1_publish_again_then_s2
preset('S1'); __c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await __idle(); __c('[data-a="sbrun"]'); await __idle();
__c('[data-a="submit"]'); __c('[data-a="tochecker"]'); __c('[data-a="approve"]'); __c('[data-a="publish"]'); await __idle();
if (S.reg.MOQ.live !== '0.4') throw new Error('live ' + S.reg.MOQ.live);
preset('S2'); __c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await __idle();
__has('Clash: 2 live rules would set MOQ for Supplier B cases.'); __has('"MOQ v0.4 (handwritten override)"');
// ---- 19_s3_clarify
preset('S3'); __c('[data-a="interpret"]'); await __idle(); __has('I need two details before drafting this rule.');
__c('[data-a="clar"][data-q="q1"][data-v="qty"]'); __c('[data-a="clar"][data-q="q2"][data-v="class"]'); __c('[data-a="resume"]'); await __idle();
__has('If case quantity > 24, set Item class = Bulk'); __c('[data-a="confirm"]'); await __idle(); __c('[data-a="sbrun"]'); await __idle();
__has('5 differ from golden expected values');
if (!document.querySelector('[data-a="submit"]').classList.contains('dis')) throw new Error('should be gated');
__c('[data-a="intended"]'); if (document.querySelector('[data-a="submit"]').classList.contains('dis')) throw new Error('should be enabled');
// ---- 20_s3_alert_variant
preset('S3'); __c('[data-a="interpret"]'); await __idle();
__c('[data-a="clar"][data-q="q1"][data-v="wt"]'); __c('[data-a="clar"][data-q="q2"][data-v="alert"]'); __c('[data-a="resume"]'); await __idle();
__c('[data-a="confirm"]'); await __idle(); __c('[data-a="sbrun"]'); await __idle(); __has('Alert list grows 9 → 10');
// ---- 21_s4_loop
preset('S4'); __c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await __idle();
__has('Circular dependency'); __c('[data-a="s4raw"]'); await __idle(); __has('No loops · reads raw inputs only');
__c('[data-a="sbrun"]'); await __idle(); __has('formula now explicit');
// ---- 22_s5_regression
preset('S5'); __c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await __idle(); __c('[data-a="sbrun"]'); await __idle();
__has('12 regressions'); __has('+ 7 more regressions');
if (!document.querySelector('[data-a="submit"]').classList.contains('dis')) throw new Error('S5 submit should be disabled');
__c('[data-a="s5apply"]'); await __idle(); __c('[data-a="sbrun"]'); await __idle(); __has('No regressions · 2 cases change');
// ---- 23_s6_blocked
preset('S6'); __c('[data-a="interpret"]'); await __idle(); __has('This needs a normal release, not a rule change.');
__c('[data-a="raisecr"]'); __has('CR-0142 · New attribute: Cold-chain flag'); __has('Scoping');
// ---- 24_s7_prompt
preset('S7'); __c('[data-a="interpret"]'); await __idle(); __has('+ Example: "10 x 1 mL"'); __has('Interpretive');
__c('[data-a="confirm"]'); await __idle(); __has('Output schema unchanged'); __c('[data-a="sbrun"]'); await __idle();
__has('Consistency 3/3 runs identical'); __has('12 calls · 31,400 tokens · $0.11 · cache hits 5');
__c('[data-a="submit"]'); __c('[data-a="tochecker"]'); __c('[data-a="approve"]');
if (!document.querySelector('[data-c="shadow"]').checked) throw new Error('shadow default on for S7');
// ---- 25_s8_lookup
preset('S8'); __c('[data-a="interpret"]'); await __idle(); __has('+ VL → Vial'); __c('[data-a="confirm"]'); await __idle(); __has('No duplicate key');
__c('[data-a="sbmode"][data-v="replay"]'); __c('[data-a="sbrun"]'); await __idle(); __has('6 package descriptions standardised · 0 regressions');
// ---- 26_s9_guardrail
preset('S9'); __c('[data-a="interpret"]'); await __idle(); __has('Blocked at model gateway'); __has('AUD-7781'); __has('0 tokens to model · blocked in 40 ms · $0.000'); __has('not reached');
// ---- 27_s0_fallback
preset('S0'); __c('[data-a="interpret"]'); await __idle(); __has("I couldn't map this to an attribute"); __c('[data-a="s0pick"][data-v="moq"]'); __has('Mapped to');
// ---- 28_freetext
preset('S0'); __set('#rule-text', 'please add BTLS as abbreviation for bottles'); __c('[data-a="interpret"]'); await __idle();
if (S.d.sid !== 'S8') throw new Error('matched ' + S.d.sid);
// ---- 29_ops
preset('ops'); __has('Illustrative · synthetic'); __has('1,284'); __has('$1,920'); __has('Assisted → Shadow'); __has('AUD-7781'); __has('within SLA');
__c('[data-a="fix"][data-v="approved"]'); __has('Fix approved');
// ---- 30_role_gates
S.role = 'pm'; S.screen = 'tower'; render();
if (document.querySelector('[data-a="publish"]')) throw new Error('PM sees publish');
// ---- 31_reset
resetDemo(); __has('25/34 · 9 need review'); if (S.reg.MOQ.live !== '0.3' || S.traces.length) throw new Error('reset');
// ---- 32_arrow_path
S.speed = 'fast';
for (let i = 0; i < 60 && S.screen !== 'ops'; i++) { await __idle(); await __w(80); document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })); await __w(120); }
if (S.screen !== 'ops' || S.reg.MOQ.live !== '0.4' || S.cs.moqVersion !== '0.4') throw new Error('arrow path ended at ' + S.screen);
// ---- 33_fonts_overflow
S.speed = 'normal';
const small = [];
for (const scr of ['queue', 'case', 'tower', 'ops']) {
  S.screen = scr; S.role = scr === 'tower' ? 'maker' : 'pm'; render(); await __w(60);
  document.querySelectorAll('#app *').forEach(el => { if (el.childNodes.length && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) { const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < 13) small.push(scr + ':' + el.tagName + ':' + fs + ':' + el.textContent.trim().slice(0, 20)); } });
  if (document.documentElement.scrollWidth > innerWidth + 1) small.push(scr + ': horizontal overflow ' + document.documentElement.scrollWidth);
}
if (small.length) throw new Error(small.slice(0, 8).join(' | '));
