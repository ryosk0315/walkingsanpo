import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toriNoIchi, calendarText, todayJst } from '../src/calendar.ts';

test('酉の市 2026 は 11/7 と 11/19、三の酉なし', () => {
  assert.deepEqual(toriNoIchi(2026).map(a => a.d), [7, 19]);
});

test('酉の市 2025 は 11/12 と 11/24（別の年でも十二支の周期が合う）', () => {
  assert.deepEqual(toriNoIchi(2025).map(a => a.d), [12, 24]);
});

test('縁日：当日と次回', () => {
  const r = [{ type: 'monthly' as const, day: 18, label: '観音' }];
  assert.equal(calendarText(r, { y: 2026, m: 11, d: 18 }), '今日は観音の縁日（毎月18日）。');
  assert.equal(calendarText(r, { y: 2026, m: 11, d: 13 }), '毎月18日は観音の縁日。次は11/18（水）、あと5日。');
  assert.equal(calendarText(r, { y: 2026, m: 12, d: 20 }), '毎月18日は観音の縁日。次は1/18（月）、あと29日。');
});

test('酉の市：期間前・当日・終了後', () => {
  const r = [{ type: 'otori' as const }];
  assert.equal(calendarText(r, { y: 2026, m: 11, d: 13 }), '酉の市は 一の酉 11/7（土）・二の酉 11/19（木）。次の二の酉まで、あと6日。');
  assert.equal(calendarText(r, { y: 2026, m: 11, d: 7 }), '今日は一の酉。酉の市は 一の酉 11/7（土）・二の酉 11/19（木）。');
  assert.match(calendarText(r, { y: 2026, m: 12, d: 1 })!, /^酉の市は 一の酉 11\/\d+.*2?/);
});

test('ルールなしは null', () => {
  assert.equal(calendarText([], { y: 2026, m: 11, d: 13 }), null);
});

test('日本時間：UTC 11/12 20:00 は JST 11/13', () => {
  assert.deepEqual(todayJst(new Date('2026-11-12T20:00:00Z')), { y: 2026, m: 11, d: 13 });
});
