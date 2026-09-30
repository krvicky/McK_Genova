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
if (S.screen !== 'tower' || S.tower.tab !== 'overview') throw new Error('the Rule Tower opens on Overview');
const tabsT = [...document.querySelectorAll('.tw-tabs .tabs button')].map(b => b.dataset.v).join(',');
if (tabsT !== 'overview,rules,proposals,map') throw new Error('tabs ' + tabsT);
if (document.querySelector('.catcol,.trcol,.fcard,.tw-b,#twtrace')) throw new Error('old layout remains');
for (const t of ['Rule Tower · Generics', '34 attributes · 4 lookups and prompts', '31 / 34', '93%', 'Needs your attention', 'MOQ · 4 corrections with the same reason', 'CP-0012 · INFOREM · changes requested by Senior PM', 'Coverage gaps', 'Pallet Ti × Hi', 'no golden cases', 'no owner', 'source partially mapped', 'Recent changes']) __has(t);
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
if (document.querySelectorAll('#rsteps li').length !== 3 || document.querySelectorAll('#rsum .badge').length !== 1) throw new Error('three steps and one status chip');
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
// CP-0012 is actionable: the PM responds, the Senior PM approves and merges
__c('#rpattern [data-a="viewprop"]'); if (S.propView !== 'CP-0012') throw new Error('Open CP-0012');
if (!document.getElementById('rail-flow').innerText.includes('Needs a test for multi-strength vendors')) throw new Error('changes-requested comment in the approval flow');
if (document.getElementById('rail-flow').innerText.includes('Technical gates')) throw new Error('Governed proposals skip the technical gates stage');
__c('#phero [data-a="updateprop"]'); const P12 = findProp('CP-0012'); await __until(() => P12.checksDone && P12.status === 'open');
setPersona('spm'); if (S.tower.tab !== 'proposals' || !document.querySelector('[data-a="propsub"][data-v="await"]').classList.contains('on') || !document.querySelector('tr[data-v="CP-0012"]')) throw new Error('Senior PM · Awaiting me');
viewProposal('CP-0012'); __c('#phero [data-a="papprove"]'); if (P12.status !== 'approved') throw new Error('CP-0012 approve');
__c('#phero [data-a="pmerge"]'); __c('[data-a="mergeok"]'); await __until(() => P12.status === 'merged');
selectRule('INFOREM'); __has('v0.6 · Live'); __has('Monitoring · not enough data yet'); __has('No correction pattern · corrections within normal range');
__has('Rules are proposed by the Product Manager'); if (oneP() !== 0 || document.querySelector('#raction.btn')) throw new Error('read-only rule page for the Senior PM');
S.tower.tab = 'overview'; render(); __has('1 golden-case promotion pending'); __has('INFOREM');
// CP-0013: an Interpretive change needs the Senior PM and all automated technical gates; Admin can view but not approve
setPersona('admin'); S.screen = 'tower'; S.tower.tab = 'overview'; render();
__has('Storage temperature consistency 98.9% (below 99%)'); if (__t().includes('awaiting your approval')) throw new Error('nothing awaits the Admin');
const P13 = findProp('CP-0013'); viewProposal('CP-0013');
const adm = document.querySelector('#phero [data-a="papprove"]'); if (!adm || !adm.classList.contains('dis') || adm.dataset.tip !== 'Rule changes are approved by the Senior Product Manager') throw new Error('Admin approve tooltip');
approveProp(P13); if (Object.keys(P13.approvals).length) throw new Error('Admin must never approve rule changes');
setPersona('pm'); viewProposal('CP-0009'); __has('Proposed by Admin');
const P9 = findProp('CP-0009'); if (!P9.approvals.spm || P9.proposerRole !== 'admin' || !P9.gated || !gatesOk(P9)) throw new Error('CP-0009 seed');
approveProp(P13); if (Object.keys(P13.approvals).length) throw new Error('the PM never approves');
setPersona('spm'); selectRule('Storage temperature'); __has('CP-0013 · awaiting Senior PM'); __has('Rules are proposed by the Product Manager');
viewProposal('CP-0013');
const rf13 = document.getElementById('rail-flow').innerText;
for (const t of ['Draft', 'Checks passed', 'Technical gates · automated', '5/5 passed · 15:49', 'Senior PM review', 'Merged · live']) if (!rf13.includes(t)) throw new Error('CP-0013 tracker: ' + t);
if (rf13.indexOf('Technical gates') > rf13.indexOf('Senior PM review') || rf13.indexOf('Checks passed') > rf13.indexOf('Technical gates')) throw new Error('tracker order');
if (!document.querySelector('#rail-flow [data-a="papprove"]')) throw new Error('inline approve for the pending approver');
viewProposal('CP-0013'); __c('[data-a="ptab"][data-v="checks"]');
for (const t of ['Checks 8/8 · Gates 5/5', 'Technical gates · automated', 'Automated', 'Consistency', '10/10 runs identical', 'Golden-set regression', '0 regressions on 50 golden cases', 'Output schema unchanged', 'Model gateway checks', '8/8 passed: pinned model, injection screening, masking, schema, budget…', 'Cost impact within budget headroom', '+$12/month · headroom $680']) __has(t);
// a failing gate blocks the merge even after the Senior PM approves
S.gateFail = true; render(); __has('9/10 runs identical'); __has('Technical gate failed');
if (!document.querySelector('.chk.bad')) throw new Error('failing gate shown in red');
__c('#phero [data-a="papprove"]'); if (!P13.approvals.spm) throw new Error('Senior PM approves CP-0013');
const mb = document.querySelector('#phero [data-a="pmerge"]'); if (!mb || !mb.classList.contains('dis') || mb.dataset.tip !== 'Technical gate failed · fix and re-run checks') throw new Error('merge disabled on a failed gate');
if (mergeReady(P13).ok || !document.getElementById('rail-flow').innerText.includes('Consistency failed')) throw new Error('gate failure in tracker');
S.gateFail = false; render(); __has('Checks 8/8 · Gates 5/5');
__c('#phero [data-a="pmerge"]'); __c('[data-a="mergeok"]'); await __until(() => P13.status === 'merged');
if (!S.vhist['Storage temperature'].some(v => v.cp === 'CP-0013' && v.approvers.join() === 'Senior PM')) throw new Error('CP-0013 version history');
setPersona('pm');
S.screen = 'case'; S.caseId = 'CASE-0091'; S.caseTab = 'audit'; render();
// ---- 13_tower_s1_stepper
__c('[data-a="ctab"][data-v="attrs"]'); __c('[data-a="propose"]');
if (S.role !== 'pm' || S.screen !== 'tower' || S.tower.tab !== 'proposals' || S.propView !== 'new' || S.d.rule !== 'MOQ' || !document.getElementById('stepper')) throw new Error('the suggestion card opens Proposals › New proposal for MOQ, as the PM');
__has('New proposal · MOQ'); const cur0 = document.getElementById('newprop-cur').textContent; if (!cur0.includes('Current · v0.3') || !cur0.includes('Read the ticked MOQ checkbox · HDA p.2')) throw new Error('current rule card');
__c('[data-a="rsel"][data-v="MOQ"]'); if (S.tower.tab !== 'rules' || S.tower.sel !== 'MOQ' || document.getElementById('raction').textContent !== 'Continue draft') throw new Error('back link returns to the rule with Continue draft');
__c('#raction'); if (S.propView !== 'new' || !document.getElementById('stepper')) throw new Error('Continue draft reopens the new proposal');
if (document.getElementById('rule-text').value !== SC.S1.text || stepFlags().cur !== 1) throw new Error('S1 prefilled at Describe');
if (oneP() !== 1) throw new Error('one primary action per view · ' + oneP());
__has('Try an example:'); __has('Supplier override');
__c('[data-a="interpret"]'); await __until(() => document.querySelector('[data-a="confirm"]'));
__has('MOQ · draft v0.4 (live v0.3)'); __has('Interpreted in 2.1 s'); __has('Interpreted by pinned model · 2.1 s · $0.006 · 8/8 gateway checks ✓');
if (stepFlags().cur !== 2 || document.querySelector('.trcol,.tcard')) throw new Error('step 2 with a one-line model summary');
const cvpT = document.getElementById('cvp').textContent;
if (!cvpT.includes('Current · v0.3') || !cvpT.includes('Proposed · draft v0.4') || document.querySelectorAll('#cvp .mk').length !== 2) throw new Error('current versus proposed');
__c('[data-a="modeltoggle"]'); __has('Gateway checkpoints'); __c('[data-a="modeltoggle"]');
__c('[data-a="compiled"]'); if (!document.querySelector('#layers .modal.xp .xp-f')) throw new Error('compiled rule should open in .modal.xp');
__has('COMPILED RULE · WHAT ACTUALLY RUNS'); __has('0 LLM calls at runtime'); __has('hw.confidence >= 0.60'); __has('Structured rule (JSON)');
S.r100 = null; __c('#layers [data-a="run100"]'); await __until(() => S.r100 && S.r100.done); __has('identical · 0 LLM calls · 3 ms total'); __c('#layers .x');
// ---- 14_checks_test_submit
__c('[data-a="confirm"]'); await __idle(); __has('All checks passed');
if (stepFlags().cur !== 3 || document.querySelectorAll('.stp-sum').length !== 2) throw new Error('step 3 with two summaries');
__c('[data-a="nextstep"][data-v="4"]');
if (!document.querySelector('#cvp.cvp1')) throw new Error('the comparison collapses at Test');
__c('[data-a="sbmode"][data-v="golden"]'); __c('[data-a="sbrun"]'); await __idle();
if (tt() !== '0|3|$0 / month') throw new Error('test tiles ' + tt());
__has('No regressions · 3 cases change · 0 new alerts'); __has('Runtime LLM calls per NDC: unchanged');
__c('[data-a="sbmode"][data-v="replay"]'); __c('[data-a="sbrun"]'); await __idle();
if (!document.getElementById('rhl').innerText.includes('9 of 11 match edits PMs already made')) throw new Error('replay highlight');
// going back shows the earlier step; the header jumps forward again
__c('.stp-sum [data-a="gostep"][data-v="2"]'); __has('✓ Interpretation confirmed by the Product Manager');
__c('.stp[data-a="gostep"][data-v="4"]'); __c('[data-a="nextstep"][data-v="5"]');
__has('Required approvals'); __has('Senior Product Manager · Generics'); if (document.getElementById('step5').innerText.includes('Technical gates')) throw new Error('Governed has no technical gates'); if (document.querySelectorAll('.stp-sum').length !== 4) throw new Error('four summaries at Submit');
__set('#cp-note', 'Handwritten MOQ wins over the checkbox · 9 of 11 replay changes match PM edits');
// ---- 15_proposal_handoff_merge
__c('[data-a="openprop"]'); __has('CP-0014 · MOQ: handwritten value overrides checkbox'); __has('Proposed by Product Manager'); __has('Handwritten MOQ wins over the checkbox');
if (S.tower.tab !== 'proposals' || S.propView !== 'CP-0014' || S.propTab !== 'changes') throw new Error('submit opens the proposal detail on Changes');
const P = findProp('CP-0014');
if (document.querySelector('[data-a="pmerge"]')) throw new Error('the proposer never sees Merge');
await __until(() => P.checksDone);
const own = document.querySelector('.propact [data-why="Proposer cannot approve their own change"]'); if (!own || !own.classList.contains('dis')) throw new Error('proposer approve not disabled');
if (own.dataset.tip !== 'Proposer cannot approve their own change') throw new Error('proposer tooltip');
approveProp(P); if (P.approvals.pm || P.status !== 'open') throw new Error('the PM must never approve their own proposal');
__has('1 · Plain language'); __has('3 · Compiled logic'); __has('Waiting for Senior PM');
__c('[data-a="diffxp"]'); if (!document.querySelector('#layers .modal.xp')) throw new Error('diff detail should open in .modal.xp'); __c('#layers .x');
if (P.gated || document.getElementById('rail-flow').innerText.includes('Technical gates')) throw new Error('S1 is Governed · no gates'); __has('Pending · ');
selectRule('MOQ'); __has('CP-0014 · awaiting Senior PM'); __has('CP-0014 open · awaiting Senior PM ›'); __has('Propose a change');
if (document.getElementById('stepper') || document.querySelector('#rpattern [data-a="startpat"]')) throw new Error('rule page shows the proposal state');
viewProposal('CP-0014');
openChooser(); if (!document.getElementById('overlay').innerText.includes('1 proposal waiting for your review · CP-0014 MOQ: handwritten value overrides checkbox')) throw new Error('Senior PM tile should show the live proposal'); closeOv();
__has('Switch to Senior PM to review →'); __c('[data-a="handoff"][data-v="spm"]');
await __until(() => S.role === 'spm' && !S.switching && S.propView === 'CP-0014');
S.propView = null; S.tower.propSub = null; render();
if (!document.querySelector('[data-a="propsub"][data-v="await"]').classList.contains('on') || !document.querySelector('tr[data-v="CP-0014"]')) throw new Error('Awaiting me lists CP-0014');
__c('tr[data-v="CP-0014"]'); if (oneP() !== 1) throw new Error('one primary on the proposal page');
__c('#phero [data-a="papprove"]'); __c('#phero [data-a="pmerge"]'); __has('Merge and publish MOQ v0.4?'); __c('[data-a="mergeok"]'); await __w(100);
if (S.reg.MOQ.live !== '0.4' || P.status !== 'merged') throw new Error('merge');
if (!S.audit['CASE-0091'].some(e => /CP-0014 merged/.test(e.actor.name) && /approver Senior PM/.test(e.summary))) throw new Error('merge audit event');
selectRule('MOQ'); __has('v0.4 · Live'); __has('Read handwritten MOQ · HDA p.2'); __has('Monitoring · not enough data yet'); __has('Review threshold 2.0%'); __has('No correction pattern · corrections within normal range'); __has('No corrections on v0.4 yet');
if (tiles() !== '0') throw new Error('MOQ after merge ' + tiles());
const vr1 = vrows(); if (!vr1[0].startsWith('v0.4 live just now') || !vr1[1].startsWith('v0.3 superseded 16 weeks ago')) throw new Error('versions after merge ' + vr1.join(' / '));
__c('#rversions [data-a="evidence"][data-ver="0.4"]'); __has('From CP-0014'); __has('Proposal checks'); __has('Sandbox results'); __has('Golden set (50)'); __c('#layers .x');
S.tower.tab = 'overview'; render(); __has('MOQ · Merged · v0.3 → v0.4');
S.screen = 'queue'; render(); if (!qRowT('CASE-0091').includes('Rule updated · re-run available')) throw new Error('re-run flag after merge');
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
const vr = document.getElementById('rail-versions').innerText;
for (const t of ['1,102', '1,480', 'Product Manager proposed · approved by Senior PM', 'CP-0014']) if (!vr.includes(t)) throw new Error('versions rail: ' + t);
if (document.querySelector('#rail-versions [data-a="revert"][data-to="0.4"]')) throw new Error('no revert on the live version');
__c('#rail-versions [data-a="revert"][data-to="0.3"]'); __has('Rollback policy: Senior PM approval');
const RV = findProp(S.propView); await __until(() => RV.checksDone);
if (RV.required.join() !== 'spm' || RV.gated) throw new Error('rollback needs the Senior PM');
setPersona('spm'); viewProposal(RV.id); __c('#phero [data-a="papprove"]'); __c('#phero [data-a="pmerge"]'); __c('[data-a="mergeok"]'); await __w(100);
if (S.reg.MOQ.live !== '0.3') throw new Error('revert');
selectRule('MOQ'); if (tiles() !== '860|6|11') throw new Error('v0.3 values restored ' + tiles()); __has('6 of 215 cases · 2.8%'); __has('4 corrections say');
if (!document.querySelector('#rversions .vst-rev') || !vrows()[0].startsWith('v0.4 reverted')) throw new Error('reverted version struck through');
viewProposal('CP-0014');
const rvb = document.querySelector('#rail-versions [data-a="revert"]'); if (!rvb || !rvb.classList.contains('dis') || rvb.dataset.tip !== 'Rollbacks are proposed by the Product Manager or Admin · the Senior PM approves') throw new Error('the Senior PM does not propose rollbacks');
S.tower.tab = 'overview'; render(); __has('MOQ · Reverted · v0.4 → v0.3');
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
preset('S7'); if (S.role !== 'pm') throw new Error('authoring presets sign in as the PM');
if (S.tower.sel !== 'Packaging free-text interpretation' || S.propView !== 'new' || stepFlags().cur !== 1) throw new Error('S7 opens a new proposal for its rule at Describe');
__c('[data-a="interpret"]'); await __idle(); __has('LLM step · pinned · cached'); __has('PROMPT DIFF · ADDED LINES IN GREEN');
__c('[data-a="confirm"]'); await __idle(); __has('Output schema unchanged');
__c('[data-a="nextstep"][data-v="4"]'); __c('[data-a="sbrun"]'); await __idle(); __has('+210 tokens');
if (tt() !== '0|4|+$36 / month') throw new Error('S7 tiles ' + tt());
__c('[data-a="run10"]'); await __until(() => S.r10 && S.r10.done); __has('10/10 identical');
__c('[data-a="nextstep"][data-v="5"]'); __has('Senior Product Manager · Generics'); __has('Technical gates · automated'); __has('shadow run on by default');
__c('[data-a="openprop"]'); const P7 = findProp(S.propView); await __until(() => P7.gatesDone);
if (P7.required.join() !== 'spm' || !P7.gated) throw new Error('interpretive needs the Senior PM and the technical gates');
const rf7 = document.getElementById('rail-flow').innerText;
if (!rf7.includes('Technical gates · automated') || !rf7.includes('5/5 passed') || !rf7.includes('Senior PM review') || /Admin review/.test(rf7)) throw new Error('S7 tracker');
if (!P7.events.some(e => e.who === 'Technical gates' && e.text === 'automated: 5/5 passed')) throw new Error('gates event');
__c('[data-a="ptab"][data-v="checks"]'); __has('+$36/month · headroom $680'); __has('10/10 runs identical');
setPersona('spm'); viewProposal(P7.id); if (document.querySelector('#phero [data-a="handoff"]')) throw new Error('no second-approval hand-off');
__c('#phero [data-a="papprove"]'); __c('#phero [data-a="pmerge"]');
if (!document.querySelector('input[data-c="mshadow"]').checked) throw new Error('shadow default on');
__c('[data-a="mergeok"]'); await __until(() => P7.status === 'merged');
// ---- 21_s2_clash_v03
preset('S2'); __c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await __idle();
__has('4 cases'); if (!document.querySelector('.stp.blk') || !document.querySelector('[data-a="nextstep"][data-v="4"]').classList.contains('dis')) throw new Error('clash blocks Checks');
__c('input[data-c="res"][value="b"]'); __c('[data-a="recheck"]'); await __idle();
__has('Precedence explicit: handwritten → supplier default → checkbox'); __c('[data-a="nextstep"][data-v="4"]'); __c('[data-a="sbrun"]'); await __idle(); __has('No regressions');
S.tower.tab = 'map'; S.map.view = 'coverage'; S.map.cat = 'Generics'; S.map.open = { Packaging: true }; render();
if (![...document.querySelectorAll('#mapsvg text')].some(t => /MOQ · Conflict/.test(t.textContent))) throw new Error('map conflict');
openDraftView(S.d.rule); render();
// ---- 22_s3_clarify
preset('S3'); __c('[data-a="interpret"]'); await __idle(); __has('I need two details before drafting this rule.');
if (stepFlags().cur !== 1) throw new Error('clarification stays at Describe');
__c('[data-a="clar"][data-q="q1"][data-v="qty"]'); __c('[data-a="clar"][data-q="q2"][data-v="alert"]'); __c('[data-a="resume"]'); await __idle();
__c('[data-a="confirm"]'); await __idle(); __c('[data-a="nextstep"][data-v="4"]'); __c('[data-a="sbrun"]'); await __idle(); __has('Alert list grows 9 → 10');
__has('Mark as intended change');
// ---- 23_s4_loop_map
preset('S4'); if (S.tower.sel !== 'Manufacturer size') throw new Error('S4 opens Manufacturer size');
__c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await __idle(); __has('Circular dependency'); __has('Use raw input');
S.tower.tab = 'map'; S.map.view = 'dependency'; render(); __has('Loop in draft S4');
if (!document.querySelector('#mapsvg path.de.loop')) throw new Error('red loop');
openDraftView(S.d.rule); render(); __c('[data-a="s4raw"]'); await __idle(); __c('[data-a="nextstep"][data-v="4"]'); __c('[data-a="sbrun"]'); await __idle(); __has('−$140/month');
if (tt() !== '0|0|−$140 / month') throw new Error('S4 tiles ' + tt());
// ---- 24_s5_regression
preset('S5'); __c('[data-a="interpret"]'); await __idle(); __c('[data-a="confirm"]'); await __idle(); __c('[data-a="nextstep"][data-v="4"]'); __c('[data-a="sbrun"]'); await __idle();
__has('12 regressions'); if (!document.querySelector('[data-a="nextstep"][data-v="5"]').classList.contains('dis') || tt().split('|')[0] !== '12' || !document.querySelector('#ttiles .kpi.alert')) throw new Error('S5 regressions block Submit');
__c('[data-a="s5apply"]'); await __idle(); if (stepFlags().cur !== 4) throw new Error('the PM stays on Test');
__c('[data-a="sbrun"]'); await __idle(); __has('No regressions · 2 cases change');
// ---- 25_s6_blocked_ghost
preset('S6'); __c('[data-a="interpret"]'); await __idle(); __has('This needs a normal release, not a rule change.');
if (!document.querySelector('.stp.blk')) throw new Error('Describe blocked');
__c('[data-a="raisecr"]'); __has('CR-0142 · New attribute: Cold-chain flag'); __has('Routed to: Admin for scoping');
S.tower.tab = 'map'; S.map.view = 'coverage'; S.map.cat = 'Generics'; S.map.open = { 'Regulatory and handling': true }; render();
if (![...document.querySelectorAll('#mapsvg text')].some(t => /Cold-chain flag · not in catalogue · CR-0142/.test(t.textContent))) throw new Error('ghost');
openDraftView(S.d.rule); render();
// ---- 26_s8_s9_s0
preset('S8'); __c('[data-a="interpret"]'); await __idle(); __has('+ VL → Vial'); __c('[data-a="confirm"]'); await __idle(); __has('No duplicate key');
preset('S9'); __c('[data-a="interpret"]'); await __idle(); __has('Blocked at model gateway'); __has('AUD-7781');
if (document.querySelector('[data-a="openprop"]') || !document.querySelector('.stp.blk')) throw new Error('S9 must not create a proposal');
preset('S0'); __c('[data-a="interpret"]'); await __idle(); __has("I couldn't map this to an attribute");
// ---- 27_map_views
S.tower.tab = 'map'; S.map.view = 'coverage'; S.map.cat = 'Generics'; S.map.open = {}; render();
__has('34 attributes · 31 with live rules · 1 missing rule · 2 without golden cases · 1 without owner');
__c('#mapsvg [data-a="mapgroup"][data-v="Packaging"]');
if (![...document.querySelectorAll('#mapsvg text')].some(t => /Pallet Ti × Hi · Missing rule/.test(t.textContent))) throw new Error('missing rule node');
__c('#mapsvg [data-a="mapnode"][data-v="moq"]'); if (S.tower.tab !== 'rules' || S.tower.sel !== 'MOQ') throw new Error('a map node opens its rule page');
S.tower.tab = 'map'; render(); __c('#mapsvg [data-a="mapnode"][data-v="tihi"]'); if (S.tower.sel !== 'Pallet Ti × Hi') throw new Error('map node · no rule');
S.tower.tab = 'map'; render();
__set('select[data-c="mapcat"]', 'Masters'); __has('32 inherited from Generics'); __has('2 overridden'); __has('3 missing'); __has('Go with conditions');
__set('select[data-c="mapcat"]', 'OTC'); __has('Discovery not started');
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
if (S.reg.MOQ.live !== '0.3' || S.traces.length || S.props.length !== 4 || S.access.length) throw new Error('reset');
if (document.getElementById('login').classList.contains('hidden') || !document.getElementById('app').classList.contains('hidden')) throw new Error('reset returns to the landing page');
enter('pm');
// ---- 36_arrow_path_scripted
S.speed = 'fast'; S.scriptedReview = true;
for (let i = 0; i < 140 && !(S.screen === 'ops' && S.role === 'admin'); i++) { await __idle(); await __w(60); const p1 = S.props.find(x => x.sid === 'S1'); if (p1 && (!p1.checksDone || p1.reinterp)) { await __w(150); continue; } document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })); await __w(120); }
const s1 = S.props.find(x => x.sid === 'S1');
if (S.screen !== 'ops' || S.role !== 'admin' || S.reg.MOQ.live !== '0.4' || S.cs.moqVersion !== '0.4' || !S.cs.approved) throw new Error('arrow path ended at ' + S.screen + ' as ' + S.role + ' live ' + S.reg.MOQ.live);
if (!s1.events.some(e => e.who === 'Senior PM' && /illegible/.test(e.text)) || s1.lines.length !== 5) throw new Error('scripted review round');
if (s1.approvals.pm || s1.events.some(e => e.kind === 'approve' && e.who === 'Product Manager')) throw new Error('proposer approved');
// ---- 37_fonts_overflow
S.speed = 'normal';
const small = [];
const views = [['queue'], ['case', 'attrs'], ['case', 'audit'], ['tower', 'rules'], ['tower', 'proposals'], ['tower', 'overview'], ['tower', 'map'], ['ops'], ['bounds'], ['case98'], ['caseX', 'attrs']];
for (const [scr, tab] of views) {
  setPersona(scr === 'ops' ? 'admin' : 'pm'); S.screen = scr; if (scr === 'caseX') S.caseId = 'CASE-0088'; if (scr === 'case' || scr === 'caseX') S.caseTab = tab; if (scr === 'tower') { S.tower.tab = tab; S.propView = tab === 'proposals' ? 'CP-0014' : null; } render(); await __w(60);
  document.querySelectorAll('#app *').forEach(el => { if ([...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) { const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < 10) small.push(scr + '/' + (tab || '') + ':' + el.tagName + ':' + fs + ':' + el.textContent.trim().slice(0, 20)); } });
  if (document.documentElement.scrollWidth > innerWidth + 1) small.push(scr + ': horizontal overflow ' + document.documentElement.scrollWidth);
}
if (small.length) throw new Error(small.slice(0, 8).join(' | '));
