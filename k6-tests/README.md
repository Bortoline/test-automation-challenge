# Testes de Performance com K6

Este diretório contém os testes de performance usando K6 para avaliar a capacidade de carga da aplicação.

## 📋 Pré-requisitos

1. **Instalar K6**:
   ```bash
   # Via npm (recomendado)
   npm run k6:install
   
   # Ou manualmente no Windows
   winget install k6
   
   # Ou no Linux/Mac
   brew install k6
   ```

2. **Instalar dependências**:
   ```bash
   # No diretório k6-tests
   npm install
   ```

## 🚀 Execução dos Testes

### Usando NPM Scripts (Recomendado)

Na **raiz do projeto** ou no **diretório k6-tests**:

```bash
# Teste rápido (1 minuto) - Gera HTML + JSON + TXT
npm run k6:test-short

# Teste completo (10 minutos) - Gera HTML + JSON + TXT
npm run k6:test

# Limpar relatórios anteriores
npm run k6:clean

# Ver ajuda
npm run k6:help
```

### Execução Direta (Não Recomendado)

```bash
# No diretório k6-tests
k6 run load-test-short.js
k6 run load-test.js
```

## 📊 Tipos de Teste

### 1. Teste Rápido (`load-test-short.js`)
- **Duração**: ~1 minuto
- **Usuários**: 5-10 usuários virtuais
- **Ideal para**: Desenvolvimento e testes rápidos
- **Arquivos gerados**:
  - `../reports/k6/report-short.html`
  - `../reports/k6/summary-short.json`
  - `../reports/k6/summary-short.txt`

### 2. Teste Completo (`load-test.js`)
- **Duração**: ~10 minutos
- **Usuários**: 100-500 usuários virtuais
- **Ideal para**: Validação de performance em produção
- **Arquivos gerados**:
  - `../reports/k6/report-full.html`
  - `../reports/k6/summary-full.json`
  - `../reports/k6/summary-full.txt`

## 📈 Relatórios

Os relatórios são gerados automaticamente em `../reports/k6/`:

### 📄 Tipos de Relatório:
- **`.html`** - Relatório visual interativo (recomendado para análise)
- **`.json`** - Dados detalhados em formato JSON (para integração)
- **`.txt`** - Resumo em texto simples (para logs)

### 🎨 Relatório HTML:
O relatório HTML inclui:
- Gráficos interativos de performance
- Métricas detalhadas por endpoint
- Timeline de execução
- Análise de thresholds
- Distribuição de tempos de resposta

## 🎯 Métricas Monitoradas

- **Tempo de Resposta**: 95% das requisições < 2s
- **Taxa de Erro**: < 10% de falhas
- **Taxa de Sucesso**: > 90% de sucesso
- **Throughput**: Requisições por segundo
- **Métricas Customizadas**: Contadores de erro, duração de requisições

## 🔧 Configuração

Para modificar os testes:

1. **Alterar URL**: Edite a URL no arquivo de teste
2. **Ajustar Carga**: Modifique os `stages` no `options`
3. **Personalizar Métricas**: Adicione novos `checks` e `thresholds`
4. **Customizar Relatórios**: Modifique a função `handleSummary()`

## 📝 Exemplos de Uso

```bash
# Execução completa com limpeza
npm run k6:clean && npm run k6:test-short

# Teste com variáveis de ambiente
k6 run -e BASE_URL=https://minha-api.com load-test.js

# Visualizar relatório HTML
# Abra o arquivo ../reports/k6/report-short.html no navegador
```

## 🤖 GitHub Actions

O workflow do GitHub Actions usa os scripts npm:

```yaml
- name: Run K6 Load Test (Short Version with HTML Reports)
  run: cd k6-tests && npm run k6:test-short
```

Isso garante:
- ✅ Consistência entre ambiente local e CI/CD
- ✅ Geração automática de relatórios HTML
- ✅ Upload de artefatos com todos os formatos

## 🐛 Troubleshooting

- **Erro "k6 not found"**: Execute `npm run k6:install`
- **Erro "npm not found"**: Instale Node.js
- **Relatórios não gerados**: Verifique se a pasta `../reports/k6/` existe
- **Falha na conexão**: Verifique se a URL de teste está acessível
- **Permissão negada**: Execute `chmod +x` nos scripts se necessário

## 📚 Recursos Adicionais

- [Documentação K6](https://k6.io/docs/)
- [K6 HTML Reporter](https://github.com/benc-uk/k6-reporter)
- [Métricas K6](https://k6.io/docs/using-k6/metrics/)
- [Thresholds K6](https://k6.io/docs/using-k6/thresholds/) 