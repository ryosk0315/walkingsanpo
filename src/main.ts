const app = document.querySelector<HTMLElement>('#app')!;
app.innerHTML = `<h1>さんぽカード</h1><p>準備中。配信の確認用ページ。</p><p>build: ${new Date(__BUILD_TIME__).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}</p>`;
