# Desafio de Automação de Testes

## Descrição do Projeto

Este projeto contém a solução para o desafio de automação de testes, abrangendo testes de carga (K6), API (Playwright), E2E (Playwright + Cucumber para **Sauce Demo**) e mobile (Appium + WebDriverIO para **My Demo App**), além da configuração de uma pipeline CI/CD robusta com geração automática de relatórios.

## Arquitetura e Estrutura de Pastas

O projeto está organizado da seguinte forma:

```
/test-automation-challenge
├── .github/
│   └── workflows/
│       └── main.yml       # Pipeline CI/CD GitHub Actions (atualizada)
├── api-tests/             # Testes de API com Playwright (API pública)
│   ├── tests/             # Scripts de teste de API (specs)
│   ├── package.json
│   ├── package-lock.json
│   └── playwright.config.js
├── e2e-tests/             # Testes E2E com Playwright e Cucumber (Sauce Demo)
│   ├── features/          # Arquivos .feature (login_saucedemo.feature)
│   ├── pages/             # Page Objects (LoginPage, InventoryPage)
│   ├── step_definitions/  # Implementação dos steps (saucedemo_steps.js)
│   ├── support/           # Arquivos de suporte (hooks, reporter config)
│   ├── cucumber.conf.js   # Configuração dos hooks do Cucumber
│   ├── package.json
│   └── package-lock.json
├── k6-tests/              # Testes de Carga com K6 (API pública)
│   ├── load-test.js       # Script K6 completo (500 VUs, 5 min)
│   ├── load-test-short.js # Script K6 reduzido (demonstração)
│   ├── package.json
│   └── package-lock.json
├── mobile-tests/          # Testes Mobile com Appium e WebDriverIO (My Demo App)
│   ├── apps/              # APK do My Demo App
│   │   └── MyDemoApp.apk
│   ├── test/              # Scripts e Page Objects de teste mobile
│   │   ├── pageobjects/   # Page Objects (ProductsPage, CheckoutPage, etc.)
│   │   └── specs/         # Scripts de teste (purchase-flow.spec.js)
│   ├── wdio.conf.js       # Configuração do WebDriverIO
│   ├── package.json
│   └── package-lock.json
├── reports/               # Pasta agregadora de relatórios (gerados na execução)
│   ├── api-tests/         # Relatórios Playwright API
│   │   └── playwright-report/
│   ├── e2e-tests/         # Relatórios Cucumber E2E
│   │   └── cucumber-report.html
│   ├── k6/                # Relatórios K6
│   │   ├── k6-report.html # Relatório HTML K6
│   │   └── results.json   # Resultados JSON K6
│   └── mobile-tests/      # Relatórios Mobile
│       ├── allure-results/    # Resultados brutos Allure
│       ├── allure-report/     # Relatório HTML Allure (gerado automaticamente)
│       │   └── index.html     # Relatório principal
│       └── debug/             # Informações de debug (em caso de falha)
├── README.md              # Este arquivo
└── todo.md                # Checklist de progresso
```

## Versões Utilizadas (Principais)

- **Node.js**: v20.18.0
- **npm**: (Versão correspondente ao Node.js v20)
- **K6**: Instalado via repositório (versão estável no momento da execução)
- **Playwright**: v1.52.0 (@playwright/test)
- **Cucumber**: v10.9.0 (@cucumber/cucumber)
- **WebDriverIO**: v9.14.0 (Conforme dependências instaladas)
- **Appium**: v2.x.x (Conforme dependências instaladas via `@wdio/appium-service`)
- **Allure**: v2.34.0 (allure-commandline para geração de relatórios)

## Dependências e Instalação

1.  **Clone o repositório:**
    ```bash
    git clone git@github.com:Bortoline/test-automation-challenge.git
    cd test-automation-challenge
    ```
2.  **Instale o K6:** Siga as instruções em [https://grafana.com/docs/k6/latest/set-up/install-k6/](https://grafana.com/docs/k6/latest/set-up/install-k6/)
3.  **Instale Node.js e npm:** Certifique-se de ter o Node.js v20 ou superior instalado.
4.  **Instale as dependências de cada projeto:**
    ```bash
    cd api-tests && npm install && cd ..
    cd e2e-tests && npm install && cd ..
    cd k6-tests && npm install && cd ..
    cd mobile-tests && npm install && cd .. 
    ```
5.  **Instale os browsers do Playwright (para E2E):**
    ```bash
    cd e2e-tests && npx playwright install --with-deps && cd ..
    ```
6.  **Configuração Mobile (Para Execução Local):**
    - Instale o Android SDK e configure as variáveis de ambiente `ANDROID_HOME` e `ANDROID_SDK_ROOT`.
    - Instale o Appium Server globalmente (`npm install -g appium`) ou confie no `@wdio/appium-service` (já configurado no `wdio.conf.js`).
    - Instale o driver UiAutomator2 para Appium (`appium driver install uiautomator2`).
    - Tenha um emulador Android (API 28+) ou dispositivo físico configurado e rodando (`adb devices` deve listá-lo).
    - O APK `MyDemoApp.apk` já está incluído na pasta `mobile-tests/apps/`.

## Como Executar os Testes e Gerar Relatórios

**1. Testes de Carga (K6):**

   - Navegue até a pasta `k6-tests`.
   - Execute o teste (versão reduzida para demonstração):
     ```bash
     npm run k6:test-short
     ```
   - Ou execute o teste completo:
     ```bash
     npm run k6:test
     ```
   - O relatório HTML será gerado em `reports/k6/k6-report.html`.
   - O relatório JSON será salvo em `reports/k6/results.json`.

**2. Testes de API (Playwright):**

   - Navegue até a pasta `api-tests`.
   - Execute os testes:
     ```bash
     npx playwright test
     ```
   - O relatório HTML será gerado em `reports/api-tests/playwright-report/index.html`.
   - Para visualizar o relatório:
     ```bash
     npx playwright show-report
     ```

**3. Testes E2E (Playwright + Cucumber - Sauce Demo):**

   - Navegue até a pasta `e2e-tests`.
   - Execute os testes:
     ```bash
     npm test
     ```
   - O relatório HTML será gerado em `reports/e2e-tests/cucumber-report.html`.
   - **Nota:** O cenário de ordenação de produtos pode apresentar instabilidade ocasional devido a timeouts. Os demais cenários (login válido e inválido) são estáveis.

**4. Testes Mobile (Appium + WebDriverIO - My Demo App):**

   - **Requer Ambiente Completo:** A execução exige um ambiente local com Android SDK, Appium e emulador/dispositivo configurados (ver seção "Dependências e Instalação").
   - Em um ambiente configurado:
     - Inicie o Appium Server (se não estiver usando `@wdio/appium-service`).
     - Certifique-se que um emulador/dispositivo está rodando e visível via `adb devices`.
     - Navegue até a pasta `mobile-tests`.
     - Execute os testes:
       ```bash
       npm test
       ```
     - Os relatórios serão gerados automaticamente:
       - **Allure Results**: `reports/mobile-tests/allure-results/` (dados brutos)
       - **Allure HTML**: `reports/mobile-tests/allure-report/index.html` (relatório visual)
     - Para visualizar o relatório Allure:
       ```bash
       # Opção 1: Abrir o HTML gerado diretamente
       open reports/mobile-tests/allure-report/index.html
       
       # Opção 2: Usar o comando Allure (requer allure-commandline)
       npx allure serve reports/mobile-tests/allure-results
       ```

## Pipeline CI/CD (GitHub Actions)

A pipeline foi **completamente atualizada** e inclui as seguintes melhorias:

### Características da Pipeline:

- **Execução Paralela**: Todos os tipos de teste executam em paralelo para otimizar tempo
- **Cache Inteligente**: Cache de dependências Node.js para acelerar builds
- **Timeouts Robustos**: Timeouts configurados para evitar travamentos
- **Cleanup Automático**: Limpeza forçada de processos para evitar problemas de recursos
- **Relatórios Consolidados**: Todos os relatórios são organizados e disponibilizados como artefatos

### Jobs da Pipeline:

1. **install-deps**: Instala e cacheia todas as dependências
2. **performance-tests**: Executa testes K6 com relatórios HTML
3. **api-tests**: Executa testes Playwright API
4. **e2e-tests**: Executa testes Cucumber E2E
5. **mobile-tests**: Executa testes mobile com emulador Android
6. **archive-all-reports**: Consolida todos os relatórios

### Melhorias Específicas para Testes Mobile:

- **Emulador Android**: Configuração completa com API 29, cache de AVD
- **Appium Server**: Gerenciamento automático com controle de PID
- **Geração Automática de Relatório Allure HTML**: Usando `--single-file`
- **Cleanup Robusto**: Múltiplas camadas de limpeza de processos
- **Debug Automático**: Captura de screenshots e logs em caso de falha

### Artefatos Gerados:

A pipeline gera um artefato consolidado `all-test-reports-archive` contendo:

```
consolidated-reports/
├── performance-tests/
│   └── k6-report.html
├── api-tests/
│   └── playwright-report/index.html
├── e2e-tests/
│   └── cucumber-report.html
├── mobile-tests/
│   ├── allure-results/        # Dados brutos Allure
│   ├── allure-report/         # Relatório HTML Allure
│   │   └── index.html         # Relatório principal
│   └── debug/                 # Logs e screenshots (se houver falhas)
└── README.md                  # Instruções de visualização
```

### Como Usar a Pipeline:

1. **Trigger Automático**: A pipeline executa automaticamente em `push` ou `pull_request` para `main` ou `develop`
2. **Download de Relatórios**: Após a execução, baixe o artefato `all-test-reports-archive`
3. **Visualização**: Extraia o ZIP e abra os arquivos HTML nos browsers

### Configuração no Repositório:

- O arquivo de workflow está em `.github/workflows/main.yml`
- A pipeline está configurada para executar em runners Ubuntu com todas as dependências necessárias
- Tempo total estimado: 30-45 minutos (dependendo da carga do GitHub Actions)

## Observações Importantes

- **Testes Mobile na Pipeline**: Executam com emulador Android completo, incluindo configuração de SDK, Appium e geração automática de relatórios
- **Relatórios Allure**: Gerados automaticamente em formato HTML para visualização direta no browser
- **Robustez**: Pipeline com múltiplas camadas de fallback e cleanup para evitar travamentos
- **Artefatos**: Todos os relatórios são preservados por 30 dias como artefatos do GitHub Actions

