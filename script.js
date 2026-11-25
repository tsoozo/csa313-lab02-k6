// Лаборатори №2: k6 гүйцэтгэлийн тест
// Бай: https://quickpizza.grafana.com/ (test.k6.io-оос шилжсэн k6-ийн албан ёсны
// дадлагын сайт; ёс зүйн шаардлагын дагуу зөвхөн зөвшөөрөгдсөн бай руу тест хийнэ)
import http from 'k6/http';
import { sleep, check } from 'k6';

// 5 зэрэгцээ виртуал хэрэглэгч (VU) 30 секундийн турш ажиллана
export const options = { vus: 5, duration: '30s' };

// VU бүр энэ функцийг давтан ажиллуулна (1 давталт = 1 хэрэглэгчийн үйлдэл)
export default function () {
  // Нүүр хуудас руу GET хүсэлт илгээнэ
  const res = http.get('https://quickpizza.grafana.com/');

  // Хариу 200 (амжилттай) эсэхийг шалгана. Үр дүн summary-гийн "checks" хэсэгт гарна
  check(res, { 'status 200 байна': (r) => r.status === 200 });

  // Бодит хэрэглэгч хуудас уншиж байгааг дуурайж 1 секунд хүлээнэ (think time)
  sleep(1);
}
