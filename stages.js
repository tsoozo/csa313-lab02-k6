// Алхам 3: ачааллыг шатлан өсгөж бууруулах (ramp-up / ramp-down)
// Анхаар: stages ашигласан нэг ажиллуулалт төгсгөлд НЭГТГЭСЭН summary өгдөг,
// тиймээс 5/30/100 VU-ийн тоог script.js-ийн тусдаа ажиллуулалтаас авсан.
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 5 },   // халаалт
    { duration: '1m', target: 30 },   // өсгөлт
    { duration: '30s', target: 100 }, // оргил
    { duration: '30s', target: 0 },   // буулт
  ],
};

export default function () {
  const res = http.get('https://quickpizza.grafana.com/');
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1); // think time
}
