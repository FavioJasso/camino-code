/* eslint-disable @typescript-eslint/no-unused-expressions */
// Drive headless Chrome over the DevTools protocol: load a page, scroll for real, screenshot the real viewport.
// usage: node scripts/shoot.mjs <url> <out-dir> <label> <mode: page-quick|page-full|scene|dawn>   (serve with: npx next start -p 3103)
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
const [, , url, outDir, label, mode] = process.argv;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const D = { w: 1440, h: 900 }, M = { w: 390, h: 844, mobile: true };
const SHOTS = {
  'scene': [
    { name: 'desktop-p000', ...D, frac: 0 }, { name: 'desktop-p033', ...D, frac: 0.33 }, { name: 'desktop-p066', ...D, frac: 0.66 }, { name: 'desktop-p100', ...D, frac: 1 },
    { name: 'mobile-p000', ...M, frac: 0 }, { name: 'mobile-p066', ...M, frac: 0.66 },
    { name: 'reduced-motion', ...D, frac: 0.5, reduced: true }, { name: 'no-webgl', ...M, frac: 0, nogl: true },
  ],
  'page-quick': [{ name: 'desktop-top', ...D, vh: 0 }, { name: 'desktop-vh070', ...D, vh: 0.7 }, { name: 'mobile-top', ...M, vh: 0 }],
  'page-full': [
    { name: 'desktop-top', ...D, vh: 0 }, { name: 'desktop-vh060', ...D, vh: 0.6 }, { name: 'desktop-vh120', ...D, vh: 1.2 },
    { name: 'desktop-s050', ...D, frac: 0.5 }, { name: 'desktop-s075', ...D, frac: 0.75 }, { name: 'desktop-s100', ...D, frac: 1 },
    { name: 'mobile-top', ...M, vh: 0 }, { name: 'mobile-vh060', ...M, vh: 0.6 }, { name: 'mobile-s060', ...M, frac: 0.6 }, { name: 'mobile-s100', ...M, frac: 1 },
    { name: 'reduced-motion', ...D, vh: 0, reduced: true }, { name: 'no-webgl-mobile', ...M, vh: 0, nogl: true },
  ],
  'dawn': [
    { name: 'desktop-d015', ...D, d: 0.15 }, { name: 'desktop-d045', ...D, d: 0.45 }, { name: 'desktop-d075', ...D, d: 0.75 }, { name: 'desktop-d095', ...D, d: 0.95 },
    { name: 'mobile-d045', ...M, d: 0.45 }, { name: 'mobile-d085', ...M, d: 0.85 },
    { name: 'reduced-d060', ...D, d: 0.6, reduced: true }, { name: 'no-webgl-mobile-d050', ...M, d: 0.5, nogl: true },
  ],
}[mode];
if (!SHOTS) { console.error('unknown mode ' + mode); process.exit(1); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
const prof = mkdtempSync(path.join(tmpdir(), 'shoot-'));
const chrome = spawn(CHROME, ['--headless=new', `--user-data-dir=${prof}`, '--remote-debugging-port=0', '--no-first-run', '--hide-scrollbars',
  '--window-size=1440,900', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
const wsUrl = await new Promise((res, rej) => {
  let buf = ''; chrome.stderr.on('data', d => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) res(m[1]); });
  setTimeout(() => rej(new Error('Chrome did not start')), 20000);
});
const ws = new WebSocket(wsUrl); await new Promise(r => ws.addEventListener('open', r));
let id = 0; const pending = new Map(); const logs = []; let current = '';
ws.addEventListener('message', ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); return; }
  if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning', 'assert'].includes(m.params.type))
    logs.push(`[${current}] console.${m.params.type}: ` + m.params.args.map(a => a.value ?? a.description ?? '').join(' ').slice(0, 400));
  if (m.method === 'Runtime.exceptionThrown') logs.push(`[${current}] UNCAUGHT: ` + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).slice(0, 500));
  if (m.method === 'Log.entryAdded' && ['error', 'warning'].includes(m.params.entry.level)) logs.push(`[${current}] ${m.params.entry.source}.${m.params.entry.level}: ${m.params.entry.text.slice(0, 300)} ${m.params.entry.url || ''}`);
});
const send = (method, params = {}, sessionId) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });
mkdirSync(outDir, { recursive: true });
for (const s of SHOTS) {
  current = s.name;
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const S = (m, p) => send(m, p, sessionId);
  await S('Page.enable'); await S('Runtime.enable'); await S('Log.enable');
  await S('Emulation.setDeviceMetricsOverride', { width: s.w, height: s.h, deviceScaleFactor: 1, mobile: !!s.mobile });
  if (s.mobile) await S('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await S('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: s.reduced ? 'reduce' : 'no-preference' }] });
  if (s.nogl) await S('Page.addScriptToEvaluateOnNewDocument', { source: `(()=>{const g=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,...a){return /webgl|webgpu/i.test(t)?null:g.call(this,t,...a)};if(window.OffscreenCanvas){const o=OffscreenCanvas.prototype.getContext;OffscreenCanvas.prototype.getContext=function(t,...a){return /webgl|webgpu/i.test(t)?null:o.call(this,t,...a)}}})()` });
  await S('Page.navigate', { url });
  await sleep(3200);                                   // load, fonts, idle-start of the scene, first frames
  const y = s.d != null
    ? `(()=>{const e=document.getElementById('dawn-window');if(!e)return 0;const r=e.getBoundingClientRect();return r.top+scrollY-(innerHeight-${s.d}*(innerHeight+r.height))})()`
    : s.frac != null
    ? `Math.max(0,(document.documentElement.scrollHeight-innerHeight)*${s.frac})`
    : `Math.min(document.documentElement.scrollHeight-innerHeight, innerHeight*${s.vh || 0})`;
  await S('Runtime.evaluate', { expression: `window.scrollTo(0, ${y}); window.dispatchEvent(new Event('scroll')); 0` });
  await sleep(s.frac || s.vh || s.d ? 2400 : 600);            // let scroll-smoothed scene state settle
  const { data } = await S('Page.captureScreenshot', { format: 'png' });
  writeFileSync(path.join(outDir, `${label}-${s.name}.png`), Buffer.from(data, 'base64'));
  await send('Target.closeTarget', { targetId });
}
const expected = /WebGL context|Error creating WebGL|getContext|WebGLRenderer/i;
const real = logs.filter(l => !(l.startsWith('[no-webgl') && expected.test(l)));
writeFileSync(path.join(outDir, `${label}-console.txt`), logs.join('\n') + '\n');
console.log(`saved ${SHOTS.length} screenshots: ` + SHOTS.map(s => `${label}-${s.name}.png`).join(' '));
console.log(real.length ? 'CONSOLE PROBLEMS TO FIX:\n' + real.slice(0, 15).join('\n') : 'console: clean (expected WebGL-unavailable messages in the no-webgl shot are ignored)');
ws.close(); chrome.kill('SIGKILL'); await sleep(300); try { rmSync(prof, { recursive: true, force: true }); } catch {}
process.exit(0);
