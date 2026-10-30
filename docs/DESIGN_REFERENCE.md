# デザイン参照（モックのソース）

DC形式のHTML。そのまま使わず、見た目と文言の参考にする。Odai と Comment は旧デザイン（未リデザイン）。

## P1Destination.dc.html
~~~html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>駅名標：行き先</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link href="https://fonts.googleapis.com/css2?family=BIZ+UDPGothic:wght@400;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
body{margin:0}
a{text-decoration:none}
button{font-family:inherit}
a:focus-visible,button:focus-visible{outline:3px solid #1B1B1B;outline-offset:2px}
</style>
</helmet>
<div style="width: 390px; height: 844px; box-sizing: border-box; padding: 20px 20px 24px; background: #F1F1EE; color: #1B1B1B; font-family: 'BIZ UDPGothic', 'Hiragino Sans', sans-serif; display: flex; flex-direction: column; gap: 14px">
<div style="display: flex; align-items: center; justify-content: space-between">
<div style="display: flex; align-items: center; gap: 4px; margin-left: -8px">
<a href="Main.dc.html" aria-label="ホームに戻る" style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; color: #1B1B1B"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></a>
<span style="font-size: 15px; font-weight: 700">行き先</span>
</div>
<span style="font-family: 'DM Mono', monospace; font-size: 13px; color: #3A3A3A">10/30（金）</span>
</div>
<div role="group" aria-label="行き先の種類" style="display: flex; gap: 6px">
<button aria-pressed="true" style="flex: 1; min-height: 44px; border-radius: 4px; border: 2px solid #1B1B1B; background: #1B1B1B; color: #FFFFFF; font-size: 14px; font-weight: 700; cursor: pointer">駅・路線</button>
<button aria-pressed="false" style="flex: 1; min-height: 44px; border-radius: 4px; border: 2px solid #1B1B1B; background: transparent; color: #1B1B1B; font-size: 14px; font-weight: 700; cursor: pointer">寺社</button>
<button aria-pressed="false" style="flex: 1; min-height: 44px; border-radius: 4px; border: 2px solid #1B1B1B; background: transparent; color: #1B1B1B; font-size: 14px; font-weight: 700; cursor: pointer">イベント</button>
</div>
<div style="display: flex; flex-direction: column; background: #FFFFFF; border: 3px solid #1B1B1B; border-radius: 6px; margin-top: 4px">
<div style="display: flex; flex-wrap: wrap; gap: 6px; padding: 12px 14px 0">
<span style="background: #2F7A24; color: #FFFFFF; font-size: 12px; font-weight: 700; padding: 3px 8px; border-radius: 4px">都営新宿線</span>
<span style="background: #0B63A8; color: #FFFFFF; font-size: 12px; font-weight: 700; padding: 3px 8px; border-radius: 4px">都営三田線</span>
<span style="background: #6A4FB8; color: #FFFFFF; font-size: 12px; font-weight: 700; padding: 3px 8px; border-radius: 4px">東京メトロ半蔵門線</span>
</div>
<div style="text-align: center; padding: 14px 0 12px">
<div style="font-size: 15px; letter-spacing: 0.3em">じんぼうちょう</div>
<div style="font-size: 72px; font-weight: 700; line-height: 1.1">神保町</div>
<div style="font-size: 16px; letter-spacing: 0.12em">Jimbocho</div>
</div>
<div style="display: flex; justify-content: space-between; align-items: center; background: #2F7A24; color: #FFFFFF; padding: 10px 14px; font-size: 15px; font-weight: 700">
<span>← 九段下</span>
<span>小川町 →</span>
</div>
</div>
<dl style="margin: 6px 0 0; display: grid; grid-template-columns: 56px 1fr; gap: 10px 12px; font-size: 14px; line-height: 1.6">
<dt style="font-weight: 700; color: #3A3A3A">いつ</dt>
<dd style="margin: 0">10/23〜11/1　神田古本まつり開催中（残りは金・土・日）</dd>
</dl>
<div style="display: flex; flex-direction: column; gap: 8px">
<div role="group" aria-label="理由の種類" style="display: flex; gap: 6px">
<button onClick="{{ pickK }}" aria-pressed="{{ pressedK }}" style="{{ styleK }}">暦</button>
<button onClick="{{ pickR }}" aria-pressed="{{ pressedR }}" style="{{ styleR }}">歴史</button>
<button onClick="{{ pickS }}" aria-pressed="{{ pressedS }}" style="{{ styleS }}">好き</button>
</div>
<p style="margin: 0; font-size: 14px; line-height: 1.7; min-height: 72px">{{ why }}</p>
</div>
<div style="flex: 1"></div>
<div style="display: flex; gap: 10px">
<button style="flex: 1; min-height: 56px; border-radius: 6px; border: 2px solid #1B1B1B; background: transparent; color: #1B1B1B; font-size: 16px; font-weight: 700; cursor: pointer">引き直す</button>
<a href="P1Twist.dc.html" style="flex: 2; display: flex; align-items: center; justify-content: center; min-height: 56px; border-radius: 6px; background: #2F7A24; color: #FFFFFF; font-size: 17px; font-weight: 700">ここにする</a>
</div>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":390,"height":844}}'>
class Component extends DCLogic {
renderVals() {
const s = this.state || {};
const k = s.k || 'k';
const WHY = {
k: '暦：靖国通り沿いに100台超のワゴンが並ぶのは、日曜まで。雨の日は中止。',
r: '歴史：町名は、江戸の旗本・神保氏の屋敷があったことに由来するとされる。',
s: '好き：あなたが登録した「古本」に当たる日。1冊だけ買って、帰りの電車で読み始める。'
};
const base = 'flex: 1; min-height: 44px; border-radius: 4px; border: 2px solid #1B1B1B; font-size: 14px; font-weight: 700; cursor: pointer;';
const on = base + ' background: #1B1B1B; color: #FFFFFF;';
const off = base + ' background: transparent; color: #1B1B1B;';
return {
why: WHY[k],
styleK: k === 'k' ? on : off,
styleR: k === 'r' ? on : off,
styleS: k === 's' ? on : off,
pressedK: k === 'k' ? 'true' : 'false',
pressedR: k === 'r' ? 'true' : 'false',
pressedS: k === 's' ? 'true' : 'false',
pickK: () => this.setState({ k: 'k' }),
pickR: () => this.setState({ k: 'r' }),
pickS: () => this.setState({ k: 's' })
};
}
}
</script>
</body>
</html>
~~~

## P1Twist.dc.html
~~~html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>駅名標：ツイスト</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link href="https://fonts.googleapis.com/css2?family=BIZ+UDPGothic:wght@400;700&family=DotGothic16&display=swap" rel="stylesheet">
<style>
body{margin:0}
a{text-decoration:none}
button{font-family:inherit}
a:focus-visible,button:focus-visible{outline:3px solid #FFB020;outline-offset:2px}
</style>
</helmet>
<div style="width: 390px; height: 844px; box-sizing: border-box; padding: 20px 20px 24px; background: #0E0E0E; color: #F5F5F5; font-family: 'BIZ UDPGothic', 'Hiragino Sans', sans-serif; display: flex; flex-direction: column; gap: 16px">
<div style="display: flex; align-items: center; gap: 4px; margin-left: -8px">
<a href="P1Destination.dc.html" aria-label="行き先に戻る" style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; color: #F5F5F5"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></a>
<span style="font-size: 15px; font-weight: 700">ツイスト</span>
</div>
<div style="display: flex; align-items: center; gap: 14px">
<div role="img" aria-label="1枚目の写真" style="width: 88px; height: 88px; border-radius: 6px; background: #F26B4F; border: 2px solid #F5F5F5; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #0E0E0E">写真</div>
<div style="display: flex; flex-direction: column; gap: 4px">
<span style="font-size: 22px; font-weight: 700">1枚目、撮れた。</span>
<span style="font-size: 13px; color: #CFCFCF">お題：一番うるさい色</span>
</div>
</div>
<div style="display: flex; flex-direction: column; gap: 14px; background: #000000; border: 3px solid #4A4A4A; border-radius: 6px; padding: 20px 18px 22px; font-family: 'DotGothic16', 'BIZ UDPGothic', sans-serif; color: #FFB020">
<div style="display: flex; justify-content: space-between; font-size: 14px; color: #CFCFCF">
<span>ツイスト</span>
<span>TWIST</span>
</div>
<div style="height: 1px; background: #4A4A4A"></div>
<div style="font-size: 14px">1枚目 うるさい色　撮影済み</div>
<div style="font-size: 34px; line-height: 1.4">その反対色も<br>撮る</div>
<div style="font-size: 15px">Take the opposite colour.</div>
<div style="font-size: 13px; color: #CFCFCF">同じ場所・同じ構図　／　引き直し 残り1回</div>
</div>
<div style="flex: 1"></div>
<a href="Comment.dc.html" style="display: flex; align-items: center; justify-content: center; min-height: 60px; border-radius: 6px; background: #FFB020; color: #0E0E0E; font-size: 18px; font-weight: 700">受けて立つ（2枚目を撮る）</a>
<button style="min-height: 52px; border-radius: 6px; border: 2px solid #FFB020; background: transparent; color: #FFB020; font-size: 15px; font-weight: 700; cursor: pointer">ツイストを引き直す（1回だけ）</button>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":390,"height":844}}'>
class Component extends DCLogic {
renderVals() {
return {};
}
}
</script>
</body>
</html>
~~~

## Q1Shrine.dc.html
~~~html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>由緒書き：行き先</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link href="https://fonts.googleapis.com/css2?family=BIZ+UDPMincho:wght@400;700&family=BIZ+UDPGothic:wght@400;700&display=swap" rel="stylesheet">
<style>
body{margin:0}
a{text-decoration:none}
button{font-family:inherit}
a:focus-visible,button:focus-visible{outline:3px solid #3B2A1E;outline-offset:2px}
</style>
</helmet>
<div style="width: 390px; height: 844px; box-sizing: border-box; padding: 20px 20px 24px; background: #D8D3C6; color: #2A1F16; font-family: 'BIZ UDPGothic', 'Hiragino Sans', sans-serif; display: flex; flex-direction: column; gap: 14px">
<div style="display: flex; align-items: center; justify-content: space-between">
<div style="display: flex; align-items: center; gap: 4px; margin-left: -8px">
<a href="Main.dc.html" aria-label="ホームに戻る" style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; color: #2A1F16"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></a>
<span style="font-size: 15px; font-weight: 700">寺社</span>
</div>
<span style="font-size: 13px; color: #3F3226">10/30（金）</span>
</div>
<div style="position: relative; display: flex; flex-direction: column; gap: 0; margin-top: 8px">
<div aria-hidden="true" style="position: absolute; left: 36px; bottom: -34px; width: 14px; height: 34px; background: #5A4332"></div>
<div aria-hidden="true" style="position: absolute; right: 36px; bottom: -34px; width: 14px; height: 34px; background: #5A4332"></div>
<div style="display: flex; background: #FBF8EE; border: 5px solid #3B2A1E; border-radius: 4px; box-shadow: inset 0 0 0 3px #FBF8EE, inset 0 0 0 4px #3B2A1E">
<div style="flex: 1; display: flex; flex-direction: column; gap: 12px; padding: 22px 8px 20px 20px">
<span style="font-size: 12px; font-weight: 700; letter-spacing: 0.3em; color: #5A4332">由緒書</span>
<div role="group" aria-label="理由の種類" style="display: flex; gap: 6px">
<button onClick="{{ pickR }}" aria-pressed="{{ pressedR }}" style="{{ styleR }}">歴史</button>
<button onClick="{{ pickK }}" aria-pressed="{{ pressedK }}" style="{{ styleK }}">暦</button>
<button onClick="{{ pickS }}" aria-pressed="{{ pressedS }}" style="{{ styleS }}">好き</button>
</div>
<p style="margin: 0; font-size: 15px; line-height: 1.85; min-height: 150px">{{ why }}</p>
<dl style="margin: 0; display: grid; grid-template-columns: 46px 1fr; gap: 6px 8px; font-size: 13px; line-height: 1.6; border-top: 1.5px solid #3B2A1E; padding-top: 10px">
<dt style="font-weight: 700; color: #5A4332">最寄り</dt>
<dd style="margin: 0">{{ near }}</dd>
<dt style="font-weight: 700; color: #5A4332">いつ</dt>
<dd style="margin: 0">{{ when }}</dd>
</dl>
</div>
<div style="display: flex; align-items: flex-start; justify-content: center; padding: 22px 18px 20px 6px; border-left: 1.5px solid #3B2A1E; margin-left: 4px">
<h1 style="margin: 0; font-family: 'BIZ UDPMincho', serif; font-size: 52px; line-height: 1.15; font-weight: 700; letter-spacing: 0.08em; writing-mode: vertical-rl">{{ name }}</h1>
</div>
</div>
</div>
<div style="flex: 1"></div>
<div style="display: flex; gap: 10px; margin-top: 40px">
<button onClick="{{ redraw }}" style="flex: 1; min-height: 56px; border-radius: 4px; border: 2px solid #3B2A1E; background: transparent; color: #2A1F16; font-size: 16px; font-weight: 700; cursor: pointer">引き直す</button>
<a href="P1Twist.dc.html" style="flex: 2; display: flex; align-items: center; justify-content: center; min-height: 56px; border-radius: 4px; background: #3B2A1E; color: #FBF8EE; font-size: 17px; font-weight: 700">ここにする</a>
</div>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":390,"height":844}}'>
class Component extends DCLogic {
renderVals() {
const s = this.state || {};
const k = s.k || 'r';
const idx = s.idx || 0;
const DATA = [
{ name: '鷲神社', near: '入谷駅（日比谷線）', when: '一の酉 11/7（土）・二の酉 11/19（木）',
  r: '天日鷲命と日本武尊をまつる。「おとりさま」の名で親しまれ、酉の市の発祥とされる。',
  k: '酉の市まで、あと8日。人が増える前に、熊手の並ぶ前の境内を歩いておく。',
  s: '「祭り」が好きなあなたへ。本番の前の静かな境内は、下見の日にしか見られない。' },
{ name: '浅草寺', near: '浅草駅（銀座線ほか）', when: '毎月18日は観音の縁日（次は11/18 水）',
  r: '縁起によれば628年、隅田川で漁をしていた兄弟が観音像を網で引き上げたのが始まり。',
  k: '毎月18日は観音の縁日。ふたりで行くなら、18日にもう一度。今日は下見。',
  s: '「古い門前町」が好きなあなたへ。仲見世を抜けた先の裏通りを、帰りに歩く。' }
];
const d = DATA[idx % DATA.length];
const base = 'flex: 1; min-height: 44px; border-radius: 3px; border: 2px solid #3B2A1E; font-size: 14px; font-weight: 700; cursor: pointer;';
const on = base + ' background: #3B2A1E; color: #FBF8EE;';
const off = base + ' background: transparent; color: #2A1F16;';
return {
name: d.name, near: d.near, when: d.when, why: d[k],
styleR: k === 'r' ? on : off,
styleK: k === 'k' ? on : off,
styleS: k === 's' ? on : off,
pressedR: k === 'r' ? 'true' : 'false',
pressedK: k === 'k' ? 'true' : 'false',
pressedS: k === 's' ? 'true' : 'false',
pickR: () => this.setState({ k: 'r' }),
pickK: () => this.setState({ k: 'k' }),
pickS: () => this.setState({ k: 's' }),
redraw: () => this.setState({ idx: idx + 1 })
};
}
}
</script>
</body>
</html>
~~~

## P1Album.dc.html
~~~html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>往復きっぷ：アルバムと共有</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link href="https://fonts.googleapis.com/css2?family=BIZ+UDPGothic:wght@400;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
body{margin:0}
a{text-decoration:none}
button{font-family:inherit}
a:focus-visible,button:focus-visible{outline:3px solid #1B1B1B;outline-offset:2px}
</style>
</helmet>
<div style="position: relative; width: 390px; height: 844px; box-sizing: border-box; padding: 20px 20px 24px; background: #F1F1EE; color: #1B1B1B; font-family: 'BIZ UDPGothic', 'Hiragino Sans', sans-serif; display: flex; flex-direction: column; gap: 14px; overflow: hidden">
<div style="display: flex; align-items: center; gap: 4px; margin-left: -8px">
<a href="P1Destination.dc.html" aria-label="行き先に戻る" style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; color: #1B1B1B"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></a>
<span style="font-size: 15px; font-weight: 700">きょうのきっぷ</span>
</div>
<div style="position: relative; background: #F6EEDB; border: 2px solid #1B1B1B; border-radius: 6px; padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 10px">
<div style="display: flex; justify-content: space-between; align-items: baseline">
<span style="font-size: 12px; font-weight: 700; letter-spacing: 0.3em">乗車券</span>
<span style="font-family: 'DM Mono', monospace; font-size: 12px">2026.10.30 有効当日限り</span>
</div>
<div style="display: flex; align-items: baseline; gap: 8px">
<span style="font-size: 34px; font-weight: 700; line-height: 1.1">神保町</span>
<span style="font-size: 16px; font-weight: 700">ゆき</span>
</div>
<div style="display: flex; gap: 8px">
<div style="flex: 1; display: flex; flex-direction: column; gap: 4px">
<div role="img" aria-label="往の写真" style="height: 96px; background: #F26B4F; border: 1.5px solid #1B1B1B"></div>
<span style="font-size: 12px; font-weight: 700">往　うるさい色</span>
</div>
<div style="flex: 1; display: flex; flex-direction: column; gap: 4px">
<div role="img" aria-label="復の写真" style="height: 96px; background: #4FC1DE; border: 1.5px solid #1B1B1B"></div>
<span style="font-size: 12px; font-weight: 700">復　反対色</span>
</div>
</div>
<div style="border-top: 1.5px dashed #1B1B1B; padding-top: 8px; font-size: 14px; line-height: 1.6">「この看板だけ、街の音がしそうだった」</div>
<div aria-hidden="true" style="position: absolute; right: 14px; top: 44px; width: 64px; height: 64px; border: 2px solid #B3261E; border-radius: 50%; color: #B3261E; display: flex; flex-direction: column; align-items: center; justify-content: center; transform: rotate(-12deg); font-family: 'DM Mono', monospace; font-size: 11px; line-height: 1.2; background: rgba(246, 238, 219, 0.6)"><span>10.30</span><span>神保町</span></div>
</div>
<p style="margin: 0; font-size: 12px; line-height: 1.7; color: #3A3A3A">往は1枚目、復はツイスト。1回の散歩が、この1枚の画像になります。</p>
<div style="flex: 1"></div>
<button onClick="{{ openSheet }}" style="min-height: 56px; border-radius: 6px; border: 0; background: #2F7A24; color: #FFFFFF; font-size: 17px; font-weight: 700; cursor: pointer">共有する（Instagram・LINE・AirDrop）</button>
<div style="display: flex; gap: 10px">
<button style="flex: 1; min-height: 52px; border-radius: 6px; border: 2px solid #1B1B1B; background: transparent; color: #1B1B1B; font-size: 14px; font-weight: 700; cursor: pointer">画像を保存</button>
<a href="P1Together.dc.html" style="flex: 1; display: flex; align-items: center; justify-content: center; min-height: 52px; border-radius: 6px; border: 2px solid #1B1B1B; color: #1B1B1B; font-size: 14px; font-weight: 700; text-align: center">相手のきっぷを見る</a>
</div>
<div style="{{ sheetWrap }}">
<div style="flex: 1; background: rgba(27, 27, 27, 0.45)"></div>
<div style="background: #FFFFFF; border-radius: 16px 16px 0 0; padding: 16px 20px 24px; display: flex; flex-direction: column; gap: 12px">
<div style="display: flex; justify-content: space-between; align-items: center">
<span style="font-size: 15px; font-weight: 700">この先は、スマホ標準の共有画面</span>
<button onClick="{{ closeSheet }}" aria-label="閉じる" style="width: 44px; height: 44px; border: 0; background: transparent; font-size: 22px; cursor: pointer; color: #1B1B1B">×</button>
</div>
<p style="margin: 0; font-size: 13px; line-height: 1.7; color: #3A3A3A">アプリは画像を渡すだけ。送り先（ストーリーズ・メッセージ・LINE・AirDropなど）は、そこで自分で選びます。アプリからInstagramへ直接は投稿できません。</p>
<div style="display: flex; gap: 8px; flex-wrap: wrap">
<span style="border: 1.5px solid #1B1B1B; border-radius: 4px; padding: 8px 10px; font-size: 13px; font-weight: 700">ストーリーズ</span>
<span style="border: 1.5px solid #1B1B1B; border-radius: 4px; padding: 8px 10px; font-size: 13px; font-weight: 700">メッセージ</span>
<span style="border: 1.5px solid #1B1B1B; border-radius: 4px; padding: 8px 10px; font-size: 13px; font-weight: 700">LINE</span>
<span style="border: 1.5px solid #1B1B1B; border-radius: 4px; padding: 8px 10px; font-size: 13px; font-weight: 700">AirDrop</span>
<span style="border: 1.5px solid #1B1B1B; border-radius: 4px; padding: 8px 10px; font-size: 13px; font-weight: 700">画像を保存</span>
</div>
</div>
</div>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":390,"height":844}}'>
class Component extends DCLogic {
renderVals() {
const s = this.state || {};
const open = !!s.open;
return {
sheetWrap: open ? 'position: absolute; left: 0; top: 0; width: 390px; height: 844px; display: flex; flex-direction: column' : 'display: none',
openSheet: () => this.setState({ open: true }),
closeSheet: () => this.setState({ open: false })
};
}
}
</script>
</body>
</html>
~~~

## Odai.dc.html
~~~html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>お題</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
body{margin:0}
a{text-decoration:none}
button{font-family:inherit}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #1A1F1D;outline-offset:2px}
</style>
</helmet>
<div style="width: 390px; height: 844px; box-sizing: border-box; padding: 20px 20px 24px; background: #F3F1EA; color: #1A1F1D; font-family: 'Zen Kaku Gothic New', 'Hiragino Sans', sans-serif; display: flex; flex-direction: column; gap: 16px">
<div style="display: flex; align-items: center; justify-content: space-between">
<div style="display: flex; align-items: center; gap: 4px; margin-left: -8px">
<a href="Destination.dc.html" aria-label="行き先の選択に戻る" style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; color: #1A1F1D"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></a>
<span style="font-size: 15px; font-weight: 700">お題</span>
</div>
<span style="font-family: 'DM Mono', monospace; font-size: 14px; font-weight: 500">1 / 3</span>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 8px">
<span style="font-size: 13px; font-weight: 500; color: #3A413E; background: #FFFFFF; border: 1px solid #D9D5C8; border-radius: 999px; padding: 6px 12px">行き先：[決めた場所]</span>
<span style="font-family: 'DM Mono', 'Zen Kaku Gothic New', monospace; font-size: 13px; color: #3A413E; background: #FFFFFF; border: 1px solid #D9D5C8; border-radius: 999px; padding: 6px 12px">合言葉 ほしぞら-42</span>
</div>
<div style="display: flex; flex-direction: column; gap: 18px; background: #FFFFFF; border: 2px solid #1A1F1D; border-radius: 20px; padding: 24px 22px 28px; margin-top: 8px">
<span style="align-self: flex-start; background: #F2C230; color: #1A1F1D; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 999px">今日のお題</span>
<h1 style="margin: 0; font-size: 36px; line-height: 1.45; font-weight: 900">この道で<br>一番うるさい色を<br>撮る</h1>
<p style="margin: 0; font-size: 14px; line-height: 1.7; color: #3A413E">あとで「なぜそれにしたか」を一言書きます。</p>
</div>
<div style="display: flex; gap: 8px; align-items: center; margin-top: 4px">
<span aria-hidden="true" style="width: 12px; height: 12px; border-radius: 50%; background: #1A1F1D"></span>
<span aria-hidden="true" style="width: 12px; height: 12px; border-radius: 50%; border: 2px solid #1A1F1D; box-sizing: border-box"></span>
<span aria-hidden="true" style="width: 12px; height: 12px; border-radius: 50%; border: 2px solid #1A1F1D; box-sizing: border-box"></span>
<span style="font-size: 12px; color: #4A514E; margin-left: 4px">今日は3つ</span>
</div>
<div style="flex: 1"></div>
<a href="Twist.dc.html" style="display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 60px; border-radius: 16px; background: #F2C230; border: 2px solid #1A1F1D; box-sizing: border-box; color: #1A1F1D; font-size: 18px; font-weight: 900"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>撮影する</a>
<a href="Odai.dc.html" style="display: flex; align-items: center; justify-content: center; min-height: 48px; font-size: 14px; font-weight: 500; color: #1A1F1D; text-decoration: underline; text-underline-offset: 4px">パスして別のお題を引く</a>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":390,"height":844}}'>
class Component extends DCLogic {
renderVals() {
return {};
}
}
</script>
</body>
</html>
~~~

## Comment.dc.html
~~~html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>一言</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
body{margin:0}
a{text-decoration:none}
button{font-family:inherit}
input::placeholder{color:#6B726F}
a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #1A1F1D;outline-offset:2px}
</style>
</helmet>
<div style="width: 390px; height: 844px; box-sizing: border-box; padding: 20px 20px 24px; background: #F3F1EA; color: #1A1F1D; font-family: 'Zen Kaku Gothic New', 'Hiragino Sans', sans-serif; display: flex; flex-direction: column; gap: 16px">
<div style="display: flex; align-items: center; gap: 4px; margin-left: -8px">
<a href="Twist.dc.html" aria-label="ツイストに戻る" style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; color: #1A1F1D"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></a>
<span style="font-size: 15px; font-weight: 700">一言</span>
</div>
<h1 style="margin: 0; font-size: 28px; line-height: 1.4; font-weight: 900">2枚そろった。<br>なぜ、それにした？</h1>
<div style="display: flex; gap: 12px">
<div style="flex: 1; display: flex; flex-direction: column; gap: 8px">
<div role="img" aria-label="1枚目の写真" style="height: 150px; border-radius: 14px; background: #F26B4F; border: 2px solid #1A1F1D; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700">写真</div>
<span style="font-size: 13px; font-weight: 500; color: #3A413E">1枚目　うるさい色</span>
</div>
<div style="flex: 1; display: flex; flex-direction: column; gap: 8px">
<div role="img" aria-label="2枚目の写真" style="height: 150px; border-radius: 14px; background: #4FC1DE; border: 2px solid #1A1F1D; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700">写真</div>
<span style="font-size: 13px; font-weight: 500; color: #3A413E">2枚目　反対色</span>
</div>
</div>
<div style="display: flex; flex-direction: column; gap: 8px; background: #FFFFFF; border: 1px solid #D9D5C8; border-radius: 14px; padding: 14px 16px">
<label for="why" style="font-size: 13px; font-weight: 700; color: #4A514E">一言（選んだ理由・見えたもの）</label>
<input id="why" type="text" placeholder="例：この看板だけ、街の音がしそうだった" style="min-height: 48px; box-sizing: border-box; font-size: 16px; font-family: inherit; border: 1px solid #1A1F1D; border-radius: 10px; padding: 0 12px; background: #F3F1EA; color: #1A1F1D">
<span style="font-size: 12px; color: #4A514E; line-height: 1.6">短くていい。あとでアルバムに並びます。</span>
</div>
<div style="flex: 1"></div>
<a href="Odai.dc.html" style="display: flex; align-items: center; justify-content: center; min-height: 60px; border-radius: 16px; background: #F2C230; border: 2px solid #1A1F1D; box-sizing: border-box; color: #1A1F1D; font-size: 18px; font-weight: 900">保存して次のお題へ</a>
<a href="Album.dc.html" style="display: flex; align-items: center; justify-content: center; min-height: 48px; font-size: 14px; font-weight: 500; color: #1A1F1D; text-decoration: underline; text-underline-offset: 4px">ここで終えて、アルバムにする</a>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":390,"height":844}}'>
class Component extends DCLogic {
renderVals() {
return {};
}
}
</script>
</body>
</html>
~~~
