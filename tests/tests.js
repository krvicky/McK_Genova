// ---- 00_landing_okta
const lg = document.getElementById('login'), ovl = document.getElementById('overlay');
if (lg.classList.contains('hidden') || !document.getElementById('app').classList.contains('hidden')) throw new Error('the landing page must be the first screen');
for (const t of ['Genova · Agentic Item Setup', 'Welcome back', 'Sign in with Okta', 'Genova Trust Score', 'Rule Tower', 'FUTURE RELEASE', 'Representative prototype · synthetic data · Prototype by Tiger Analytics', 'Email sign-in is turned off for this workspace'])
  if (!lg.innerText.includes(t) && !lg.textContent.includes(t)) throw new Error('landing missing: ' + t);
document.getElementById('oktaBtn').click();
if (ovl.querySelectorAll('.ptile').length !== 3) throw new Error('expected 3 persona tiles');
for (const t of ['Choose an account', 'mckesson.okta.com', 'Product Manager · Generics', 'Senior Product Manager · Generics', 'Admin · Genova platform', '6 cases need action · 1 SLA at risk · CASE-0091 needs review', '1 proposal waiting for your review · CP-0013 Storage temperature prompt', 'Storage temperature consistency 98.9% · 1 dead-letter case · LLM spend 74% of budget', 'Starts in Item setup case queue', 'Starts in Rule Tower · Proposals', 'Starts in AI Ops', 'Any Senior PM can approve a rule change, but never their own.', 'Back to sign in'])
  if (!ovl.innerText.includes(t)) throw new Error('chooser missing: ' + t);
if (/Category Lead|Platform Owner|Business SME|Technical SME/i.test(document.documentElement.outerHTML)) throw new Error('old role names remain');
if ([...lg.querySelectorAll('.mod.lock')].some(m => !m.dataset.tip.includes('Planned for a future release · discovery and readiness assessment come first'))) throw new Error('future release tooltip on landing');
ovl.querySelector('.ptile[data-persona="pm"]').click();
await __until(() => document.getElementById('vf') && document.getElementById('vf').innerText.includes('Verify with Okta'));
await __until(() => document.getElementById('vf') && document.getElementById('vf').innerText.includes('Signing in as pm.generics@mckesson.com · Product Manager · Generics'), 4000);
await __until(() => !document.getElementById('app').classList.contains('hidden'), 4000);
if (S.role !== 'pm' || S.screen !== 'queue' || !lg.classList.contains('hidden')) throw new Error('should land on the Case Queue as the PM');
if (S.access[0].text !== 'Signed in via Okta SSO · Product Manager · Generics · MFA verified') throw new Error('access event: ' + S.access[0].text);
// ---- 01_queue
__has('Genova · Item Setup'); __has('Representative prototype · synthetic data'); __has('7 AI agents active'); __has('Product Manager approves every case'); __has('Rule changes need Senior PM approval');
if ([...document.querySelectorAll('#side .modrow.lock .pill')].map(e => e.textContent).join() !== 'FUTURE RELEASE,FUTURE RELEASE,FUTURE RELEASE,FUTURE RELEASE') throw new Error('sidebar future release');
if (/DISCOVERY|ONBOARDING/i.test(document.getElementById('side').innerText) || !document.querySelector('#side .modrow.lock').dataset.tip.includes('Planned for a future release · discovery and readiness assessment come first')) throw new Error('sidebar future wording');
__has('SLA at risk'); __has('Item setup case queue'); __has('Needs action'); __has('Ready to approve');
if (document.querySelector('#side [data-a="nav"][data-v="ops"]')) throw new Error('AI Ops must be hidden for the PM');
if (document.querySelectorAll('#side .nav').length !== 3) throw new Error('PM nav items');
S.speed = 'fast';
// ---- 01b_queue_defaults
const qT = () => [...document.querySelectorAll('#q-kpis .kpi .val')].map(e => e.textContent).join('/');
const qOrder = () => [...document.querySelectorAll('#q-table tbody tr')].map(r => r.dataset.v.slice(5)).join(',');
const qIds = () => [...document.querySelectorAll('#q-table tbody tr')].map(r => r.dataset.v.slice(5)).sort().join(',');
const qSeg = () => [...document.querySelectorAll('#q-filters .seg button')].map(b => b.innerText.replace(/\s+/g, '')).join('|');
const qRowT = id => document.querySelector(`tr[data-v="${id}"]`).innerText.replace(/\s+/g, ' ');
Object.assign(window, { qT, qOrder, qIds, qSeg, qRowT });
if (qT() !== '6/3/2/17') throw new Error('tiles ' + qT());
__has('Item setup case queue'); __has('11 cases · sorted by SLA'); __has('Item setup › Generics');
if (/intake issue|silent failures|exp\. corrections|Trust = share/i.test(__t())) throw new Error('old queue text');
if (qSeg() !== 'Open11|Done17|All28') throw new Error(qSeg());
if (qOrder() !== '0088,0091,0094,0092,0093,0095,0098,0097,0099,0100,0101') throw new Error(qOrder());
if (!document.querySelector('tr[data-v="CASE-0091"] [data-a="dl"][data-k="draft"]')) throw new Error('0091 draft download');
const th0 = getComputedStyle(document.querySelector('#q-table th')); if (th0.textAlign !== 'center' || th0.verticalAlign !== 'middle') throw new Error('headers centred ' + th0.textAlign + '/' + th0.verticalAlign);
const hd = [...document.querySelectorAll('#q-table th')].map(t => t.textContent.trim()).join('|');
if (hd !== 'Case|Supplier · NDCs|SLA|Status|Fields ready|Case confidence|Lowest field|Alert checks|') throw new Error(hd);
for (const t of ['Xiromed · 1', '2h 10m', 'Needs action', '25/34', '94%', 'MOQ · 72%', '8/9', 'Open case →']) if (!qRowT('CASE-0091').includes(t)) throw new Error('0091 row: ' + t);
for (const t of ['SLA at risk', '45m', '60/68', '93%', 'Case quantity · 76%', '8/9']) if (!qRowT('CASE-0088').includes(t)) throw new Error('0088 row: ' + t);
for (const [id, t] of [['CASE-0098', 'SDS unreadable · resolve intake'], ['CASE-0097', 'Reading HDA · step 3 of 6'], ['CASE-0101', 'Checking documents · step 1 of 6'], ['CASE-0100', 'Follows CASE-0096'], ['CASE-0094', 'Ready to approve'], ['CASE-0094', '102/102']]) if (!qRowT(id).includes(t)) throw new Error(id + ': ' + t);
if (document.querySelector('tr[data-v="CASE-0098"] [data-a="dl"]') || document.querySelector('tr[data-v="CASE-0097"] [data-a="dl"]')) throw new Error('no download while digitizing or blocked at intake');
if (document.querySelector('tr[data-v="CASE-0092"] td:nth-child(4) .q2l') || document.querySelector('tr[data-v="CASE-0094"] td:nth-child(4) .q2l')) throw new Error('no second line unless specified');
if (document.querySelectorAll('#q-table .linkb').length < 11) throw new Error('Open case → on every row');
__c('[data-a="qtab"][data-v="done"]');
if (qSeg() !== 'Open11|Done17|All28' || document.querySelectorAll('#q-table tbody tr').length !== 17) throw new Error('done tab');
if (qOrder().slice(0, 4) !== '0085') throw new Error('done newest first: ' + qOrder());
if (!document.querySelector('tr[data-v="CASE-0085"] [data-a="dl"][data-k="approved"]')) throw new Error('0085 approved download');
for (const t of ['Submitted · 07:40 · output matched 34/34', 'Met']) if (!qRowT('CASE-0085').includes(t)) throw new Error('0085: ' + t);
if (!qRowT('CASE-0081').includes('Missed · 25m')) throw new Error('0081 missed');
for (const [id, t] of [['CASE-0096', 'Closed · more info requested from supplier · follow-up CASE-0100'], ['CASE-0083', 'Closed · duplicate NDC'], ['CASE-0086', 'Closed · wrong category (Specialty)']]) { if (!qRowT(id).includes(t)) throw new Error(id + ': ' + t); if (document.querySelector(`tr[data-v="${id}"] [data-a="dl"]`)) throw new Error('closed cases have no download'); }
__has('17 cases · sorted by completion time');
__c('[data-a="qtab"][data-v="all"]'); if (document.querySelectorAll('#q-table tbody tr').length !== 28) throw new Error('all tab');
__c('[data-a="qtab"][data-v="open"]');
const statuses = new Set(S.q.map(q => q.status)); if ([...statuses].some(x => !['Digitizing', 'Needs action', 'Ready to approve', 'Done'].includes(x))) throw new Error('only four statuses');
// ---- 01c_queue_filters
__has('1 open case received before this period'); __c('#q-safe [data-a="qold"]');
__has('Showing 1 older open case');
for (const t of ['Outside period', 'SLA at risk', 'Overdue · 1d 4h', '84/102', '92%', 'INFOREM · 79%', '8/9']) if (!qRowT('CASE-0068').includes(t)) throw new Error('0068: ' + t);
if (qT() !== '7/3/2/17' || !qSeg().startsWith('Open12')) throw new Error('show old ' + qT() + ' ' + qSeg());
__c('#q-safe [data-a="qold"]'); if (document.querySelector('tr[data-v="CASE-0068"]')) throw new Error('hide old');
__c('[data-a="qchip"][data-v="sla"]'); if (qIds() !== '0088') throw new Error('sla chip ' + qIds()); __c('[data-a="qchip"][data-v="sla"]');
__c('[data-a="qchip"][data-v="fail"]'); if (qIds() !== '0088,0091') throw new Error('fail chip ' + qIds());
__c('[data-a="qtab"][data-v="done"]'); if (qIds() !== '0083,0096') throw new Error('fail chip done ' + qIds()); __c('[data-a="qtab"][data-v="open"]'); __c('[data-a="qchip"][data-v="fail"]');
__c('[data-a="qchip"][data-v="low"]'); if (qIds() !== '0088,0091') throw new Error('low chip ' + qIds());
__c('#q-safe [data-a="qold"]'); if (qIds() !== '0068,0088,0091') throw new Error('low chip + old ' + qIds()); __c('#q-safe [data-a="qold"]');
__c('[data-a="qchip"][data-v="sla"]'); if (qIds() !== '0088') throw new Error('chips AND ' + qIds());
__has('Clear filters'); __c('[data-a="qclear"]');
if (JSON.stringify(S.qf) !== JSON.stringify(QF_DEFAULT()) || document.querySelector('.qclear')) throw new Error('clear filters');
document.getElementById('q-search').focus(); __set('#q-search', 'XIRO'); if (qIds() !== '0091' || qT() !== '6/3/2/17' || qSeg() !== 'Open1|Done0|All1') throw new Error('search ' + qIds() + ' ' + qT() + ' ' + qSeg());
if (document.activeElement.id !== 'q-search') throw new Error('search keeps focus');
__set('#q-search', '70700-0172'); if (qIds() !== '0091') throw new Error('search NDC');
__set('#q-search', 'supplier d'); if (qIds() !== '0100') throw new Error('search supplier ' + qIds());
__c('[data-a="qclear"]');
const sups = [...document.querySelectorAll('select[data-c="qsup"] option')].map(o => o.textContent);
if (sups[0] !== 'All suppliers' || sups.slice(1).join() !== sups.slice(1).slice().sort((a, b) => a.localeCompare(b)).join()) throw new Error('supplier list');
__set('select[data-c="qsup"]', 'Supplier C'); if (qIds() !== '0088' || qT() !== '1/0/0/' + S.q.filter(q => q.sup === 'Supplier C' && q.status === 'Done').length) throw new Error('supplier ' + qIds() + ' ' + qT());
__c('[data-a="qclear"]');
__set('select[data-c="qrec"]', 'today'); __has('2 open cases received before this period'); if (qT() !== '5/3/2/0') throw new Error('today ' + qT());
__set('select[data-c="qrec"]', '30d'); if (document.getElementById('q-safe') || qT() !== '7/3/2/17') throw new Error('30 days ' + qT());
__c('[data-a="qclear"]');
__c('[data-a="qtile"][data-v="Ready to approve"]'); if (qIds() !== '0093,0094,0100' || !document.querySelector('.kpi.on')) throw new Error('tile ' + qIds());
__c('[data-a="qtile"][data-v="Ready to approve"]'); if (document.querySelectorAll('#q-table tbody tr').length !== 11) throw new Error('tile toggle');
__c('[data-a="qtile"][data-v="Done"]'); if (S.qf.tab !== 'done') throw new Error('done tile'); __c('[data-a="qtile"][data-v="Done"]'); if (S.qf.tab !== 'open') throw new Error('done tile toggle');
__c('[data-a="qsort"][data-v="conf"]'); __has('sorted by case confidence'); __c('[data-a="qsort"][data-v="case"]'); if (qOrder().slice(0, 4) !== '0088') throw new Error('sort case');
__c('[data-a="qclear"]');
__set('#q-search', 'zzz'); __has('No cases match these filters'); __c('.empty-box [data-a="qclear"]');
if (qOrder() !== '0088,0091,0094,0092,0093,0095,0098,0097,0099,0100,0101') throw new Error('restored ' + qOrder());
// ---- 01d_hover_card_links
const cell = document.querySelector('tr[data-v="CASE-0091"] [data-achk]');
cell.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
const tip = document.getElementById('tip');
if (!tip.classList.contains('hcard')) throw new Error('hover card');
for (const t of ['Alert checks · 8 of 9 passed', 'Pallet GTIN missing · not found on HDA or label · NDC 70700-0172-23', 'Alert list illustrative']) if (!tip.innerText.includes(t)) throw new Error('card: ' + t);
const cr = [...tip.querySelectorAll('.hc-r')].map(e => e.innerText.replace(/^[✓✗]\s*/, '').split(' · ')[0]);
if (cr.join('|') !== ALERTS.join('|')) throw new Error('card order ' + cr.join('|'));
tip.dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); await __w(250);
if (!tip.classList.contains('hcard')) throw new Error('card must stay open while hovered');
tip.querySelector('button.hc-r').click();
if (S.screen !== 'case' || S.cs.sel !== 'pgtin' || tip.classList.contains('hcard')) throw new Error('failed check opens the case on the field');
__has('Fields ready 25/34'); __has('Case confidence 94%');
S.cs.sel = null; __c('[data-a="nav"][data-v="queue"]');
__c('tr[data-v="CASE-0088"] [data-a="openfield"]');
if (S.screen !== 'caseX' || S.xsel.k !== 'cqty' || S.xsel.ndc !== qRow('CASE-0088').ndcs[1]) throw new Error('lowest field opens the case');
if (!document.querySelector(`tr.hot[id="xr-${qRow('CASE-0088').ndcs[1]}-cqty"]`)) throw new Error('selected field row');
__has('Case quantity inconsistent'); __has('Fields ready 60/68'); __has('Case confidence 93%'); __has('Close case');
__c('[data-a="nav"][data-v="queue"]');
__c('tr[data-v="CASE-0094"] td'); if (S.screen !== 'caseX' || S.caseTab !== 'attrs') throw new Error('row click opens the case');
__c('[data-a="nav"][data-v="queue"]');
// ---- 01e_synthetic_consistency
const bad = [];
for (const q of S.q) {
  if (q.live || !hasFields(q)) continue;
  const d = synthCase(q), all = d.ndcs.flatMap(n => ATTRS.map(a => n.scores[a.k])), v = all.filter(x => x != null);
  const good = v.filter(x => x >= 95).length, avg = Math.round(v.reduce((a, b) => a + b, 0) / v.length), min = Math.min(...v), lv = d.ndcs.find(n => n.ndc === q.m.low.ndc).scores[q.m.low.k];
  if (all.length !== q.m.total || good !== q.m.good || avg !== q.m.conf || min !== q.m.low.pct || lv !== q.m.low.pct) bad.push(`${q.id}: ${good}/${all.length} ${avg}% min ${min} low ${lv}`);
}
if (bad.length) throw new Error(bad.join(' | '));
// ---- 01f_downloads
const caps = [], oc = URL.createObjectURL;
URL.createObjectURL = b => { caps.push(b); return oc.call(URL, b); };
try {
  const n0 = auditFor('CASE-0094').length;
  __c('tr[data-v="CASE-0094"] [data-a="dl"]');
  if (S.screen !== 'queue') throw new Error('download must not open the case');
  const x1 = await caps[0].text();
  if ((x1.match(/<Worksheet /g) || []).length !== 3 || !x1.includes('ss:Name="Item setup"') || !x1.includes('ss:Name="Evidence"') || !x1.includes('ss:Name="Alert checks"')) throw new Error('3 sheets');
  for (const t of ['DRAFT – NOT APPROVED · extracted values including edits so far · do not use downstream', 'Exported by Product Manager · Generics', 'ss:StyleID="draft"', 'Interpretive · LLM step', 'Derived · code']) if (!x1.includes(t)) throw new Error('draft file: ' + t);
  if ((x1.match(/<Row>/g) || []).length !== 7 + 1 + 3 + 1 + 102 + 1 + 27) throw new Error('row count ' + (x1.match(/<Row>/g) || []).length);
  const a94 = auditFor('CASE-0094'); if (a94.length !== n0 + 1 || a94[a94.length - 1].summary !== 'Draft exported · not approved · Product Manager · Generics') throw new Error('draft audit');
  __c('[data-a="qtab"][data-v="done"]'); __c('tr[data-v="CASE-0085"] [data-a="dl"]');
  const x2 = await caps[1].text();
  if (!/APPROVED · Product Manager · Generics · \d{4}-\d\d-\d\d 07:40 · checksum [0-9a-f]{8} · matches approved record/.test(x2) || x2.includes('DRAFT')) throw new Error('approved file');
  const a85 = auditFor('CASE-0085'); if (a85[a85.length - 1].summary !== 'Output downloaded (approved) · Product Manager · Generics') throw new Error('approved audit');
  __c('[data-a="qtab"][data-v="open"]');
  const x3 = downloadCase('CASE-0091', 'draft');
  for (const t of ['<Data ss:Type="String">70700-0172-23</Data>', 'Missing', 'HDA · p.2', 'MOQ v0.3', 'not found on HDA or label']) if (!x3.includes(t)) throw new Error('0091 draft: ' + t);
  if (!/Pallet GTIN missing<\/Data><\/Cell><Cell><Data ss:Type="String">Failed/.test(x3)) throw new Error('0091 alert check sheet');
  if (xlsName(qRow('CASE-0091'), 'approved') !== 'CASE-0091_Xiromed_APPROVED.xls' || xlsName(qRow('CASE-0091'), 'draft') !== 'CASE-0091_Xiromed_DRAFT.xls') throw new Error('file names');
  S.role = 'spm'; downloadCase('CASE-0093', 'draft'); S.role = 'pm';
  const a93 = auditFor('CASE-0093'); if (!a93[a93.length - 1].summary.endsWith('Senior Product Manager · Generics')) throw new Error('persona role in audit');
  if (downloadCase('CASE-0097', 'draft') !== null) throw new Error('no draft while digitizing');
} finally { URL.createObjectURL = oc; }
S.qf = QF_DEFAULT(); render();
// ---- 01g_digitize_close_links
finish97(); await __w(50);
if (qT() !== '7/3/1/17') throw new Error('0097 finished ' + qT());
for (const t of ['Needs action', '66/68', '95%', 'Hazmat flag · 82%', '9/9']) if (!qRowT('CASE-0097').includes(t)) throw new Error('0097: ' + t);
if (!document.getElementById('toasts').innerText.includes('CASE-0097 digitized · ready for review')) throw new Error('0097 toast');
__c('tr[data-v="CASE-0092"]'); __c('[data-a="closecase"]');
if (document.querySelectorAll('#layers input[data-c="creason"]').length !== 5) throw new Error('5 close reasons');
if (!document.querySelector('[data-a="closeok"]').classList.contains('dis')) throw new Error('close needs a reason');
__c('input[data-c="creason"][value="Not a new item"]'); __set('#close-comment', 'Line extension of an existing item'); __c('[data-a="closeok"]');
if (qRow('CASE-0092').status !== 'Done') throw new Error('closed');
__has('Closed · not a new item');
if (!auditFor('CASE-0092').some(e => e.summary === 'Closed · reason "Not a new item" · comment "Line extension of an existing item"')) throw new Error('close audit');
if (document.querySelector('[data-a="closecase"]')) throw new Error('no Close case on a Done case');
__c('[data-a="nav"][data-v="queue"]'); if (qT() !== '6/3/1/18') throw new Error('after close ' + qT());
__c('[data-a="qtab"][data-v="done"]');
__c('tr[data-v="CASE-0096"] [data-a="open"][data-v="CASE-0100"]'); if (S.screen !== 'caseX' || S.caseId !== 'CASE-0100') throw new Error('0096 → 0100');
__has('Follows CASE-0096'); __c('.page-h [data-a="open"][data-v="CASE-0096"]');
if (S.caseId !== 'CASE-0096' || S.caseTab !== 'audit') throw new Error('0100 → 0096 opens Done case on the audit log');
__has('supplier reply became CASE-0100'); __has('Chain verified ✓');
S.qf = QF_DEFAULT(); __c('[data-a="nav"][data-v="queue"]');
openChooser(); if (!document.getElementById('overlay').innerText.includes('6 cases need action · 1 SLA at risk · CASE-0091 needs review')) throw new Error('PM tile today'); closeOv();
// ---- 01h_no_lens
if (document.getElementById('lensBtn') || /lens/i.test(document.body.innerText)) throw new Error('lens still present');
S.director = true; render();
for (const t of ['Finish digitizing CASE-0097', 'Reset queue filters']) __has(t) || 0;
if (/lens/i.test(document.getElementById('layers').innerText)) throw new Error('lens in director');
S.qf.tab = 'done'; render(); __c('[data-a="qreset"]'); if (S.qf.tab !== 'open' || S.screen !== 'queue') throw new Error('reset queue filters');
S.director = false; render();
// ---- 01i_mailbox_simulate
const mbx = () => document.getElementById('q-mailbox');
__has('Gx mailbox connected · real-time');
if (!mbx().dataset.tip.includes('New supplier emails create cases instantly via mailbox push notifications · last email received 09:58') || !mbx().querySelector('.dot')) throw new Error('mailbox indicator');
for (const id of ['CASE-0091', 'CASE-0098', 'CASE-0094']) if (!auditFor(id)[0].summary.startsWith('Email received via mailbox push notification · Gx mailbox · 3 attachments')) throw new Error('intake wording ' + id);
const dig0 = +qT().split('/')[2];
S.director = true; render(); __c('[data-a="simmail"]');
const q102 = qRow('CASE-0102');
if (!q102 || q102.sup !== 'Supplier R' || q102.status !== 'Digitizing' || q102.ndcs.length !== 1 || S.screen !== 'queue') throw new Error('CASE-0102 created');
if (+qT().split('/')[2] !== dig0 + 1) throw new Error('Digitizing +1 ' + qT());
if (!document.querySelector('tr.newrow[data-v="CASE-0102"]') || !qRowT('CASE-0102').includes('Checking documents · step 1 of 6')) throw new Error('highlighted new row');
if (!document.getElementById('toasts').innerText.includes('New email from Supplier R · CASE-0102 created')) throw new Error('new email toast');
if (!mbx().classList.contains('ping') || !mbx().dataset.tip.includes('last email received ' + hhmm(q102.rec))) throw new Error('mailbox pulse and time');
const a102 = auditFor('CASE-0102');
if (a102[0].summary !== 'Email received via mailbox push notification · Gx mailbox · 3 attachments (HDA, label, SDS)' || a102[1].summary !== 'Case CASE-0102 created' || !verifyChain(a102)) throw new Error('CASE-0102 audit');
await __until(() => /step 2 of 6/.test(qRow('CASE-0102').step), 6000);
__has('Finish digitizing CASE-0102'); __c('[data-a="finishsim"][data-v="CASE-0102"]');
if (q102.status !== 'Ready to approve') throw new Error('CASE-0102 ready');
for (const t of ['Ready to approve', '34/34', '97%', 'Case weight · 95%', '9/9']) if (!qRowT('CASE-0102').includes(t)) throw new Error('0102 row: ' + t);
if (!document.getElementById('toasts').innerText.includes('CASE-0102 digitized · ready to approve')) throw new Error('digitized toast');
if (!auditFor('CASE-0102').some(e => /Ready to approve/.test(e.summary))) throw new Error('0102 route event');
__c('[data-a="simmail"]'); if (!qRow('CASE-0103') || qRow('CASE-0103').sup !== 'Supplier S') throw new Error('CASE-0103');
finishSim('CASE-0103'); if (qRow('CASE-0103').status !== 'Ready to approve') throw new Error('0103 ready');
S.director = false; openCase('CASE-0102'); __has('Read-only summary'); __c('[data-a="nav"][data-v="queue"]');
S.clk = hms('09:40:12'); // the queue phases logged events; restore the demo clock for the scripted times below
// ---- 02_readonly_case_page
S.speed = 'fast';
__c('tr[data-v="CASE-0094"]'); __has('Read-only summary'); __has('NDC ' + qRow('CASE-0094').ndcs[2]); __has('Ready to approve');
__c('[data-a="ctab"][data-v="audit"]'); __has('Chain verified ✓'); __c('[data-a="nav"][data-v="queue"]');
// ---- 03_masters_tab
__c('[data-a="cat"][data-v="Masters"]'); __has('Future release · this category will run on the same platform with its own rule set'); __has('Masters · Future release'); __c('[data-a="cat"][data-v="Generics"]');
// ---- 04_case_open
__c('tr[data-v="CASE-0091"]'); __has('CASE-0091 · Xiromed · NDC 70700-0172-23');
__has('Fields ready 25/34'); __has('Case confidence 94%'); __has('Alert checks ✗ 8/9'); __has('Close case'); __has('Draft');
if (/Expected corrections|exp\. corrections/i.test(__t())) throw new Error('expected corrections retired');
__has('34 fields · 29 no LLM at runtime · 5 with an LLM step');
__c('#ar-moq'); await __w(500);
if (document.querySelectorAll('.hl').length !== 2) throw new Error('expected 2 highlight boxes');
const hb = document.querySelector('.hl').getBoundingClientRect(), cb = document.getElementById('r-moq-box').getBoundingClientRect();
if (Math.abs(hb.left - cb.left) > 12 || Math.abs(hb.top - cb.top) > 12) throw new Error('highlight box is not on the MOQ checkbox (zoom offset)');
// ---- 05_trust_moq
__c('[data-pill="moq"]'); await __w(300);
const p = document.querySelector('.trustxp').innerText;
for (const t of ['GENOVA TRUST SCORE · WHY', '72%', 'Escalate', 'OCR alone would say 93%', 'Lowest signal: LLM · conflicting handwritten value', 'raw 0.791', 'calibrated 72%', 'Calibrated on 1,240 PM decisions', 'Open in audit log', 'Run 10×'])
  if (!p.includes(t)) throw new Error('drill-down missing: ' + t);
if (document.querySelectorAll('.trustxp .sig').length !== 4) throw new Error('expected 4 signal bars');
if (!document.querySelector('.trustxp svg circle')) throw new Error('no calibration dot');
if (!document.querySelector('.modal.xp.trustxp .xp-k') || !document.querySelector('.trustxp .xp-f')) throw new Error('drill-down must use the .modal.xp pattern');
// ---- 06_all_34_scores
const want = { sell: 98, mfr: 97, moq: 72, cqty: 98, edim: 96, ewt: 96, cdim: 97, cwt: 88, tihi: 76, ndc: 99, gtine: 99, gtinc: 98, desc: 97, gen: 99, str: 98, form: 97, route: 91, vid: 99, vname: 99, inforem: 86, mica: 84, hosp: 97, iclass: 96, rx: 99, dea: 99, stor: 89, refr: 97, haz: 96, lot: 97, shelf: 90, coo: 95, pdesc: 97, brand: 100 };
const bad = Object.entries(want).filter(([k, v]) => scoreField(k).pct !== v).map(([k, v]) => k + ':' + scoreField(k).pct + '≠' + v);
if (bad.length) throw new Error(bad.join(' '));
if (!scoreField('pgtin').missing) throw new Error('pallet GTIN should be Missing · Alert');
const cs0 = caseSummary(); if (cs0.good !== 25 || cs0.conf !== 94 || cs0.low.k !== 'moq' || cs0.low.pct !== 72) throw new Error(JSON.stringify(cs0));
__c('[data-pill="inforem"]'); await __w(200);
if (!document.querySelector('.trustxp').innerText.includes('86%')) throw new Error('inforem');
// ---- 07_run10_popover
__c('[data-pill="moq"]'); await __w(200);
__c('[data-a="r10mode"][data-v="bypass"]'); __c('[data-a="run10"]'); await __until(() => S.r10 && S.r10.done);
if (!document.querySelector('.trustxp').innerText.includes('10/10 identical · 10 model calls · $0.04')) throw new Error('bypass result');
__c('[data-a="r10mode"][data-v="cached"]'); __c('[data-a="run10"]'); await __until(() => S.r10 && S.r10.done);
if (!document.querySelector('.trustxp').innerText.includes('1 model call, 9 cache hits')) throw new Error('cached result');
document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
// ---- 08_exec_tags
const tags = [...document.querySelectorAll('.arow .xtag')].map(e => e.textContent);
const cnt = l => tags.filter(t => t === l).length;
if (cnt('Static') !== 5 || cnt('Direct') !== 3 || cnt('Lookup') !== 4 || cnt('Interpretive · LLM step') !== 5 || cnt('Derived · code') !== 17) throw new Error(JSON.stringify([cnt('Static'), cnt('Direct'), cnt('Lookup'), cnt('Interpretive · LLM step'), cnt('Derived · code')]));
__has('prompt v1.6 · 3/3 runs identical');
// ---- 10_spot_accept
if (!document.querySelector('[data-a="acceptall"]').classList.contains('dis')) throw new Error('accept should need spot-audit');
__c('[data-a="spot"]'); __c('[data-a="viewspot"][data-v="cdim"]'); __c('[data-a="viewspot"][data-v="gtinc"]');
__c('[data-a="acceptall"]'); __has('25 fields ≥ 95% accepted');
// ---- 11_edit_moq
__c('[data-a="thumb"][data-k="ndc"]'); __has('feedback logged');
__c('[data-a="edit"][data-k="moq"]');
__set('#ed-val', '1'); __set('#ed-reason', 'Write-in overrides checkbox'); __set('#ed-com', 'Supplier wrote 1 by hand; checkbox shows 16');
const m0 = ruleMetrics('MOQ');
if (m0.casesSince !== 860 || m0.corr30 !== 5 || m0.cases30 !== 215 || pct(m0.rate30) !== '2.3%' || m0.trend !== 'up' || m0.corrSince !== 10 || pct(m0.rateLive) !== '1.2%' || rulePattern('MOQ').n !== 3) throw new Error('MOQ before the edit ' + JSON.stringify(m0));
__c('[data-a="saveedit"]');
const m1 = ruleMetrics('MOQ');
if (m1.corr30 !== 6 || pct(m1.rate30) !== '2.8%' || m1.corrSince !== 11 || pct(m1.rateLive) !== '1.3%' || rulePattern('MOQ').n !== 4 || m1.rows[0][1] !== 'CASE-0091') throw new Error('MOQ after the edit ' + JSON.stringify(m1));
__has('(was 16)'); __has('Edited'); __has('4 MOQ edits in 30 days');
if (!document.getElementById('toasts').innerText.includes('Feedback captured · MOQ · reason: write-in overrides checkbox')) throw new Error('toast');
// ---- 12_audit_log
__c('[data-a="ctab"][data-v="audit"]');
for (const t of ['Chain verified ✓', 'Failure: Snowflake timeout after 5 s', 'Retry 1/3 succeeded', '1 failure (recovered)', '3 LLM calls', 'Opened case', 'Spot-audit viewed', 'Accepted 25 fields', 'MOQ 16 → 1', 'Human · Product Manager']) __has(t);
const a91 = S.audit['CASE-0091'];
if (fmtT(a91.find(e => e.summary === 'Opened case').ts) !== '09:40:12') throw new Error('open time');
if (fmtT(a91.find(e => /^MOQ 16/.test(e.summary)).ts) !== '09:43:37') throw new Error('edit time');
__set('select[data-c="afield"]', 'moq');
for (const t of ['Lineage of MOQ', 'Handwriting region detected', 'MOQ conflict reader', 'Rule · MOQ v0.3', 'MOQ 16 → 1']) __has(t);
const js = exportAudit('CASE-0091', 'json'); if (JSON.parse(js).length !== a91.length) throw new Error('export json');
const csv = exportAudit('CASE-0091', 'csv'); if (!csv.startsWith('id,ts,type')) throw new Error('export csv');
__c('[data-a="aclear"]');
// ---- 12z_tower_ia
const oneP = () => document.querySelectorAll('#main .btn.pri:not(.dis)').length;
const tiles = () => [...document.querySelectorAll('#rmetrics .rbig')].map(b => b.textContent).join('|');
const rt = () => document.getElementById('pg-rules').innerText;
const cr = () => [...document.querySelectorAll('#rcorr .rcit')].map(r => r.dataset.v).join(',');
const vrows = () => [...document.querySelectorAll('#rversions .vrow2')].map(r => r.innerText.replace(/\s+/g, ' ').trim());
const tt = () => [...document.querySelectorAll('#ttiles .kpi .val')].map(e => e.textContent).join('|');
const kd = (key, o = {}) => document.dispatchEvent(new KeyboardEvent('keydown', Object.assign({ key, bubbles: true }, o)));
Object.assign(window, { oneP, tiles, tt, kd, rt, cr, vrows });
__c('#side [data-a="nav"][data-v="tower"]');
if (S.screen !== 'tower' || S.tower.tab !== 'rules' || S.tower.sel !== 'MOQ') throw new Error('the Rule Tower opens on Rules · MOQ');
const tabsT = [...document.querySelectorAll('.tw-tabs .tabs button')].map(b => b.dataset.v).join(',');
if (tabsT !== 'rules,proposals') throw new Error('tabs ' + tabsT);
if (document.querySelector('.catcol,.trcol,.fcard,.tw-b,#twtrace')) throw new Error('old layout remains');
for (const t of ['Rule Tower · Generics', '34 attributes · 4 lookups and prompts']) __has(t);
if (!document.getElementById('rsum') || document.querySelector('#mapsvg,#ov-kpis,#ov-attn')) throw new Error('Rules page, no Overview or Map');
__c('.tw-tabs [data-a="tab"][data-v="proposals"]'); __c('#main .crumb a[data-a="tab"][data-v="rules"]'); if (S.tower.tab !== 'rules') throw new Error('breadcrumb root opens Rules');
// picker: Ctrl+K from any Rule Tower tab opens Rules with the picker; 34 attribute rules + 4 lookups and prompts, pinned Needs attention, search, keyboard
kd('k', { ctrlKey: true });
if (S.tower.tab !== 'rules' || !S.tower.pick.open || document.activeElement.id !== 'rpick-q') throw new Error('Ctrl+K opens Rules with the picker and the search focused');
if (document.querySelector('.tw-tabs #rpick') || !document.querySelector('#pg-rules #rpick-w')) throw new Error('the picker sits in the Rules tab, below the tabs');
const grpT = [...document.querySelectorAll('.rp-g')].map(g => g.textContent).join('|');
if (grpT !== 'Needs attention|Packaging|Product identity|Vendor and reference|Regulatory and handling|Descriptive|Lookups and prompts') throw new Error('groups ' + grpT);
if (ruleList().length !== 38 || new Set([...document.querySelectorAll('.rp-i')].map(b => b.dataset.v)).size !== 38) throw new Error('picker lists 34 + 4 rules');
const pinned = []; for (const el of document.querySelector('#rpick-list').children) { if (el.classList.contains('rp-g') && pinned.length) break; if (el.classList.contains('rp-i')) pinned.push(el.dataset.v); }
if (pinned.join() !== 'MOQ,INFOREM,Storage temperature') throw new Error('Needs attention ' + pinned.join());
if (!document.querySelector('.rp-i[data-v="Pallet Ti × Hi"] .sdot.none') || !document.querySelector('.rp-i[data-v="Pallet Ti × Hi"]').innerText.includes('No rule')) throw new Error('no-rule dot and label');
if (!document.querySelector('.rp-i[data-v="Storage temperature"] .sdot.prop') || !document.querySelector('.rp-i[data-v="MOQ"] .ver').textContent.includes('v0.3')) throw new Error('open proposal dot and live version');
if (document.querySelector('.rp-i .tl')) throw new Error('no tier pill in the picker');
__set('#rpick-q', 'abbrev'); if (document.querySelectorAll('.rp-i').length !== 1) throw new Error('search');
kd('Enter'); if (S.tower.tab !== 'rules' || S.tower.sel !== 'Abbreviations' || S.tower.pick.open) throw new Error('Enter selects');
__has('Abbreviations (lookup)'); __has('v2.1 · Live');
openPicker(); __set('#rpick-q', 'v0.4'); kd('ArrowDown'); if (S.tower.pick.idx !== 1) throw new Error('arrow keys'); kd('Escape'); if (S.tower.pick.open) throw new Error('Esc closes');
// MOQ rule page (after the demo edit on CASE-0091)
selectRule('MOQ');
if (tiles() !== '860|6|11') throw new Error('MOQ tiles ' + tiles());
for (const t of ['v0.3 · Live', 'Rule', 'Read the ticked MOQ checkbox · HDA p.2', 'If several boxes are ticked, take the lowest and raise an alert', 'Output MOQ as a whole number', 'Cases on v0.3', 'PM corrections', 'Last 30 days', '6 of 215 cases · 2.8%', '↑ rising', 'Since v0.3 live', '11 of 860 cases · 1.3%', 'Review threshold 2.0%',
  'Why PMs corrected it · last 30 days', 'Recent corrections', '4 corrections say', '"Write-in overrides checkbox"', 'Start proposal from this pattern', 'No open proposal', 'Propose a change', 'Version history', 'Compare versions', 'Test evidence']) __has(t);
for (const t of ['Runs as code', 'Governed', 'How it works', 'Inputs and sources', 'Dependencies', 'Golden cases', 'Accepted unchanged', 'View logic', 'owner:', 'Approval flow']) if (rt().includes(t)) throw new Error('removed from the Rules tab: ' + t);
if (document.querySelectorAll('#rsteps li').length !== 4 || document.querySelectorAll('#rsum .badge').length !== 1) throw new Error('four steps and one status chip');
if (!document.querySelector('#rmetrics .rtick') || !document.querySelector('#rmetrics .rbar i').style.background.includes('--warn')) throw new Error('bars with a threshold tick, 30-day bar in warn');
if (document.querySelector('#rsum .mg').dataset.tip !== 'Cases processed on this version since it went live' || document.querySelector('#rmetrics .rthr').dataset.tip !== 'When the 30-day correction rate reaches this level, the rule is flagged for review') throw new Error('metric tooltips');
const bars = () => [...document.querySelectorAll('#rcorr .rreason')].map(b => b.innerText.replace(/\s+/g, ' ').trim()).join('|');
if (bars() !== 'Write-in overrides checkbox 4|Supplier confirmed by email 1|Document error 1|Reference data wrong 0|Other 0') throw new Error('reason bars ' + bars());
if (!document.querySelector('#rcorr .rreason[data-v="Write-in overrides checkbox"] .bar i').style.background.includes('--warn')) throw new Error('dominant reason in warn');
if (cr() !== 'CASE-0091,CASE-0084,CASE-0071,CASE-0063,CASE-0057') throw new Error('recent corrections ' + cr());
if (document.querySelector('#rcorr .rcit[data-v="CASE-0091"] .badge').dataset.tip !== 'Supplier wrote 1 by hand; checkbox shows 16') throw new Error('PM comment tooltip');
__has('Show all 6'); __c('[data-a="corrall"]'); if (cr().split(',').length !== 6) throw new Error('show all');
__c('#rcorr .rreason[data-v="Document error"]'); if (cr() !== 'CASE-0049' || !document.querySelector('#rcorr .rreason.on')) throw new Error('reason filter ' + cr());
__c('#rcorr .rreason[data-v="Document error"]'); if (cr().split(',').length !== 6) throw new Error('clear reason filter');
__c('#rcorr .rcit[data-v="CASE-0084"]'); if (S.screen !== 'caseX' || S.caseId !== 'CASE-0084' || !S.xsel || S.xsel.k !== 'moq') throw new Error('a correction row opens the case on the field');
selectRule('MOQ');
const vr0 = vrows(); if (vr0.length !== 3 || !vr0[0].startsWith('v0.3 live 16 weeks ago') || !vr0[1].startsWith('v0.2 superseded 24 weeks ago') || !vr0[2].startsWith('v0.1 superseded 32 weeks ago')) throw new Error('version history ' + vr0.join(' / '));
if (document.querySelector('#rversions [data-a="cmpprev"][data-ver="0.1"]') || document.querySelector('#rversions [data-a="revert"]')) throw new Error('no Compare on the first version · no Revert on the Rules tab');
__c('#rversions [data-a="cmpprev"][data-ver="0.3"]'); if (S.cmp.a !== '0.2' || S.cmp.b !== '0.3') throw new Error('compare with the previous version'); __has('VERSIONS · COMPARE'); __c('#layers .x');
__c('#rversions [data-a="evidence"][data-ver="0.3"]'); if (!document.querySelector('#layers .modal.xp')) throw new Error('evidence in .modal.xp'); __has('Evidence recorded at approval · CP-0008 · 16 weeks ago'); __c('#layers .x');
// other rules
selectRule('Pallet Ti × Hi'); __has('No rule · PMs enter this value manually'); __has('Create rule'); __has('No correction pattern · corrections within normal range'); __has('No versions yet');
if (tiles() !== '–|–') throw new Error('no-rule tiles ' + tiles());
selectRule('Selling unit'); if (tiles() !== '1,150|1|5') throw new Error('Selling unit tiles ' + tiles()); __has('1 of 230 cases · 0.4% steady'); __has('5 of 1,150 cases · 0.4%'); __has('No correction pattern');
selectRule('Manufacturer size'); __has('1 of 220 cases · 0.5%'); __has('7 of 1,400 cases · 0.5%'); __has('No correction pattern');
selectRule('Storage temperature'); __has('4 of 180 cases · 2.2%'); __has('8 of 520 cases · 1.5%'); __has('Above review threshold · no single dominant reason'); __has('CP-0013 open · awaiting Senior PM ›'); __has('CP-0013 · awaiting Senior PM');
if (document.querySelector('#rpattern [data-a="startpat"]')) throw new Error('no start button with an open proposal');
for (const x of ruleList()) { if (RULE_CORR[x.name]) continue; const m = ruleMetrics(x.name); if (!m.none && (m.rate30 >= RULE_THR || m.rateLive > 1 || rulePattern(x.name).kind !== 'none')) throw new Error('generated rule not stable: ' + x.name); }
selectRule('Shelf life'); __has('No correction pattern · corrections within normal range');
selectRule('INFOREM'); __has('5 of 190 cases · 2.6%'); __has('9 of 640 cases · 1.4%'); __has('3 corrections say'); __has('"Reference data wrong"'); __has('CP-0012 open · changes requested ›'); __has('CP-0012 · changes requested');
if (document.querySelector('#rpattern [data-a="startpat"]')) throw new Error('INFOREM has an open proposal · no start button');
// back and forward record rule selections
navBack(); if (S.tower.sel !== 'Shelf life') throw new Error('back restores the previous rule'); navFwd(); if (S.tower.sel !== 'INFOREM') throw new Error('forward');
// CP-0012 is actionable: the PM responds, the Senior PM approves and it goes live
__c('#rpattern [data-a="viewprop"]'); if (S.propView !== 'CP-0012') throw new Error('Open CP-0012');
if (!document.getElementById('ppfoot').innerText.includes('Needs a test for multi-strength vendors')) throw new Error('changes-requested comment on the proposal page');
if (document.getElementById('pp-test').innerText.includes('Technical gates')) throw new Error('Governed proposals skip the technical gates');
__c('#ppfoot [data-a="updateprop"]'); const P12 = findProp('CP-0012'); await __until(() => P12.checksDone && P12.status === 'open');
setPersona('spm'); if (S.tower.tab !== 'proposals' || document.querySelector('[data-a="propsub"]') || document.querySelector('#proptable tr.pgrp').textContent !== 'Awaiting your approval · 2' || document.querySelector('#proptable tr[data-v]').dataset.v !== 'CP-0012') throw new Error('Senior PM · awaiting approval first');
viewProposal('CP-0012'); __c('#ppfoot [data-a="papprove"]'); await __until(() => P12.status === 'merged');
selectRule('INFOREM'); __has('v0.6 · Live'); __has('Monitoring · not enough data yet'); __has('No correction pattern · corrections within normal range');
__has('Rules are proposed by the Product Manager'); if (oneP() !== 0 || document.querySelector('#raction.btn')) throw new Error('read-only rule page for the Senior PM');
// CP-0013: an Interpretive change needs the Senior PM and all automated technical gates; Admin can view but not approve
setPersona('admin');
const P13 = findProp('CP-0013'); viewProposal('CP-0013');
if (document.querySelector('#ppfoot [data-a="papprove"]') || !document.getElementById('ppfoot').innerText.includes('Read-only · Rule changes are approved by the Senior Product Manager')) throw new Error('Admin sees the proposal read-only');
approveProp(P13); if (Object.keys(P13.approvals).length) throw new Error('Admin must never approve rule changes');
setPersona('pm'); viewProposal('CP-0009'); __has('Proposed by Admin');
const P9 = findProp('CP-0009'); if (!P9.approvals.spm || P9.proposerRole !== 'admin' || !P9.gated || !gatesOk(P9)) throw new Error('CP-0009 seed');
approveProp(P13); if (Object.keys(P13.approvals).length) throw new Error('the PM never approves');
setPersona('spm'); selectRule('Storage temperature'); __has('CP-0013 · awaiting Senior PM'); __has('Rules are proposed by the Product Manager');
viewProposal('CP-0013');
for (const t of ['8 of 8 passed', 'Technical gates · automated', 'Automated', 'Consistency', '10/10 runs identical', 'Golden-set regression', '0 regressions on 50 golden cases', 'Output schema unchanged', 'Model gateway checks', '8/8 passed: pinned model, injection screening, masking, schema, budget…', 'Cost impact within budget headroom', '+$12/month · headroom $680']) __has(t);
for (const id of ['pp-why', 'pp-diff', 'pp-test', 'pp-impact', 'pp-ba', 'pp-tl']) if (!document.getElementById(id)) throw new Error('legacy proposal section ' + id);
// a failing gate blocks approval
S.gateFail = true; render(); __has('9/10 runs identical'); __has('Technical gate failed');
if (!document.querySelector('.chk.bad')) throw new Error('failing gate shown in red');
const ab = document.querySelector('#ppfoot [data-a="papprove"]'); if (!ab || !ab.classList.contains('dis') || ab.dataset.tip !== 'Technical gate failed · fix and re-run checks') throw new Error('approve disabled on a failed gate');
approveAndPublish(P13); if (P13.approvals.spm || P13.status !== 'open') throw new Error('no approval on a failed gate');
S.gateFail = false; render();
__c('#ppfoot [data-a="papprove"]'); await __until(() => P13.status === 'merged');
if (!S.vhist['Storage temperature'].some(v => v.cp === 'CP-0013' && v.approvers.join() === 'Senior PM')) throw new Error('CP-0013 version history');
setPersona('pm');
S.screen = 'case'; S.caseId = 'CASE-0091'; S.caseTab = 'audit'; render();setPersona('pm');
S.screen = 'case'; S.caseId = 'CASE-0091'; S.caseTab = 'audit'; render();
// ---- 13_create_new_define
__c('[data-a="ctab"][data-v="attrs"]');
__c('#savetc'); if (!S.testCases.includes('CASE-0091') || S.testCases.length !== 6 || !document.getElementById('savetc').innerText.includes('Saved as test case ✓')) throw new Error('Save as test case on CASE-0091');
if (!S.audit['CASE-0091'].some(e => /Saved as test case/.test(e.summary))) throw new Error('save as test case audit event');
__c('[data-a="propose"]');
if (S.role !== 'pm' || S.screen !== 'tower' || S.tower.tab !== 'proposals' || S.propView !== 'new' || S.d.rule !== 'MOQ') throw new Error('the suggestion card opens Proposals › Create new for MOQ, as the PM');
if (document.getElementById('pfield').value !== 'MOQ' || document.getElementById('rule-text').value !== 'If the supplier has handwritten a MOQ, use that and ignore the checkboxes') throw new Error('field preselected and text pre-filled');
__has('Create new proposal · MOQ'); __has('Save draft');
const cur0 = document.getElementById('currule'); if (!cur0.innerText.includes('v0.3 · Live') || cur0.querySelectorAll('li').length !== 4) throw new Error('current rule card');
if (!document.querySelector('#sec2.lock') || !document.querySelector('#sec3.lock') || !document.getElementById('sec2').innerText.includes('Locked')) throw new Error('Test and Send are locked');
if (document.querySelector('[data-a="sbrun"],[data-a="nextstep"],#stepper')) throw new Error('no stepper and no Run button');
selectRule('MOQ'); if (document.getElementById('raction').textContent !== 'Continue draft') throw new Error('rule page offers Continue draft');
__c('#raction'); if (S.propView !== 'new' || document.getElementById('rule-text').value !== SC.S1.text) throw new Error('Continue draft reopens Create new');
if (oneP() !== 1) throw new Error('one primary action · ' + oneP());
__c('[data-a="interpret"]'); await __until(() => document.querySelector('[data-a="confirm"]'));
__has('MOQ · draft v0.4 (live v0.3)'); __has('Interpreted in 2.1 s'); __has('Interpreted by pinned model · 2.1 s · $0.006 · 8/8 gateway checks ✓');
__has('Handwritten MOQ now takes priority over checkboxes');
const dk = () => [...document.querySelectorAll('#dfx li')].map(l => l.className || 'same').join(',');
if (dk() !== 'add,rew,same,same,same' || document.querySelector('#dfx li.mov')) throw new Error('hero diff ' + dk());
const dl = [...document.querySelectorAll('#dfx .dl')].map(e => e.textContent).join(',');
if (dl !== 'Added,Reworded') throw new Error('diff labels ' + dl);
if (!document.querySelector('#dfx li.rew s').textContent.includes('Read the ticked MOQ checkbox · HDA p.2') || !document.querySelector('#dfx li.rew ins').textContent.includes('Otherwise, read the ticked MOQ checkbox · HDA p.2')) throw new Error('reworded old and new text');
__c('[data-a="dsbs"]'); if (!document.querySelector('#interp #cvp')) throw new Error('side by side'); __c('[data-a="dsbs"]');
// the diff marks a move only when the order really changed
const mv = ruleDiff(['A step one', 'B step two', 'C step three'], ['C step three', 'A step one', 'B step two']).map(r => r.kind).join(',');
const ins = ruleDiff(['A step one', 'B step two'], ['New first line', 'A step one', 'B step two']).map(r => r.kind).join(',');
const rm = ruleDiff(['A step one', 'B step two', 'C step three'], ['A step one', 'C step three']).map(r => r.kind).join(',');
if (mv !== 'mov,same,same' || ins !== 'add,same,same' || rm !== 'same,del,same') throw new Error('ruleDiff ' + [mv, ins, rm].join(' / '));
__c('[data-a="modeltoggle"]'); __has('Gateway checkpoints'); __c('[data-a="modeltoggle"]');
__c('[data-a="compiled"]'); if (!document.querySelector('#layers .modal.xp .xp-f')) throw new Error('compiled rule should open in .modal.xp');
__has('COMPILED RULE · WHAT ACTUALLY RUNS'); __has('0 LLM calls at runtime'); __has('hw.confidence >= 0.60');
S.r100 = null; __c('#layers [data-a="run100"]'); await __until(() => S.r100 && S.r100.done); __has('identical · 0 LLM calls · 3 ms total'); __c('#layers .x');
// ---- 14_test_auto
// the director's failure: one unintended change on a saved test case
S.nextUnintended = true;
__c('[data-a="confirm"]'); if (!S.d.defined || !document.querySelector('#sec1 .fs-sum') || document.querySelector('#sec2.lock')) throw new Error('confirm collapses Define and unlocks Test');
await __until(() => S.d.test && (S.d.test.done || S.d.test.hold));
if (!S.d.test.hold || S.d.test.s2.totals.unint !== 1) throw new Error('one unintended change expected');
__has('1 unintended change stops submit'); __has('CASE-0048'); __has('"min 6 per case"'); if (!document.querySelector('#sec3.lock')) throw new Error('Send stays locked');
__c('[data-a="markopen"][data-v="CASE-0048"]'); __c('[data-a="marksave"]'); if (S.d.marks['CASE-0048']) throw new Error('a reason is required');
if (!document.getElementById('mark-txt')) throw new Error('the reason box stays open'); __set('#mark-txt', 'Supplier confirmed by email that 6 is the minimum'); __c('[data-a="marksave"]');
await __until(() => S.d.test.pass);
if (S.d.test.s2.totals.intended !== 1 || S.d.test.ep !== 'EP-0042') throw new Error('marked intended · evidence pack EP-0042');
// editing Define clears the test and locks the later sections
__c('#sec1 [data-a="fsec"]'); __set('#rule-text', 'Only use a MOQ handwritten in the MOQ box on HDA p.2');
if (S.d.defined || S.d.test || !document.querySelector('#sec2.lock') || !document.querySelector('#sec3.lock')) throw new Error('editing re-locks');
__c('[data-a="interpret"]'); await __idle(); if (S.d.variant !== 'box') throw new Error('MOQ box wording');
__c('[data-a="confirm"]'); await __until(() => S.d.test && S.d.test.done);
if (!S.d.test.pass || S.d.test.s2.totals.unint || S.d.test.s2.totals.intended) throw new Error('rephrased rule passes with no unintended change');
S.nextUnintended = false;
__c('#sec1 [data-a="fsec"]'); __c('#sec1 [data-a="rephrase"]'); __set('#rule-text', SC.S1.text); __c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]');
await __until(() => S.d.test && S.d.test.done);
const T4 = S.d.test;
if (!T4.pass || T4.ep !== 'EP-0044' || T4.s1.rows.filter(r => r.ok).length !== 4) throw new Error('hero test ' + JSON.stringify([T4.pass, T4.ep]));
if (T4.s2.counts.approved !== 209 || T4.s2.counts.changed !== 6 || T4.s2.counts.saved !== 6) throw new Error('reference counts ' + JSON.stringify(T4.s2.counts));
__has('4 of 6 PM corrections now fixed'); __has('evidence pack EP-0044');
if (!document.querySelector('#sec2 .fs-sum') || document.querySelector('#sec3.lock') || !document.getElementById('sendlist')) throw new Error('Test collapses; Send unlocks and expands');
__c('#sec2 [data-a="fsec"]');
if (document.getElementById('refhead').innerText !== '4 of 6 PM corrections now fixed') throw new Error('headline ' + document.getElementById('refhead').innerText);
if (document.getElementById('refsub').innerText !== '2 not fixed: corrected for other reasons (Supplier confirmed by email · Document error)') throw new Error('sub-line ' + document.getElementById('refsub').innerText);
const tot = [...document.querySelectorAll('#reftot .otag')].map(e => e.textContent).join('|'); if (tot !== 'Pass 215|Fixed 4|Not fixed 2|Unintended 0|Broken 0') throw new Error('totals ' + tot);
for (const t of ['PM approved · last 30 days', 'PM changed · last 30 days', 'Saved as test case · any age', 'Consistent on 3 runs', 'Schema valid', 'Gateway checks passed', 'Cost within budget', 'Test results saved as evidence pack']) __has(t);
if (!document.querySelector('#tstg2 [data-tip^="Known-correct cases from PM work"]')) throw new Error('reference cases tooltip');
__c('[data-a="reftable"]'); if (document.querySelectorAll('#reftable tbody tr').length !== 13) throw new Error('case table rows ' + document.querySelectorAll('#reftable tbody tr').length);
if (!document.querySelector('#reftable tr[data-case="CASE-0091"] .otag.fixed') || !document.querySelector('#reftable tr[data-case="CASE-0057"] .otag.notfixed')) throw new Error('case outcomes');
// Save draft, then reopen from the list at the same stage
__c('#savedraft'); const PD = findProp(S.d.pid); if (!PD || PD.id !== 'CP-0014' || PD.status !== 'draft') throw new Error('Save draft · CP-0014');
__c('[data-a="proplist"]'); if (!document.querySelector('#proptable tr[data-v="CP-0014"]').innerText.includes('Draft')) throw new Error('draft in the list');
__c('#proptable tr[data-v="CP-0014"]'); if (S.propView !== 'new' || !S.d.test || !S.d.test.pass || !document.getElementById('sendlist')) throw new Error('draft reopens at Send for approval');
// ---- 15_proposal_send_approve
__c('[data-a="reviewprop"]'); const P = findProp('CP-0014');
if (S.propView !== 'CP-0014' || !P.presend) throw new Error('Review proposal opens the proposal page before sending');
for (const id of ['phero', 'pp-why', 'pp-diff', 'pp-test', 'pp-impact', 'pp-ba', 'pp-tl', 'ppfoot']) if (!document.getElementById(id)) throw new Error('proposal page section ' + id);
const ppt = id => document.getElementById(id).innerText;
for (const t of ['CP-0014 · MOQ', 'v0.3 → v0.4', 'Draft', 'Proposed by Product Manager', 'EP-0044']) if (!ppt('phero').includes(t)) throw new Error('header: ' + t);
if (!ppt('pp-why').includes(SC.S1.text) || !ppt('pp-why').includes('4 corrections: Write-in overrides checkbox') || document.querySelectorAll('#pp-pattern [data-a="corrrow"]').length !== 4) throw new Error('why this change');
if ([...document.querySelectorAll('#pp-diff #dfx li')].map(l => l.className || 'same').join(',') !== 'add,rew,same,same,same') throw new Error('proposal diff');
__c('[data-a="ppsbs"]'); if (!document.querySelector('#pp-diff #cvp')) throw new Error('proposal side by side'); __c('[data-a="ppsbs"]');
for (const t of ['Validity 4/4', '4 of 6 PM corrections now fixed', 'Consistent on 3 runs', 'EP-0044']) if (!ppt('pp-test').includes(t)) throw new Error('test summary: ' + t);
for (const t of ['4 of 215', 'CASE-0091', 'CASE-0094', 'MOQ → Selling unit']) if (!ppt('pp-impact').includes(t)) throw new Error('impact: ' + t);
for (const t of ['CASE-0091', 'Checkbox 16 · handwritten 1', '16 → 1', 'CASE-0084', 'CASE-0071']) if (!ppt('pp-ba').includes(t)) throw new Error('before and after: ' + t);
for (const t of ['Created', 'Tested', 'EP-0044']) if (!ppt('pp-tl').includes(t)) throw new Error('timeline: ' + t);
if (oneP() !== 1 || !document.querySelector('#ppfoot [data-a="backedit"]')) throw new Error('pre-send: Back to edit · Send for approval');
__c('#ppfoot [data-a="sendprop"]');
if (P.status !== 'open' || !P.locked || S.propView !== null || !document.querySelector('#proptable tr[data-v="CP-0014"]').innerText.includes('Sent for approval')) throw new Error('send locks the proposal and returns to the list');
if (!document.getElementById('toasts').innerText.includes('CP-0014 sent for approval')) throw new Error('send toast');
viewProposal('CP-0014'); if (document.querySelector('#ppfoot [data-a="papprove"],#ppfoot [data-a="sendprop"]')) throw new Error('the proposer sees a read-only page');
__has('Sent for approval · waiting for the Senior PM');
approveProp(P); if (P.approvals.pm || P.status !== 'open') throw new Error('the PM must never approve their own proposal');
selectRule('MOQ'); __has('CP-0014 · awaiting Senior PM'); __has('CP-0014 open · awaiting Senior PM ›'); __has('Propose a change');
viewProposal('CP-0014');
openChooser(); if (!document.getElementById('overlay').innerText.includes('1 proposal waiting for your review · CP-0014 MOQ: handwritten value overrides checkbox')) throw new Error('Senior PM tile should show the live proposal'); closeOv();
__has('Switch to Senior PM to review →'); __c('[data-a="handoff"][data-v="spm"]');
await __until(() => S.role === 'spm' && !S.switching && S.propView === 'CP-0014');
S.propView = null; render();
if (document.querySelector('#proptable tr[data-v]').dataset.v !== 'CP-0014' || document.querySelector('#proptable tr.pgrp').textContent !== 'Awaiting your approval · 1') throw new Error('awaiting approval first');
__c('tr[data-v="CP-0014"]');
// Request changes needs a comment; the PM then edits in Create new and tests again
__c('#ppfoot [data-a="preqopen"]'); __c('#ppfoot [data-a="preqchg"]'); if (P.status !== 'open') throw new Error('a comment is required');
__set('#req-comment', 'Please add a note on illegible handwriting'); __c('#ppfoot [data-a="preqchg"]');
if (P.status !== 'changes' || P.reqComment !== 'Please add a note on illegible handwriting') throw new Error('changes requested');
setPersona('pm'); S.screen = 'tower'; S.tower.tab = 'proposals'; S.propView = null; render(); __c('#proptable tr[data-v="CP-0014"]');
if (S.propView !== 'new' || S.d.pid !== 'CP-0014' || S.d.defined || S.d.test || !document.getElementById('reqnote')) throw new Error('changes requested reopens Create new with Define editable');
__c('[data-a="confirm"]'); await __until(() => S.d.test && S.d.test.done); if (!S.d.test.pass) throw new Error('fresh test');
__c('[data-a="reviewprop"]'); __c('#ppfoot [data-a="sendprop"]'); if (P.status !== 'open' || !P.events.some(e => /re-sent for approval/.test(e.text))) throw new Error('re-sent');
setPersona('spm'); viewProposal('CP-0014'); if (oneP() !== 1) throw new Error('one primary on the proposal page');
__c('#ppfoot [data-a="papprove"]'); await __until(() => P.status === 'merged');
if (S.reg.MOQ.live !== '0.4') throw new Error('approve makes v0.4 live');
__has('Approved · live');
if (!S.audit['CASE-0091'].some(e => /CP-0014 approved · live/.test(e.actor.name) && /approver Senior PM/.test(e.summary))) throw new Error('approval audit event');
const rvb = document.querySelector('#ppfoot [data-a="revert"]'); if (!rvb || !rvb.classList.contains('dis') || rvb.dataset.tip !== 'Rollbacks are proposed by the Product Manager or Admin · the Senior PM approves') throw new Error('the Senior PM does not propose rollbacks');
selectRule('MOQ'); __has('v0.4 · Live'); __has('If a MOQ is handwritten on HDA p.2, use it and skip the checkboxes'); __has('Monitoring · not enough data yet'); __has('Review threshold 2.0%'); __has('No correction pattern · corrections within normal range'); __has('No corrections on v0.4 yet');
if (tiles() !== '0') throw new Error('MOQ after approval ' + tiles());
const vr1 = vrows(); if (!vr1[0].startsWith('v0.4 live just now') || !vr1[1].startsWith('v0.3 superseded 16 weeks ago')) throw new Error('versions after approval ' + vr1.join(' / '));
__c('#rversions [data-a="evidence"][data-ver="0.4"]'); __has('From CP-0014'); __has('evidence pack EP-0045'); __has('4 of 6 PM corrections now fixed'); __c('#layers .x');
S.screen = 'queue'; render(); if (!qRowT('CASE-0091').includes('Rule updated · re-run available')) throw new Error('re-run flag after approval');
viewProposal('CP-0014');
// ---- 16_handoff_case_rerun
__has('Switch to Product Manager to re-run CASE-0091 →'); __c('[data-a="handoff"][data-v="pm"]');
await __until(() => S.role === 'pm' && !S.switching && S.screen === 'case');
__has('Rule updated since this case was digitized · MOQ v0.4'); __c('[data-a="rerun"]'); await __idle();
__has('Matches your edit ✓'); __has('Fields ready 26/34'); __has('Case confidence 95%'); __has('lowest: Pallet Ti × Hi 76%');
if (!S.audit['CASE-0091'].some(e => /MOQ 72% → 96% · 26\/34 ≥ 95% · case confidence 94% → 95% · lowest: Pallet Ti × Hi 76%/.test(e.summary))) throw new Error('re-run trust event');
S.screen = 'queue'; render();
for (const t of ['26/34', '95%', 'Pallet Ti × Hi · 76%']) if (!qRowT('CASE-0091').includes(t)) throw new Error('0091 after re-run: ' + t);
if (qRowT('CASE-0091').includes('re-run available')) throw new Error('flag must clear after re-run');
S.screen = 'case'; render();
if (scoreField('moq').pct !== 96) throw new Error('moq after');
__c('[data-pill="moq"]'); await __w(200); if (!document.querySelector('.trustxp').innerText.includes('96%')) throw new Error('drill-down 96');
document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
// ---- 17_approve_lock_output
__c('[data-a="submitcase"]'); __has('Approved & submitted');
const lk = document.querySelector('[data-why^="Locked at approval"]'); if (!lk || !/Locked at approval · \d\d:\d\d:\d\d · Product Manager/.test(lk.dataset.why)) throw new Error('lock');
__c('[data-a="output"]'); __has('Matches approved record 34/34 ✓'); __c('.modal .x');
if (!S.audit['CASE-0091'].some(e => /Excel generated from approved record · checksum match 34\/34/.test(e.summary))) throw new Error('output audit event');
__has('Done'); __has('output matched 34/34'); if (document.querySelector('[data-a="closecase"]')) throw new Error('approved case cannot be closed');
const xa = downloadCase('CASE-0091', 'approved'); if (!/APPROVED · Product Manager · Generics · .* · matches approved record/.test(xa) || !xa.includes('Y · Write-in overrides checkbox') || !xa.includes('MOQ v0.4')) throw new Error('0091 approved file');
S.screen = 'queue'; S.qf = QF_DEFAULT(); S.qf.tab = 'done'; render(); if (!document.querySelector('tr[data-v="CASE-0091"] [data-a="dl"][data-k="approved"]') || qOrder().slice(0, 4) !== '0091') throw new Error('0091 in Done'); S.qf = QF_DEFAULT(); S.screen = 'case'; S.caseTab = 'attrs'; render();
// revert MOQ after approval: approved case must not change
selectRule('MOQ'); if (tiles() !== '2') throw new Error('re-run and approval count on v0.4 ' + tiles());
viewProposal('CP-0014');
__c('#ppfoot [data-a="revert"][data-to="0.3"]'); __has('Rollback policy: Senior PM approval');
const RV = findProp(S.propView); await __until(() => RV.checksDone);
if (RV.required.join() !== 'spm' || RV.gated) throw new Error('rollback needs the Senior PM');
setPersona('spm'); viewProposal(RV.id); __c('#ppfoot [data-a="papprove"]'); await __until(() => RV.status === 'merged');
if (S.reg.MOQ.live !== '0.3') throw new Error('revert');
selectRule('MOQ'); if (tiles() !== '860|6|11') throw new Error('v0.3 values restored ' + tiles()); __has('6 of 215 cases · 2.8%'); __has('4 corrections say');
if (!document.querySelector('#rversions .vst-rev') || !vrows()[0].startsWith('v0.4 reverted')) throw new Error('reverted version struck through');
setPersona('pm'); S.screen = 'case'; S.caseTab = 'attrs'; render(); __has('published after approval · approved values unchanged');
await rerunCase(); if (moqState().value !== '1') throw new Error('approved case changed');
// ---- 18_versions_compare
selectRule('MOQ'); __c('#rversions > [data-a="cmpopen"]');
for (const v of ['0.1', '0.2', '0.3', '0.4']) if (!document.querySelector(`select[data-c="cmpa"] option[value="${v}"], select[data-c="cmpa"]`).innerHTML.includes(v)) throw new Error('version ' + v);
__set('select[data-c="cmpa"]', '0.3'); __set('select[data-c="cmpb"]', '0.4');
__has('VERSIONS · COMPARE'); __has('1 · Plain language'); __has('2 · Structured rule (JSON)'); __has('3 · Compiled logic'); __has('Golden cases whose output differs between these versions: 3');
__c('#layers .x');
// ---- 19_golden_promotion
S.screen = 'case'; render(); __c('[data-a="golden"]'); __has('awaiting Senior PM');
if (!document.querySelector('[data-a="goldenok"]').classList.contains('dis')) throw new Error('the PM cannot approve a golden promotion');
setPersona('spm'); S.screen = 'case'; render(); __c('[data-a="goldenok"]');
if (S.goldenPromo !== 'approved' || !goldenFor('MOQ').some(g => g.id === 'Golden 51') || !document.getElementById('toasts').innerText.includes('Golden set: 50 → 51 · 7 from PM corrections')) throw new Error('golden promotion');
// ---- 20_s7_gates
const testDone = () => __until(() => S.d.test && (S.d.test.done || S.d.test.hold) && !busy());
Object.assign(window, { testDone });
preset('S7'); if (S.role !== 'pm') throw new Error('authoring presets sign in as the PM');
if (S.d.rule !== 'Packaging free-text interpretation' || S.propView !== 'new' || document.getElementById('pfield').value !== 'Packaging free-text interpretation') throw new Error('S7 opens Create new with its field');
__c('[data-a="interpret"]'); await __idle(); __has('LLM step · pinned · cached'); __has('Prompt · added lines in green');
S.gateFail = true; __c('[data-a="confirm"]'); await testDone();
if (S.d.test.fail !== 3 || !__t().includes('Consistent on 3 runs failed')) throw new Error('a failing gateway run fails stage 3');
S.gateFail = false; __c('[data-a="backdefine"]'); __c('[data-a="confirm"]'); await testDone();
if (!S.d.test.pass || !S.d.test.s1.rows[1].msg.includes('Output schema unchanged') || !S.d.test.s3.rows[3][2].includes('+$36 / month')) throw new Error('S7 test');
if (S.d.test.s2.headline !== '<b>4 of 4</b> PM corrections now fixed') throw new Error('S7 reference cases ' + S.d.test.s2.headline);
__c('[data-a="reviewprop"]'); const P7 = findProp(S.propView); __c('#ppfoot [data-a="sendprop"]');
if (P7.required.join() !== 'spm' || !P7.gated || !P7.gatesDone || gateState(P7) !== 'ok' || !P7.shadow) throw new Error('interpretive needs the Senior PM and the technical gates');
setPersona('spm'); viewProposal(P7.id); if (document.querySelector('#ppfoot [data-a="handoff"]')) throw new Error('no second-approval hand-off');
__c('#ppfoot [data-a="papprove"]'); __has('Shadow run'); await __until(() => P7.status === 'merged');
// ---- 21_s2_clash_v03
preset('S2'); __c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await testDone();
if (S.d.test.fail !== 1 || !document.querySelector('#sec2.failed')) throw new Error('clash fails stage 1');
__has('4 cases'); __has('No clash with other rules failed'); if (!document.querySelector('#sec3.lock')) throw new Error('Send stays locked');
__c('input[data-c="res"][value="b"]'); __c('[data-a="recheck"]'); await __until(() => S.d.variant === 'b' && S.d.test && S.d.test.done && !busy());
if (!S.d.test.pass || !S.d.test.s1.rows[3].msg.includes('Precedence explicit: handwritten → supplier default → checkbox')) throw new Error('option (b) passes');
// ---- 22_s3_clarify_intended
preset('S3'); __c('[data-a="interpret"]'); await __idle(); __has('I need two details before drafting this rule.');
if (S.d.defined || document.querySelector('[data-a="confirm"]')) throw new Error('clarification stays in Define');
__c('[data-a="clar"][data-q="q1"][data-v="qty"]'); __c('[data-a="clar"][data-q="q2"][data-v="alert"]'); __c('[data-a="resume"]'); await __idle();
__c('[data-a="confirm"]'); await testDone();
if (!S.d.test.hold || S.d.test.s2.totals.unint !== 5) throw new Error('S3 changes 5 saved cases');
__has('Alert list grows 9 → 10'); __has('Mark as intended');
for (const r of S.d.test.s2.rows.filter(x => x.out === 'unint')) { __c(`[data-a="markopen"][data-v="${r.c}"]`); __set('#mark-txt', 'New bulk-pack alert is intended'); __c(`[data-a="marksave"][data-v="${r.c}"]`); }
await testDone(); if (!S.d.test.pass || S.d.test.s2.totals.intended !== 5) throw new Error('marking every change as intended lets the test pass');
__c('[data-a="reviewprop"]'); if (!document.getElementById('pp-marks') || !document.getElementById('pp-marks').innerText.includes('New bulk-pack alert is intended')) throw new Error('reasons shown on the proposal page');
// ---- 23_s4_loop_map
preset('S4'); if (S.d.rule !== 'Manufacturer size') throw new Error('S4 opens Manufacturer size');
__c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await testDone(); __has('Circular dependency'); __has('Use raw input');
__c('[data-a="s4raw"]'); await __until(() => S.d.variant === 'raw' && S.d.test && S.d.test.done && !busy());
if (!S.d.test.pass || !S.d.test.s3.rows[3][2].includes('−$140 / month')) throw new Error('S4 raw input passes');
// ---- 24_s5_unintended
preset('S5'); __c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await testDone();
if (!S.d.test.hold || S.d.test.s2.totals.unint !== 12 || !document.querySelector('#sec3.lock')) throw new Error('S5: 12 unintended changes stop submit');
__has('12 unintended changes stop submit');
__c('[data-a="s5apply"]'); await __until(() => S.d.variant === 'narrow' && S.d.test && S.d.test.done && !busy());
if (!S.d.test.pass || S.d.test.s2.totals.fixed !== 2) throw new Error('S5 narrow scope passes');
// ---- 25_s6_blocked_ghost
preset('S6'); __c('[data-a="interpret"]'); await __idle(); __has('This needs a normal release, not a rule change.');
if (!document.querySelector('#sec1.failed')) throw new Error('Define failed');
__c('[data-a="raisecr"]'); __has('CR-0142 · New attribute: Cold-chain flag'); __has('Routed to: Admin for scoping');
// ---- 26_intake_guard_s8_s9_s0
preset('S8'); __c('[data-a="interpret"]'); await __idle(); __has('+ VL → Vial'); __c('[data-a="confirm"]'); await testDone();
if (!S.d.test.pass || !S.d.test.s1.rows[1].msg.includes('No duplicate key')) throw new Error('S8');
preset('S9'); __c('[data-a="interpret"]'); await __idle(); __has('This looks like an instruction to the system, not a rule change. Nothing was run.'); __has('AUD-7781');
if (S.d.phase !== 'idle' || S.d.sid || document.querySelector('[data-a="confirm"]') || !document.querySelector('#sec1.failed')) throw new Error('S9 must not run');
__set('#rule-text', 'THIS AGREEMENT is entered into by and between the parties hereinafter referred to as Supplier and Buyer.'); __c('[data-a="interpret"]'); await __idle();
__has('This looks like a document, not a rule change. Nothing was run.');
__set('#pfield', 'MOQ'); __set('#rule-text', 'Manufacturer size should be the case quantity divided by the selling unit count.'); __c('[data-a="interpret"]'); await __idle();
__has('This seems to be about Manufacturer size, not MOQ. Are you requesting a change to Manufacturer size?');
__c('[data-a="guardswitch"]'); await __idle(); if (S.d.rule !== 'Manufacturer size' || S.d.sid !== 'S4') throw new Error('switch field re-interprets on the right field');
__set('#pfield', 'MOQ'); __set('#rule-text', 'Use the MOQ from the supplier price list.'); __c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await testDone();
if (S.d.test.fail !== 1 || !S.d.test.s1.rows[0].msg.includes('price list is not extracted')) throw new Error('Data exists fails on the price list');
preset('S0'); __c('[data-a="interpret"]'); await __idle(); __has("I couldn't map this to an attribute");
// ---- 26b_seeded_draft
setPersona('pm'); S.screen = 'tower'; S.tower.tab = 'proposals'; S.propView = null; render();
if (!document.querySelector('#proptable tr[data-v="CP-0010"]').innerText.includes('Draft')) throw new Error('seeded draft');
__c('#proptable tr[data-v="CP-0010"]'); if (S.propView !== 'new' || S.d.rule !== 'Shelf life' || S.d.pid !== 'CP-0010' || S.d.defined || !document.getElementById('interp')) throw new Error('the seeded draft reopens in Define, interpreted');
if ([...document.querySelectorAll('#dfx li')].map(l => l.className || 'same').join(',') !== 'same,rew,same') throw new Error('shelf life diff');
__c('[data-a="confirm"]'); await testDone(); if (!S.d.test.pass) throw new Error('shelf life passes');
setPersona('admin'); S.screen = 'tower'; S.tower.tab = 'proposals'; S.propView = null; render();
if (document.getElementById('createnew') || document.querySelectorAll('#proptable tr[data-v]').length !== S.props.length) throw new Error('Admin sees every proposal, read-only');
setPersona('pm'); S.screen = 'tower'; render();
// ---- 28_bounds_nav
setPersona('admin');
const items = BOUNDS.flatMap(c => c.items.map(i => i[1]));
for (const nav of items) {
  S.screen = 'bounds'; S.modal = null; render();
  __c(`[data-a="bnav"][data-v="${nav}"]`); await __idle();
  if (S.screen === 'bounds') throw new Error('did not navigate: ' + nav);
}
S.popover = null; S.modal = null;
// ---- 29_case98
setPersona('pm'); __c('tr[data-v="CASE-0098"]');
__has("SDS attachment couldn't be read."); __has('We tried 3 times (09:15:04, 09:15:34, 09:16:34)'); __has('SDS unreadable · resolve intake');
__c('[data-a="c98resub"]'); __has('password-protected'); __has('Item Setup · Generics'); __has('We have closed CASE-0098'); __c('[data-a="c98send"]');
if (qRow('CASE-0098').status !== 'Done' || qRow('CASE-0098').done.reason !== 'More info requested from supplier') throw new Error('resubmission closes the case');
__has('Closed · more info requested from supplier'); if (document.querySelector('[data-a="c98proceed"]')) throw new Error('no proceed on a closed case');
if (/needs SDS|until an SDS/.test(__t())) throw new Error('waiting wording');
__c('[data-a="ctab"][data-v="audit"]'); __has('attempt 3/3'); __has('dead-letter'); __has('Requested resubmission'); __has('Closed · reason "More info requested from supplier"'); __has('Chain verified ✓');
// ---- 30_ops
S.caseTab = 'attrs'; preset('ops'); if (S.role !== 'admin') throw new Error('AI Ops preset signs in as the Admin');
for (const t of ['Illustrative · synthetic', '$0.62', '$1.49', '41,200', '38%', '22%', 'alert at 85% of monthly budget per category', '7 timeouts today, all recovered', 'dead-letter', '98.9%', 'pinned: 5/5', 'AUD-7781', 'within SLA', 'Access log', 'Signed in via Okta SSO · Senior Product Manager · Generics · MFA verified', 'Monitor agent · Sustain · Admin', 'Admin workspace']) __has(t);
__c('[data-a="fix"][data-v="approved"]'); __has('Fix approved');
setPersona('spm'); S.screen = 'ops'; render(); if (document.getElementById('ops-access')) throw new Error('access log is for the Admin');
__has('View only for the Senior PM');
// ---- 31_no_tiers_left
setPersona('admin');
const seen = [];
for (const scr of ['queue', 'case', 'tower', 'ops', 'bounds', 'case98', 'caseX']) { S.screen = scr; S.caseId = scr === 'caseX' ? 'CASE-0094' : S.caseId; S.caseTab = 'attrs'; render(); const m = __t().replace(/Low confidence/g, '').match(/\b(High|Medium|Low)\b/); if (m) seen.push(scr + ':' + m[0]); }
S.caseId = 'CASE-0091';
S.screen = 'case'; openTrust('moq'); const pm = document.querySelector('.trustxp').innerText.match(/\b(High|Medium|Low)\b/); if (pm) seen.push('drill-down:' + pm[0]); S.popover = null;
if (seen.length) throw new Error(seen.join(' '));
if (/throughput|parallel/i.test(document.body.innerText)) throw new Error('throughput visuals present');
// ---- 32_personas_no_names
if (Object.keys(PERSONAS).join() !== 'pm,spm,admin') throw new Error('exactly three personas');
if (Object.values(PERSONAS).map(p => p.role).join('|') !== 'Product Manager · Generics|Senior Product Manager · Generics|Admin · Genova platform') throw new Error('persona roles');
if (Object.values(PERSONAS).map(p => p.short).join('|') !== 'Product Manager|Senior PM|Admin') throw new Error('persona short names');
const names = /patel|menon|carter|shah|iyer|marsh/i;
const all = document.documentElement.outerHTML + JSON.stringify(S.props) + JSON.stringify(S.vhist) + exportAudit('CASE-0091', 'csv') + exportAudit('CASE-0098', 'json');
const hit = all.match(names); if (hit) throw new Error('personal name found: ' + hit[0]);
if (TIER_APPROVERS.Governed.join() !== 'spm' || TIER_APPROVERS.Reference.join() !== 'spm' || TIER_APPROVERS.Interpretive.join() !== 'spm' || MODEL_PIN_APPROVERS.join() !== 'spm' || ROLLBACK_APPROVERS.join() !== 'spm') throw new Error('approval matrix');
if (findProp('CP-0009').required.join() !== 'spm' || !/awaiting Senior PM · technical gates passed/.test(findProp('CP-0013').notes) || !/Senior PM: "Needs a test for multi-strength vendors"/.test(findProp('CP-0012').notes)) throw new Error('seed remap');
if (/Category Lead|Platform Owner|Business SME|Technical SME/i.test(all)) throw new Error('old role names in state or audit');
// ---- 33_user_menu_persistence
const before = S.props.length, acc = S.access.length;
__c('#userChip'); const menu = document.querySelector('.menu');
if (!menu || menu.querySelectorAll('[data-a="persona"]').length !== 3 || !menu.innerText.includes('Any Senior PM can approve a rule change, but never their own.') || !menu.innerText.includes('Sign out')) throw new Error('user menu');
__c('.menu [data-a="persona"][data-v="spm"]');
if (S.role !== 'spm' || S.screen !== 'tower' || S.tower.tab !== 'proposals' || S.props.length !== before || S.access.length !== acc + 1) throw new Error('persona switch should keep state and land on Rule Tower · Proposals');
__c('#userChip'); __c('.menu [data-a="signout"]');
if (document.getElementById('login').classList.contains('hidden')) throw new Error('sign out returns to the landing page');
enter('admin'); if (S.screen !== 'ops' || S.props.length !== before) throw new Error('state must persist across sign-out');
// ---- 34_tokens_zoom_spotlight
const cssv = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const tok = { '--blue': '#0060AF', '--navy': '#00264D', '--orange': '#E8870E', '--bg': '#F3F6FA', '--ink': '#13202D', '--good': '#1E8E3E', '--bad': '#C62828', '--warn': '#B7791F', '--ai': '#5B3CC4', '--ai-bg': '#F4EFFD', '--r': '12px' };
for (const [k, v] of Object.entries(tok)) if (cssv(k) !== v) throw new Error('token ' + k + ' = ' + cssv(k));
if (!/^"Segoe UI"/.test(getComputedStyle(document.body).fontFamily)) throw new Error('font stack');
const tb = document.querySelector('.topbar'), sd = document.querySelector('.side');
const compact = document.getElementById('app').classList.contains('w1180'); // effective width under 1180 px compacts the sidebar, as the reference does
if (tb.offsetHeight !== 60 || sd.offsetWidth !== (compact ? 208 : 248)) throw new Error('shell sizes ' + tb.offsetHeight + '/' + sd.offsetWidth);
for (const z of [1, 1.1, 1.25]) {
  setZoom(z); for (const scr of ['queue', 'ops', 'tower']) { S.screen = scr; render(); await __w(30); if (document.documentElement.scrollWidth > innerWidth + 1) throw new Error('overflow at zoom ' + z + ' on ' + scr); }
}
setZoom(1.1);
S.screen = 'queue'; render(); await __w(50); S.director = true; render(); __c('[data-a="spotnext"]'); await __w(80);
if (!document.getElementById('spot').classList.contains('on')) throw new Error('spotlight');
__c('[data-a="spotoff"]'); S.director = false; render();
// ---- 35_reset
resetDemo(); __has('Item setup case queue'); __has('11 cases · sorted by SLA');
if (qT() !== '6/3/2/17' || qRow('CASE-0092').status !== 'Needs action' || qRow('CASE-0097').status !== 'Digitizing' || qRow('CASE-0098').status !== 'Needs action' || Object.keys(S.syn).length) throw new Error('queue reset ' + JSON.stringify([qT(), qRow('CASE-0092').status, qRow('CASE-0097').status, qRow('CASE-0098').status, S.q97, Object.keys(S.syn)]));
if (S.reg.MOQ.live !== '0.3' || S.traces.length || S.props.length !== 6 || S.access.length) throw new Error('reset');
if (S.testCases.join() !== 'CASE-0048,CASE-0073,CASE-0076,CASE-0080,CASE-0085' || S.nextEp !== 42 || S.nextUnintended || S.d.rule || findProp('CP-0010').status !== 'draft' || findProp('CP-0007').status !== 'merged') throw new Error('reset v8 state');
if (document.getElementById('login').classList.contains('hidden') || !document.getElementById('app').classList.contains('hidden')) throw new Error('reset returns to the landing page');
enter('pm');
// ---- 36_arrow_path_scripted
S.speed = 'fast'; S.scriptedReview = true;
for (let i = 0; i < 160 && !(S.screen === 'ops' && S.role === 'admin'); i++) { await __idle(); await __w(60); document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })); await __w(120); }
const s1 = S.props.find(x => x.sid === 'S1');
if (S.screen !== 'ops' || S.role !== 'admin' || S.reg.MOQ.live !== '0.4' || S.cs.moqVersion !== '0.4' || !S.cs.approved) throw new Error('arrow path ended at ' + S.screen + ' as ' + S.role + ' live ' + S.reg.MOQ.live);
if (!s1.events.some(e => e.who === 'Senior PM' && /illegible/.test(e.text)) || s1.lines.length !== 6 || !s1.events.some(e => /re-sent for approval/.test(e.text))) throw new Error('scripted review round');
if (s1.approvals.pm || s1.events.some(e => e.kind === 'approve' && e.who === 'Product Manager')) throw new Error('proposer approved');
// ---- 37_fonts_overflow
S.speed = 'normal';
const small = [];
const views = [['queue'], ['case', 'attrs'], ['case', 'audit'], ['tower', 'rules'], ['tower', 'proposals'], ['ops'], ['bounds'], ['case98'], ['caseX', 'attrs']];
for (const [scr, tab] of views) {
  setPersona(scr === 'ops' ? 'admin' : 'pm'); S.screen = scr; if (scr === 'caseX') S.caseId = 'CASE-0088'; if (scr === 'case' || scr === 'caseX') S.caseTab = tab; if (scr === 'tower') { S.tower.tab = tab; S.propView = tab === 'proposals' ? 'CP-0014' : null; } render(); await __w(60);
  document.querySelectorAll('#app *').forEach(el => { if ([...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) { const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < 10) small.push(scr + '/' + (tab || '') + ':' + el.tagName + ':' + fs + ':' + el.textContent.trim().slice(0, 20)); } });
  if (document.documentElement.scrollWidth > innerWidth + 1) small.push(scr + ': horizontal overflow ' + document.documentElement.scrollWidth);
}
if (small.length) throw new Error(small.slice(0, 8).join(' | '));
// ---- 38_director_jumps_no_removed_tabs
S.director = true; render();
const jumps = [...document.querySelectorAll('.director .dgrid')].find(g => g.previousElementSibling && g.previousElementSibling.textContent === 'Jump to');
const jk = [...jumps.querySelectorAll('[data-a="preset"]')].map(b => b.dataset.v);
if (jk.some(k => /^map-|^overview$/.test(k)) || !jk.includes('rules') || !jk.includes('bounds')) throw new Error('director jumps ' + jk.join());
for (const k of jk) {
  S.modal = null; S.director = true; render(); __c(`.director [data-a="preset"][data-v="${k}"]`); await __idle();
  if (S.screen === 'tower' && !TOWER_TABS.some(t => t[0] === S.tower.tab)) throw new Error(k + ' routes to tab ' + S.tower.tab);
  if (document.querySelector('#mapsvg,#ov-kpis')) throw new Error(k + ' shows a removed tab');
}
preset('rules'); if (S.screen !== 'tower' || S.tower.tab !== 'rules') throw new Error('Open Rule Tower · Rules');
resetDemo(); if (S.tower.tab !== 'rules' || S.tower.sel !== 'MOQ') throw new Error('reset lands on Rules');
