import './style.css';
import { places, templateOf, lineColor, type Place, type Template } from './places';
import { calendarText, todayJst, fmt } from './calendar';

const app = document.querySelector<HTMLElement>('#app')!;

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

const BACK = '<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';

type ReasonKey = 'k' | 'r';
const state: { tab: Template; current: Place | null; reason: ReasonKey } = { tab: 'shrine', current: null, reason: 'k' };

function draw(tab: Template, except?: Place | null) {
  const pool = places.filter(p => templateOf(p) === tab && p !== except);
  return pool[Math.floor(Math.random() * pool.length)];
}

function reasons(p: Place) {
  const out: { key: ReasonKey; label: string; text: string }[] = [];
  const cal = calendarText(p.rules, todayJst());
  if (cal) out.push({ key: 'k', label: '暦', text: cal });
  out.push({ key: 'r', label: '歴史', text: p.reasons.history.text });
  return out;
}

function reasonBlock(p: Place) {
  const list = reasons(p);
  const cur = list.find(x => x.key === state.reason) ?? list[0];
  const src = p.reasons.history.source;
  const tabs = list.length > 1
    ? `<div class="seg" role="group" aria-label="理由の種類">${list.map(x =>
        `<button data-reason="${x.key}" aria-pressed="${x === cur}">${x.label}</button>`).join('')}</div>`
    : `<div class="seg-label">${cur.label}</div>`;
  const cite = cur.key === 'r'
    ? `<p class="cite">出典：<a href="${esc(src.url)}" target="_blank" rel="noopener">Wikipedia『${esc(src.title)}』</a>（${esc(src.fetchedAt.replace(/-/g, '/'))} 取得、CC BY-SA）</p>`
    : '';
  return `${tabs}<p class="why">${esc(cur.text)}</p>${cite}`;
}

const nearText = (p: Place) => `${p.near[0].station}（${[...new Set(p.near.map(n => n.line))].join('・')}）`;

function stationCard(p: Place) {
  const lines = [...new Set(p.near.map(n => n.line))];
  return `
  <div class="sign-station">
    <div class="chips">${lines.map(l => `<span style="background:${lineColor(l)}">${esc(l)}</span>`).join('')}</div>
    <div class="names" style="--len:${[...p.name].length}">
      <div class="kana">${esc(p.kana)}</div>
      <h1 class="big">${esc(p.name)}</h1>
      <div class="roma">${esc(p.romaji)}</div>
    </div>
    <div class="band" style="background:${lineColor(lines[0])}"><span>最寄り</span><span>${esc(p.near[0].station)}</span></div>
  </div>
  <div class="reason reason-station">${reasonBlock(p)}</div>`;
}

function shrineCard(p: Place) {
  return `
  <div class="sign-shrine">
    <div class="legs" aria-hidden="true"><i></i><i></i></div>
    <div class="board">
      <div class="body">
        <span class="label">由緒書</span>
        <div class="reason reason-shrine">${reasonBlock(p)}</div>
        <dl><dt>最寄り</dt><dd>${esc(nearText(p))}</dd></dl>
      </div>
      <div class="title"><h1>${esc(p.name)}</h1></div>
    </div>
  </div>`;
}

function renderDest() {
  const p = state.current!;
  const t = templateOf(p);
  document.body.dataset.theme = t;
  app.innerHTML = `
  <div class="screen">
    <header class="bar">
      <div class="bar-left"><a href="#/" class="icon" aria-label="ホームに戻る">${BACK}</a><span>行き先</span></div>
      <span class="date">${fmt(todayJst())}</span>
    </header>
    <div class="seg kinds" role="group" aria-label="行き先の種類">
      <button data-tab="shrine" aria-pressed="${state.tab === 'shrine'}">寺社</button>
      <button data-tab="station" aria-pressed="${state.tab === 'station'}">まち・坂・橋</button>
    </div>
    ${t === 'shrine' ? shrineCard(p) : stationCard(p)}
    <div class="spacer"></div>
    <div class="actions">
      <button class="btn ghost" data-act="redraw">引き直す</button>
    </div>
  </div>`;
}

function renderHome() {
  document.body.dataset.theme = 'station';
  app.innerHTML = `
  <div class="screen home">
    <header class="bar"><span class="app-name">さんぽカード</span><span class="date">${fmt(todayJst())}</span></header>
    <div class="spacer"></div>
    <a class="btn primary" href="#/dest">行き先を決める</a>
  </div>`;
}

function route() {
  if (location.hash.startsWith('#/dest')) {
    if (!state.current || templateOf(state.current) !== state.tab) state.current = draw(state.tab);
    renderDest();
  } else {
    renderHome();
  }
  window.scrollTo(0, 0);
}

app.addEventListener('click', e => {
  const b = (e.target as HTMLElement).closest('button');
  if (!b) return;
  if (b.dataset.tab) {
    state.tab = b.dataset.tab as Template;
    state.current = draw(state.tab);
    renderDest();
  } else if (b.dataset.reason) {
    state.reason = b.dataset.reason as ReasonKey;
    renderDest();
  } else if (b.dataset.act === 'redraw') {
    state.current = draw(state.tab, state.current);
    renderDest();
  }
});

window.addEventListener('hashchange', route);
route();
