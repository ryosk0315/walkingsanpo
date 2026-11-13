// 使い方: node scripts/fetch_wiki.mjs [--mock]
// 必要: Node 18以上。ネットワークから ja.wikipedia.org に接続できる環境で実行する。
// 出力: data/wiki_check.json（機械可読）、data/wiki_full.json（本文）、data/review.html と data/review.md（目視確認用）
import { readFileSync, writeFileSync } from 'node:fs';

const MOCK = process.argv.includes('--mock');
// イベントは後回し（SPEC 第3節）。確認対象から外す
const places = JSON.parse(readFileSync(new URL('../data/places.json', import.meta.url))).filter(p => p.cat !== 'イベント');
const UA = 'walk-odai-app-check/0.1 (personal project; https://github.com/ryosk0315/walkingsanpo)';

async function getSummary(title) {
  if (MOCK) {
    if (title.includes('谷中')) return { status: 200, body: { type: 'disambiguation', title, extract: '谷中（やなか）は…', timestamp: '2025-01-01T00:00:00Z', revision: '1', content_urls: { desktop: { page: 'https://ja.wikipedia.org/wiki/' + title } } } };
    if (title.includes('千束')) return { status: 404, body: null };
    return { status: 200, body: { type: 'standard', title, extract: title + 'は、東京都にある。伝承では、628年に始まったとされる。2024年現在、参拝者は多い。', timestamp: '2025-06-01T00:00:00Z', revision: '123', content_urls: { desktop: { page: 'https://ja.wikipedia.org/wiki/' + title } } } };
  }
  const url = 'https://ja.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title.replace(/ /g, '_'));
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json' } });
  return { status: res.status, body: res.ok ? await res.json() : null };
}

// 本文（プレーンテキスト）。導入文に面白い一文がない場所のため、抜粋の候補を本文から選べるようにする
async function getFullText(title) {
  if (MOCK) return title + 'の本文。';
  const url = 'https://ja.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&redirects=1&format=json&formatversion=2&titles=' + encodeURIComponent(title);
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) return null;
  return (await res.json()).query?.pages?.[0]?.extract ?? null;
}

// 見つからない・曖昧さ回避のとき、正しいタイトルの候補を出す
async function searchTitles(q) {
  if (MOCK) return [q + ' (候補)'];
  const url = 'https://ja.wikipedia.org/w/api.php?action=opensearch&limit=5&namespace=0&format=json&search=' + encodeURIComponent(q);
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  return res.ok ? (await res.json())[1] : [];
}

function flags(b) {
  const f = [];
  if (!b) return ['記事が見つからない（タイトル違いの可能性）'];
  if (b.type === 'disambiguation') f.push('曖昧さ回避ページ。別タイトルを探す');
  const t = b.extract || '';
  if (t.length < 40) f.push('導入文が短い');
  if (/[0-9０-９]{4}年(?:[0-9０-９]+月)?現在/.test(t) || t.includes('現在')) f.push('「現在」を含む。古い可能性');
  if (/伝承|伝わる|とされる|という|説/.test(t)) f.push('伝承・諸説の表現あり。断定しない表示にする');
  if (/[0-9０-９]{3,4}年/.test(t)) f.push('年号あり。他の資料と照合');
  return f;
}

const out = [];
const full = {};
for (const p of places) {
  let r;
  try { r = await getSummary(p.title); } catch (e) { r = { status: 0, body: null, err: String(e) }; }
  const b = r.body;
  const miss = !b || b.type === 'disambiguation';
  const candidates = miss ? await searchTitles(p.name.replace(/（.*?）/g, '')) : [];
  if (!miss) {
    const text = await getFullText(b.title);
    if (text) full[p.name] = { title: b.title, text };
  }
  out.push({
    name: p.name, cat: p.cat, title: p.title, status: r.status,
    pageTitle: b?.title ?? null,
    extract: b?.extract ?? null,
    url: b?.content_urls?.desktop?.page ?? null,
    revision: b?.revision ?? null,
    timestamp: b?.timestamp ?? null,
    fetchedAt: new Date().toISOString(),
    flags: flags(b),
    candidates,
    verdict: null // 目視確認後に ok / ng / 要修正 を入れる
  });
  if (!MOCK) await new Promise(r => setTimeout(r, 300));
}
writeFileSync(new URL('../data/wiki_check.json', import.meta.url), JSON.stringify(out, null, 2));
writeFileSync(new URL('../data/wiki_full.json', import.meta.url), JSON.stringify(full, null, 2));

const esc = s => String(s ?? '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const rows = out.map(o => `<tr>
<td>${esc(o.cat)}</td><td><b>${esc(o.name)}</b><br><small>${esc(o.title)} / HTTP ${o.status}</small></td>
<td>${esc(o.extract) || '<i>取得なし</i>'}<br><small>${o.url ? `<a href="${esc(o.url)}">出典</a>` : ''} ${esc(o.timestamp)}</small></td>
<td>${o.flags.map(x => '・' + esc(x)).join('<br>')}</td></tr>`).join('\n');
writeFileSync(new URL('../data/review.html', import.meta.url), `<!doctype html><meta charset="utf-8"><title>Wikipedia確認</title>
<style>body{font:14px/1.6 sans-serif;margin:16px}table{border-collapse:collapse}td,th{border:1px solid #999;padding:6px;vertical-align:top}small{color:#555}</style>
<h1>Wikipedia 導入文の確認（${out.length}件）</h1>
<table><tr><th>種類</th><th>場所</th><th>導入文</th><th>注意</th></tr>${rows}</table>`);
// スマホのGitHubアプリで読めるように Markdown 版も出す
const cell = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const md = [`# Wikipedia 導入文の確認（${out.length}件）`, '',
  ...out.map(o => [`## ${cell(o.name)}（${cell(o.cat)}）`, '',
    `- 記事: ${o.url ? `[${cell(o.pageTitle)}](${o.url})` : `なし（${cell(o.title)} / HTTP ${o.status}）`}`,
    `- 更新: ${cell(o.timestamp)}`,
    ...o.flags.map(f => `- 注意: ${f}`),
    ...(o.candidates.length ? [`- 候補: ${o.candidates.map(cell).join(' / ')}`] : []), '',
    o.extract ? '> ' + cell(o.extract) : '_取得なし_', ''].join('\n'))].join('\n');
writeFileSync(new URL('../data/review.md', import.meta.url), md);
console.log(`done: ${out.length} places, ok=${out.filter(o => o.extract).length}, flagged=${out.filter(o => o.flags.length).length}`);
