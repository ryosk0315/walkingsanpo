// 暦の理由は日付のルールで計算する（Wikipediaは使わない）。日付はすべて日本時間。

export type Ymd = { y: number; m: number; d: number };

export type Rule =
  | { type: 'monthly'; day: number; label: string }
  | { type: 'otori' };

const WEEK = '日月火水木金土';

export function todayJst(now = new Date()): Ymd {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: 'numeric', day: 'numeric' })
    .formatToParts(now);
  const get = (t: string) => Number(p.find(x => x.type === t)!.value);
  return { y: get('year'), m: get('month'), d: get('day') };
}

const dayNumber = ({ y, m, d }: Ymd) => Math.floor(Date.UTC(y, m - 1, d) / 86400000);
const fromDayNumber = (n: number): Ymd => {
  const t = new Date(n * 86400000);
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
};
const daysInMonth = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();

export const fmt = (a: Ymd) => `${a.m}/${a.d}（${WEEK[new Date(Date.UTC(a.y, a.m - 1, a.d)).getUTCDay()]}）`;

// 日の十二支。0=子 … 9=酉。1970-01-01 は 巳（5）の日にあたる
// （2026年の酉の市 11/7・11/19 と一致することをテストで確認）。
export const dayBranch = (a: Ymd) => (((dayNumber(a) + 5) % 12) + 12) % 12;

// 酉の市：11月の酉の日（一の酉、二の酉、年によって三の酉）
export function toriNoIchi(y: number): Ymd[] {
  const out: Ymd[] = [];
  for (let d = 1; d <= 30; d++) if (dayBranch({ y, m: 11, d }) === 9) out.push({ y, m: 11, d });
  return out;
}

function nextMonthly(today: Ymd, day: number): Ymd {
  let { y, m } = today;
  if (today.d > day || day > daysInMonth(y, m)) {
    do { m++; if (m > 12) { m = 1; y++; } } while (day > daysInMonth(y, m));
  }
  return { y, m, d: day };
}

const ORD = ['一', '二', '三'];

// 画面に出す暦の一文。ルールがなければ null
export function calendarText(rules: Rule[], today: Ymd): string | null {
  const lines: string[] = [];
  for (const r of rules) {
    if (r.type === 'monthly') {
      const next = nextMonthly(today, r.day);
      const diff = dayNumber(next) - dayNumber(today);
      lines.push(diff === 0
        ? `今日は${r.label}の縁日（毎月${r.day}日）。`
        : `毎月${r.day}日は${r.label}の縁日。次は${fmt(next)}、あと${diff}日。`);
    } else {
      let days = toriNoIchi(today.y).filter(a => dayNumber(a) >= dayNumber(today));
      if (!days.length) days = toriNoIchi(today.y + 1);
      const all = toriNoIchi(days[0].y);
      const list = all.map((a, i) => `${ORD[i]}の酉 ${fmt(a)}`).join('・');
      const next = days[0];
      const diff = dayNumber(next) - dayNumber(today);
      const which = ORD[all.findIndex(a => a.d === next.d)];
      lines.push(diff === 0
        ? `今日は${which}の酉。酉の市は ${list}。`
        : `酉の市は ${list}。次の${which}の酉まで、あと${diff}日。`);
    }
  }
  return lines.length ? lines.join('') : null;
}

export { fromDayNumber };
