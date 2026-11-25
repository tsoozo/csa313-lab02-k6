// Алхам 4: SLO-г k6 threshold болгон кодоор шалгах (quality gate)
// SLO-г өөрийн baseline-аас гаргасан: baseline p95 = 222.99ms (5 VU, 30s)
//   p95 SLO = 222.99 × 1.5 ≈ 335ms; error rate SLO < 1%
// Босгыг командын мөрөөс өөрчилж болно: k6 run -e P95=50 threshold.js
import http from 'k6/http';
import { sleep, check } from 'k6';

const P95 = __ENV.P95 || 335; // ms, анхдагч утга нь baseline × 1.5

// Анхаар: stages ашиглаагүй. stages байвал vus/duration чимээгүй үл тоогдоно
export const options = {
  vus: 30,
  duration: '1m',
  thresholds: {
    http_req_duration: [`p(95)<${P95}`], // SLO: хэрэглэгчдийн 95% нь P95 ms-ээс хурдан хариу авна
    http_req_failed: ['rate<0.01'],      // SLO: алдааны түвшин 1%-иас бага
  },
};

export default function () {
  const res = http.get('https://quickpizza.grafana.com/');
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}
