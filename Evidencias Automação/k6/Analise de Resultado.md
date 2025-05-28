# Análise de Resultados do Teste de Carga com K6

## Resumo do Teste

* **API Testada**: JSONPlaceholder (https://jsonplaceholder.typicode.com/posts)
* **Duração Total**: 7 minutos (com 30s de graceful stop)
* **Usuários Virtuais**: Até 500 simultâneos
* **Total de Requisições**: 169.157 requisições completas

## Métricas Principais

* **Taxa de Sucesso**: 99,60%
* **Checks validados**: 506.798
* **Checks com falha**: 673 (`tempo de resposta aceitável`)
* **Throughput médio**: \~402 requisições por segundo

### Tempo de Resposta

* **Média**: 47,23 ms
* **P95**: 52,02 ms
* **Máximo**: 19.939 ms (\~19,9 segundos)

## Análise de Gargalos

1. **Latência extrema**: Apesar do bom desempenho médio, tivemos 673 requisições (0,4%) com tempo acima do limiar de resposta aceitável, alcançando até 19s. Esse comportamento pode impactar diretamente a experiência do usuário final em cenários de pico.
2. **Distribuição dos tempos**: A mediana foi de 34ms e o P95 ficou dentro do padrão (<100ms), mas o pico extremo revela possibilidade de gargalos pontuais no backend ou em dependências externas.
3. **Ausência de falhas de rede**: Nenhuma requisição apresentou erro de status (ex: 5xx, timeout), o que indica boa estabilidade da infraestrutura sob carga.

## Consumo de Recursos

* **Dados recebidos**: 4,7 GB (taxa média de 11 MB/s)
* **Dados enviados**: 21 MB (taxa média de 49 KB/s)

## Conclusões

* O sistema é **estável sob alta carga**, com excelente taxa de sucesso e bom desempenho médio.
* As falhas no critério de tempo de resposta indicam que há **pontos específicos de lentidão**, que devem ser monitorados e corrigidos.
* A infraestrutura suportou bem o volume de usuários, mas **há margem para otimização de tempo de resposta em cenários extremos**.

## Recomendações

* **Analisar logs das requisições lentas** para identificar causas (ex: queries lentas, dependências externas, filas internas).
* **Monitorar comportamento em produção** em horários de pico com alertas baseados no tempo de resposta.
* **Reexecutar testes com perfil de uso realista** e simulação de cenários com picos de carga mais abruptos.
* Considerar **teste de estresse** para determinar o ponto de saturação do sistema.
