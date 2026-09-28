// ---- 01_queue
__has('Representative prototype · synthetic data'); __has('Genova · Item Setup'); __has('Prototype by Tiger Analytics');
__has('SLA at risk'); __has('≥95%: 25/34 · exp. corrections 2.0 · 1 alert'); __has('1 intake issue · 0 silent failures');
__has('Showing 7 of 12 cases'); __has('Intake issue');
S.speed = 'fast';
// ---- 02_readonly_drawer
__c('tr[data-v="CASE-0094"]'); __has('Read-only view'); __c('.drawer .x');
// ---- 03_masters_tab
__c('[data-a="cat"][data-v="Masters"]'); __has('Onboarding via configuration after discovery · same platform, category rule set'); __c('[data-a="cat"][data-v="Generics"]');
// ---- 04_case_open
__c('tr[data-v="CASE-0091"] button'); __has('CASE-0091 · Xiromed · NDC 70700-0172-23');
__has('25 of 34 fields ≥ 95%'); __has('Expected corrections: 2.0'); __has('1 alert');
__has('34 fields · 29 no LLM at runtime · 5 with an LLM step');
__c('#ar-moq'); await __w(500);
if (document.querySelectorAll('.hl').length !== 2) throw new Error('expected 2 highlight boxes');
// ---- 05_trust_moq
__c('[data-pill="moq"]'); await __w(300);
const p = document.querySelector('.pop').innerText;
for (const t of ['72%', 'Escalate', 'OCR alone would say 93%', 'Lowest signal: LLM · conflicting handwritten value', 'raw 0.791', 'calibrated 72%', 'Calibrated on 1,240 PM decisions', 'Open in audit log', 'Run 10×'])
  if (!p.includes(t)) throw new Error('popover missing: ' + t);
if (document.querySelectorAll('.pop .tsrow').length !== 4) throw new Error('expected 4 signal bars');
if (!document.querySelector('.pop svg circle')) throw new Error('no calibration dot');
// ---- 06_all_34_scores
const want = { sell: 98, mfr: 97, moq: 72, cqty: 98, edim: 96, ewt: 96, cdim: 97, cwt: 88, tihi: 64, ndc: 99, gtine: 99, gtinc: 98, desc: 97, gen: 99, str: 98, form: 97, route: 91, vid: 99, vname: 99, inforem: 86, mica: 84, hosp: 97, iclass: 96, rx: 99, dea: 99, stor: 89, refr: 97, haz: 96, lot: 97, shelf: 90, coo: 95, pdesc: 97, brand: 100 };
const bad = Object.entries(want).filter(([k, v]) => scoreField(k).pct !== v).map(([k, v]) => k + ':' + scoreField(k).pct + '≠' + v);
if (bad.length) throw new Error(bad.join(' '));
if (!scoreField('pgtin').missing) throw new Error('pallet GTIN should be Missing · Alert');
const cs0 = caseSummary(); if (cs0.good !== 25 || cs0.exp !== '2.0') throw new Error(JSON.stringify(cs0));
__c('[data-pill="inforem"]'); await __w(200);
if (!document.querySelector('.pop').innerText.includes('86%')) throw new Error('inforem');
// ---- 07_run10_popover
__c('[data-pill="moq"]'); await __w(200);
__c('[data-a="r10mode"][data-v="bypass"]'); __c('[data-a="run10"]'); await __until(() => S.r10 && S.r10.done);
if (!document.querySelector('.pop').innerText.includes('10/10 identical · 10 model calls · $0.04')) throw new Error('bypass result');
__c('[data-a="r10mode"][data-v="cached"]'); __c('[data-a="run10"]'); await __until(() => S.r10 && S.r10.done);
if (!document.querySelector('.pop').innerText.includes('1 model call, 9 cache hits')) throw new Error('cached result');
document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
// ---- 08_exec_tags
const tags = [...document.querySelectorAll('.arow .xtag')].map(e => e.textContent);
const cnt = l => tags.filter(t => t === l).length;
if (cnt('Static') !== 5 || cnt('Direct') !== 3 || cnt('Lookup') !== 4 || cnt('Interpretive · LLM step') !== 5 || cnt('Derived · code') !== 17) throw new Error(JSON.stringify([cnt('Static'), cnt('Direct'), cnt('Lookup'), cnt('Interpretive · LLM step'), cnt('Derived · code')]));
__has('prompt v1.6 · 3/3 runs identical');
// ---- 09_llm_lens
__c('[data-a="lens"]'); __has('LLM never decides'); __has('untinted = code, OCR or lookup');
if (document.querySelectorAll('.lens .arow.llm-el').length !== 5) throw new Error('lens rows');
if (!document.querySelector('.lens [data-a="submitcase"].never-llm')) throw new Error('approve lock');
// ---- 10_spot_accept
__c('[data-a="lens"]');
if (!document.querySelector('[data-a="acceptall"]').classList.contains('dis')) throw new Error('accept should need spot-audit');
__c('[data-a="spot"]'); __c('[data-a="viewspot"][data-v="cdim"]'); __c('[data-a="viewspot"][data-v="gtinc"]');
__c('[data-a="acceptall"]'); __has('25 fields ≥ 95% accepted');
// ---- 11_edit_moq
__c('[data-a="thumb"][data-k="ndc"]'); __has('feedback logged');
__c('[data-a="edit"][data-k="moq"]');
__set('#ed-val', '1'); __set('#ed-reason', 'Write-in overrides checkbox'); __set('#ed-com', 'Supplier wrote 1 by hand; checkbox shows 16');
__c('[data-a="saveedit"]');
__has('(was 16)'); __has('Edited'); __has('4 MOQ edits in 30 days');
if (!document.getElementById('toasts').innerText.includes('Feedback captured · MOQ · reason: write-in overrides checkbox')) throw new Error('toast');
// ---- 12_audit_log
__c('[data-a="ctab"][data-v="audit"]');
for (const t of ['Chain verified ✓', 'Failure: Snowflake timeout after 5 s', 'Retry 1/3 succeeded', '1 failure (recovered)', '3 LLM calls', 'Opened case', 'Spot-audit viewed', 'Accepted 25 fields', 'MOQ 16 → 1']) __has(t);
const a91 = S.audit['CASE-0091'];
if (fmtT(a91.find(e => e.summary === 'Opened case').ts) !== '09:40:12') throw new Error('open time');
if (fmtT(a91.find(e => /^MOQ 16/.test(e.summary)).ts) !== '09:43:37') throw new Error('edit time');
__set('select[data-c="afield"]', 'moq');
for (const t of ['Lineage of MOQ', 'Handwriting region detected', 'MOQ conflict reader', 'Rule · MOQ v0.3', 'MOQ 16 → 1']) __has(t);
const js = exportAudit('CASE-0091', 'json'); if (JSON.parse(js).length !== a91.length) throw new Error('export json');
const csv = exportAudit('CASE-0091', 'csv'); if (!csv.startsWith('id,ts,type')) throw new Error('export csv');
__c('[data-a="aclear"]');
// ---- 13_tower_s1_compiled
__c('[data-a="ctab"][data-v="attrs"]'); __c('[data-a="propose"]');
if (S.role !== 'maker' || S.screen !== 'tower') throw new Error('handoff');
__has('What PMs are correcting · last 30 days');
__c('[data-a="interpret"]'); await __until(() => document.querySelector('[data-a="confirm"]'));
__has('MOQ · draft v0.4 (live v0.3)'); __has('Runs as code · 0 LLM calls at runtime'); __has('hw.confidence >= 0.60');
__c('[data-a="run100"]'); await __until(() => S.r100 && S.r100.done); __has('100 / 100 identical · 0 LLM calls · 3 ms total');
// ---- 14_checks_sandbox
__c('[data-a="confirm"]'); await __idle(); __has('All checks passed');
__c('[data-a="sbmode"][data-v="golden"]'); __c('[data-a="sbrun"]'); await __idle();
__has('No regressions · 3 cases change · 0 new alerts'); __has('Runtime LLM calls per NDC: unchanged');
__c('[data-a="sbmode"][data-v="replay"]'); __c('[data-a="sbrun"]'); await __idle(); __has('9 of 11 match edits PMs already made');
// ---- 15_proposal_merge
__c('[data-a="openprop"]'); __has('CP-0014 · MOQ: handwritten value overrides checkbox'); __has('R. Menon proposed');
const P = findProp('CP-0014');
if (!document.querySelector('[data-a="pmerge"]').classList.contains('dis')) throw new Error('merge should be disabled while checks run');
await __until(() => P.checksDone);
const own = document.querySelector('.propact [data-why="Proposer cannot approve their own change"]'); if (!own) throw new Error('proposer approve not disabled');
if (!document.querySelector('[data-a="pmerge"]').classList.contains('dis')) throw new Error('merge should need approval');
__c('[data-a="ptab"][data-v="changes"]'); __has('1 · Plain language'); __has('3 · Compiled logic');
S.role = 'checker'; render(); __c('[data-a="papprove"]'); __c('[data-a="pmerge"]'); __has('Merge and publish MOQ v0.4?'); __c('[data-a="mergeok"]'); await __w(100);
if (S.reg.MOQ.live !== '0.4' || P.status !== 'merged') throw new Error('merge');
if (!S.audit['CASE-0091'].some(e => /CP-0014 merged/.test(e.actor.name))) throw new Error('merge audit event');
// ---- 16_case_rerun
S.role = 'maker'; S.tower.tab = 'rules'; render(); __c('[data-a="gocase"]');
__has('Rule updated since this case was digitized · MOQ v0.4'); __c('[data-a="rerun"]'); await __idle();
__has('Matches your edit ✓'); __has('26 of 34 fields ≥ 95%'); __has('Expected corrections: 1.7');
if (scoreField('moq').pct !== 96) throw new Error('moq after');
__c('[data-pill="moq"]'); await __w(200); if (!document.querySelector('.pop').innerText.includes('96%')) throw new Error('popover 96');
document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
// ---- 17_approve_lock_output
__c('[data-a="submitcase"]'); __has('Approved & submitted');
if (!document.querySelector('[data-why^="Locked at approval"]')) throw new Error('lock');
__c('[data-a="output"]'); __has('Matches approved record 34/34 ✓'); __c('.modal .x');
if (!S.audit['CASE-0091'].some(e => /Excel generated from approved record · checksum match 34\/34/.test(e.summary))) throw new Error('output audit event');
// revert MOQ after approval: approved case must not change
S.role = 'maker'; S.screen = 'tower'; S.tower.tab = 'versions'; S.tower.vsel = 'MOQ'; render();
__has('1,102'); __has('1,480');
__c('[data-a="revert"][data-to="0.3"]'); __has('Rollback policy: one approval');
const RV = findProp(S.propView); await __until(() => RV.checksDone);
S.role = 'checker'; render(); __c('[data-a="papprove"]'); __c('[data-a="pmerge"]'); __c('[data-a="mergeok"]'); await __w(100);
if (S.reg.MOQ.live !== '0.3') throw new Error('revert');
S.role = 'pm'; S.screen = 'case'; S.caseTab = 'attrs'; render(); __has('published after approval · approved values unchanged');
await rerunCase(); if (moqState().value !== '1') throw new Error('approved case changed');
// ---- 18_versions_compare
S.role = 'maker'; S.screen = 'tower'; S.tower.tab = 'versions'; S.tower.vsel = 'MOQ'; S.cmp = null; render();
for (const v of ['v0.1', 'v0.2', 'v0.3', 'v0.4']) __has(v);
__set('select[data-c="cmpa"]', '0.3'); __set('select[data-c="cmpb"]', '0.4');
__has('1 · Plain language'); __has('2 · Structured rule (JSON)'); __has('3 · Compiled logic'); __has('Golden cases whose output differs between these versions: 3');
// ---- 19_golden_promotion
S.role = 'pm'; S.screen = 'case'; render(); __c('[data-a="golden"]'); __has('awaiting J. Carter');
S.role = 'checker'; render(); __c('[data-a="goldenok"]');
S.screen = 'tower'; S.tower.tab = 'golden'; render(); __has('Golden set: 50 → 51 · 7 from PM corrections'); __has('Golden 51');
// ---- 20_s7_two_approvals
preset('S7'); __c('[data-a="interpret"]'); await __idle(); __has('1 LLM step at runtime · pinned · cached');
__c('[data-a="confirm"]'); await __idle(); __c('[data-a="sbrun"]'); await __idle(); __has('+210 tokens');
__c('[data-a="run10"]'); await __until(() => S.r10 && S.r10.done); __has('10/10 identical');
__c('[data-a="openprop"]'); const P7 = findProp(S.propView); await __until(() => P7.checksDone);
if (P7.required.length !== 2) throw new Error('interpretive needs 2');
S.role = 'checker'; render(); __c('[data-a="papprove"]');
if (!document.querySelector('[data-a="pmerge"]').classList.contains('dis')) throw new Error('merge needs A. Shah');
S.role = 'tsme'; render(); __c('[data-a="papprove"]'); __c('[data-a="pmerge"]');
if (!document.querySelector('input[data-c="mshadow"]').checked) throw new Error('shadow default on');
__c('[data-a="mergeok"]'); await __until(() => P7.status === 'merged');
// ---- 21_s2_clash_v03
preset('S2'); __c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await __idle();
__has('4 cases'); __c('input[data-c="res"][value="b"]'); __c('[data-a="recheck"]'); await __idle();
__has('Precedence explicit: handwritten → supplier default → checkbox'); __c('[data-a="sbrun"]'); await __idle(); __has('No regressions');
S.tower.tab = 'map'; S.map.lens = 'coverage'; S.map.cat = 'Generics'; S.map.open = { Packaging: true }; render();
if (![...document.querySelectorAll('#mapsvg text')].some(t => /MOQ · Conflict/.test(t.textContent))) throw new Error('map conflict');
S.tower.tab = 'rules'; render();
// ---- 22_s3_clarify
preset('S3'); __c('[data-a="interpret"]'); await __idle(); __has('I need two details before drafting this rule.');
__c('[data-a="clar"][data-q="q1"][data-v="qty"]'); __c('[data-a="clar"][data-q="q2"][data-v="alert"]'); __c('[data-a="resume"]'); await __idle();
__c('[data-a="confirm"]'); await __idle(); __c('[data-a="sbrun"]'); await __idle(); __has('Alert list grows 9 → 10');
// ---- 23_s4_loop_map
preset('S4'); __c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await __idle(); __has('Circular dependency');
S.tower.tab = 'map'; S.map.lens = 'dependency'; render(); __has('Loop in draft S4');
if (!document.querySelector('#mapsvg path.de.loop')) throw new Error('red loop');
S.tower.tab = 'rules'; render(); __c('[data-a="s4raw"]'); await __idle(); __c('[data-a="sbrun"]'); await __idle(); __has('−$140/month');
// ---- 24_s5_regression
preset('S5'); __c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await __idle(); __c('[data-a="sbrun"]'); await __idle();
__has('12 regressions'); if (!document.querySelector('[data-a="openprop"]').classList.contains('dis')) throw new Error('S5 proposal should be blocked');
__c('[data-a="s5apply"]'); await __idle(); __c('[data-a="sbrun"]'); await __idle(); __has('No regressions · 2 cases change');
// ---- 25_s6_blocked_ghost
preset('S6'); __c('[data-a="interpret"]'); await __idle(); __has('This needs a normal release, not a rule change.');
__c('[data-a="raisecr"]'); __has('CR-0142 · New attribute: Cold-chain flag');
S.tower.tab = 'map'; S.map.lens = 'coverage'; S.map.cat = 'Generics'; S.map.open = { 'Regulatory and handling': true }; render();
if (![...document.querySelectorAll('#mapsvg text')].some(t => /Cold-chain flag · not in catalogue · CR-0142/.test(t.textContent))) throw new Error('ghost');
S.tower.tab = 'rules'; render();
// ---- 26_s8_s9_s0
preset('S8'); __c('[data-a="interpret"]'); await __idle(); __has('+ VL → Vial'); __c('[data-a="confirm"]'); await __idle(); __has('No duplicate key');
preset('S9'); __c('[data-a="interpret"]'); await __idle(); __has('Blocked at model gateway'); __has('AUD-7781');
if (document.querySelector('[data-a="openprop"]')) throw new Error('S9 must not create a proposal');
preset('S0'); __c('[data-a="interpret"]'); await __idle(); __has("I couldn't map this to an attribute");
// ---- 27_map_views
S.tower.tab = 'map'; S.map.lens = 'coverage'; S.map.cat = 'Generics'; S.map.open = {}; render();
__has('34 attributes · 31 with live rules · 1 missing rule · 2 without golden cases · 1 without owner');
__c('#mapsvg [data-a="mapgroup"][data-v="Packaging"]');
if (![...document.querySelectorAll('#mapsvg text')].some(t => /Pallet Ti × Hi · Missing rule/.test(t.textContent))) throw new Error('missing rule node');
__c('#mapsvg [data-a="mapnode"][data-v="moq"]'); __has('Open in Rule Tower');
__set('select[data-c="mapcat"]', 'Masters'); __has('32 inherited from Generics'); __has('2 overridden'); __has('3 missing'); __has('Go with conditions');
__set('select[data-c="mapcat"]', 'OTC'); __has('Discovery not started');
// ---- 28_bounds_nav
const items = BOUNDS.flatMap(c => c.items.map(i => i[1]));
for (const nav of items) {
  S.screen = 'bounds'; S.modal = null; render();
  __c(`[data-a="bnav"][data-v="${nav}"]`); await __idle();
  if (S.screen === 'bounds') throw new Error('did not navigate: ' + nav);
}
S.popover = null; S.modal = null;
// ---- 29_case98
S.screen = 'queue'; render(); __c('tr[data-v="CASE-0098"] button');
__has("SDS attachment couldn't be read."); __has('We tried 3 times (09:15:04, 09:15:34, 09:16:34)');
__c('[data-a="c98resub"]'); __has('password-protected'); __c('[data-a="c98send"]');
__c('[data-a="c98proceed"]'); __set('#c98-reason', 'SDS to follow within SLA'); __c('[data-a="c98go"]'); __has('needs SDS');
__c('[data-a="ctab"][data-v="audit"]'); __has('attempt 3/3'); __has('dead-letter'); __has('Requested resubmission'); __has('Chain verified ✓');
// ---- 30_ops
S.caseTab = 'attrs'; preset('ops');
for (const t of ['Illustrative · synthetic', '$0.62', '$1.49', '41,200', '38%', '22%', 'alert at 85% of monthly budget per category', '7 timeouts today, all recovered', 'dead-letter', '98.9%', 'pinned: 5/5', 'AUD-7781', 'within SLA']) __has(t);
// ---- 31_no_tiers_left
const seen = [];
for (const scr of ['queue', 'case', 'tower', 'ops', 'bounds', 'case98']) { S.screen = scr; S.caseTab = 'attrs'; render(); const m = __t().match(/\b(High|Medium|Low)\b/); if (m) seen.push(scr + ':' + m[0]); }
S.screen = 'case'; openTrust('moq'); const pm = document.querySelector('.pop').innerText.match(/\b(High|Medium|Low)\b/); if (pm) seen.push('popover:' + pm[0]); S.popover = null;
if (seen.length) throw new Error(seen.join(' '));
if (/throughput|parallel/i.test(document.body.innerText)) throw new Error('throughput visuals present');
// ---- 32_reset
resetDemo(); __has('≥95%: 25/34 · exp. corrections 2.0'); if (S.reg.MOQ.live !== '0.3' || S.traces.length || S.props.length !== 4) throw new Error('reset');
// ---- 33_arrow_path_scripted
S.speed = 'fast'; S.scriptedReview = true;
for (let i = 0; i < 90 && S.screen !== 'ops'; i++) { await __idle(); await __w(60); const p1 = S.props.find(x => x.sid === 'S1'); if (p1 && (!p1.checksDone || p1.reinterp)) { await __w(150); continue; } document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })); await __w(120); }
const s1 = S.props.find(x => x.sid === 'S1');
if (S.screen !== 'ops' || S.reg.MOQ.live !== '0.4' || S.cs.moqVersion !== '0.4' || !S.cs.approved) throw new Error('arrow path ended at ' + S.screen + ' live ' + S.reg.MOQ.live);
if (!s1.events.some(e => /illegible/.test(e.text)) || s1.lines.length !== 5) throw new Error('scripted review round');
// ---- 34_fonts_overflow
S.speed = 'normal';
const small = [];
const views = [['queue'], ['case', 'attrs'], ['case', 'audit'], ['tower', 'rules'], ['tower', 'proposals'], ['tower', 'versions'], ['tower', 'map'], ['ops'], ['bounds'], ['case98']];
for (const [scr, tab] of views) {
  S.screen = scr; S.role = scr === 'tower' ? 'maker' : 'pm'; if (scr === 'case') S.caseTab = tab; if (scr === 'tower') { S.tower.tab = tab; S.propView = tab === 'proposals' ? 'CP-0014' : null; } render(); await __w(60);
  document.querySelectorAll('#app *').forEach(el => { if ([...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) { const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < 13) small.push(scr + '/' + (tab || '') + ':' + el.tagName + ':' + fs + ':' + el.textContent.trim().slice(0, 20)); } });
  if (document.documentElement.scrollWidth > innerWidth + 1) small.push(scr + ': horizontal overflow ' + document.documentElement.scrollWidth);
}
if (small.length) throw new Error(small.slice(0, 8).join(' | '));
