import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Métricas personalizadas
const errors = new Counter('errors');
const requestDuration = new Trend('request_duration');
const successRate = new Rate('success_rate');

// Configuração do teste (versão reduzida para demonstração)
export const options = {
  stages: [
    { duration: '10s', target: 50 },  // Rampa de subida para 50 usuários em 10 segundos
    { duration: '20s', target: 100 }, // Rampa de subida para 100 usuários em 20 segundos
    { duration: '30s', target: 100 }, // Manter 100 usuários por 30 segundos
    { duration: '10s', target: 0 },   // Rampa de descida para 0 usuários em 10 segundos
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% das requisições devem completar abaixo de 2s
    http_req_failed: ['rate<0.1'],     // Menos de 10% das requisições podem falhar
    'success_rate': ['rate>0.9'],      // Taxa de sucesso deve ser maior que 90%
  },
};

// Função principal executada para cada usuário virtual
export default function () {
  // Utilizando a API pública JSONPlaceholder para o teste
  const response = http.get('https://jsonplaceholder.typicode.com/posts');
  
  // Registra a duração da requisição
  requestDuration.add(response.timings.duration);
  
  // Verifica se a resposta foi bem-sucedida
  const success = check(response, {
    'status é 200': (r) => r.status === 200,
    'corpo contém dados': (r) => r.body.length > 0,
    'tempo de resposta aceitável': (r) => r.timings.duration < 500,
  });
  
  // Registra sucesso ou erro
  if (!success) {
    errors.add(1);
  }
  
  successRate.add(success);
  
  // Pausa entre requisições para simular comportamento do usuário
  sleep(1);
}

// Função para gerar relatório HTML após o teste
export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
    "summary.json": JSON.stringify(data),
  };
}
