import raw from '../data/places.verified.json';
import type { Rule } from './calendar';

export type Place = {
  id: string;
  name: string;
  kana: string;
  romaji: string;
  category: string;
  near: { station: string; line: string }[];
  rules: Rule[];
  reasons: {
    history: { text: string; source: { title: string; url: string; fetchedAt: string; revision: string } };
    likes: string[];
  };
  verified: boolean;
};

// 検証済みでないデータは表示しない
export const places = (raw as Place[]).filter(p => p.verified);

// 見た目のテンプレート。寺社は由緒書き、それ以外は駅名標
export type Template = 'shrine' | 'station';
export const templateOf = (p: Place): Template => (p.category === '寺社' ? 'shrine' : 'station');

// 路線の色。白文字とのコントラスト比 4.5 以上になるよう、公式色より暗くしている
export const LINE_COLOR: Record<string, string> = {
  '都営新宿線': '#2F7A24',
  '都営三田線': '#0B63A8',
  '都営浅草線': '#B5354F',
  '東京メトロ半蔵門線': '#6A4FB8',
  '東京メトロ銀座線': '#A35A00',
  '東京メトロ日比谷線': '#56656D',
  '東京メトロ丸ノ内線': '#C1121F',
  '東京メトロ千代田線': '#007A50',
  '東京メトロ東西線': '#00699A',
  '都電荒川線': '#B0306A',
  '東急目黒線': '#00739B',
  '東武大師線': '#1E4A9C',
  '東武スカイツリーライン': '#1E4A9C',
  '京成金町線': '#1E5AA8',
  'JR中央線': '#B85400',
  'JR山手線': '#3D7A1F',
};
export const lineColor = (line: string) => LINE_COLOR[line] ?? '#1B1B1B';
