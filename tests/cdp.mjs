// Minimal CDP driver: launches Chrome headless, runs page-side test phases, captures screenshots.
// Usage: node tests/cdp.mjs [outDir] [width] [height]   (env: TESTS=path to test file, CHROME=path to chrome)
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const FILE = pathToFileURL(resolve(HERE, '..', 'genova_demo.html')).href;
if (!process.env.TESTS) process.env.TESTS = resolve(HERE, 'tests.js');
const OUT = process.argv[2] || resolve(HERE, 'out');
const W = +(process.argv[3] || 1440), H = +(process.argv[4] || 900);
mkdirSync(OUT, { recursive: true });

const port = 9300 + Math.floor(Math.random() * 500);
const proc = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--window-size=${W},${H}`, '--no-first-run', '--user-data-dir=' + (await import('node:path')).resolve(OUT, 'prof'), 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let targets;
for (let i = 0; i < 100; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(200); } }
const page = targets.find(t => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pending = new Map(); const errors = []; const requests = [];
ws.onmessage = ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method === 'Runtime.exceptionThrown') errors.push('EXC: ' + JSON.stringify(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text));
  if (m.method === 'Runtime.consoleAPICalled' && (m.params.type === 'error' || m.params.type === 'warning')) errors.push('CONSOLE ' + m.params.type + ': ' + m.params.args.map(a => a.value || a.description).join(' '));
  if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') errors.push('LOG: ' + m.params.entry.text);
  if (m.method === 'Network.requestWillBeSent') requests.push(m.params.request.url);
};
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Runtime.enable'); await send('Log.enable'); await send('Network.enable'); await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: FILE });
await sleep(1200);

async function ev(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true, timeout: 120000 });
  if (r.result.exceptionDetails) return 'ERROR: ' + (r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text);
  return r.result.result.value;
}
async function shot(name) {
  const r = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(`${OUT}/${name}.png`, Buffer.from(r.result.data, 'base64'));
}
const phases = JSON.parse(process.env.PHASES || '[]');
const helpers = `
  window.__w = ms => new Promise(r => setTimeout(r, ms));
  window.__until = async (fn, t = 20000) => { const s = Date.now(); while (Date.now() - s < t) { try { if (fn()) return true; } catch (e) {} await __w(40); } throw new Error('timeout: ' + fn.toString().slice(0, 140)); };
  window.__c = sel => { const el = document.querySelector(sel); if (!el) throw new Error('missing ' + sel); if (el.click) el.click(); else el.dispatchEvent(new MouseEvent('click', { bubbles: true })); };
  window.__t = () => document.getElementById('app').innerText;
  window.__has = s => { const a = document.getElementById('app'); if (!a.innerText.includes(s) && !a.textContent.includes(s)) throw new Error('text not found: ' + s); return true; };
  window.__idle = () => __until(() => !busy());
  window.__set = (sel, v) => { const el = document.querySelector(sel); el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); };
  'ok'`;
console.log('helpers', await ev(helpers));
const script = (await import('node:fs')).readFileSync(process.env.TESTS, 'utf8');
const blocks = script.split(/^\/\/ ---- /m).filter(b => b.trim());
for (const b of blocks) {
  const name = b.split('\n')[0].trim();
  const body = b.split('\n').slice(1).join('\n');
  const res = await ev(`(async () => { try { ${body}\n return 'PASS'; } catch (e) { return 'FAIL: ' + e.message; } })()`);
  console.log(name.padEnd(34), res);
  await sleep(250);
  await shot(name.replace(/[^a-z0-9_-]/gi, '_'));
}
console.log('ERRORS:', errors.length ? errors : 'none');
const ext = requests.filter(u => !u.startsWith('file:') && !u.startsWith('data:') && u !== 'about:blank');
console.log('EXTERNAL REQUESTS:', ext.length ? ext : 'none');
ws.close(); proc.kill();
process.exit(0);
