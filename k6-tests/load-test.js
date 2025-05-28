import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const errors = new Counter('errors');
const requestDuration = new Trend('request_duration');
const successRate = new Rate('success_rate');

export const options = {
  stages: [
    { duration: '30s', target: 100 }, // Rampa de subida para 100 usuários em 30s
    { duration: '30s', target: 300 }, // Rampa de subida para 300 usuários em 30s
    { duration: '30s', target: 500 }, // Rampa de subida para 500 usuários em 30s
    { duration: '5m', target: 500 }, // Manter 500 usuários por 5 minutos
    { duration: '30s', target: 0 },   // Rampa de descida para 0 usuários em 1 minuto
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% das requisições devem completar abaixo de 2s
    http_req_failed: ['rate<0.1'],     // Menos de 10% das requisições podem falhar
    'success_rate': ['rate>0.9'],      // Taxa de sucesso deve ser maior que 90%
  },
};

export default function () {
  const response = http.get('https://jsonplaceholder.typicode.com/posts');
  
  requestDuration.add(response.timings.duration);
  
  const success = check(response, {
    'status é 200': (r) => r.status === 200,
    'corpo contém dados': (r) => r.body.length > 0,
    'tempo de resposta aceitável': (r) => r.timings.duration < 500,
  });
  
  if (!success) {
    errors.add(1);
  }
  
  successRate.add(success);
  
  // Pausa entre requisições para simular comportamento do usuário
  sleep(1);
}

export function handleSummary(data) {
  return {
    "stdout": textSummary(data, { indent: " ", enableColors: true }), // Console colorido
    "../reports/k6/summary-full.json": JSON.stringify(data, null, 2), // JSON detalhado
    "../reports/k6/summary-full.txt": textSummary(data, { indent: " ", enableColors: false }), // Texto simples
    "../reports/k6/report-full.html": htmlReport(data), // HTML visual
  };
}
