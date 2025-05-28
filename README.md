# Desafio de Automação de Testes

## Descrição do Projeto

Este projeto contém a solução **atualizada** para o desafio de automação de testes, abrangendo testes de carga (K6), API (Playwright), E2E (Playwright + Cucumber para **Sauce Demo**) e mobile (Appium + WebDriverIO para **My Demo App**), além da configuração de uma pipeline CI/CD.

## Arquitetura e Estrutura de Pastas

O projeto está organizado da seguinte forma:

```
/test-automation-challenge
├── api-tests/             # Testes de API com Playwright (API pública)
│   ├── node_modules/      # (Excluído do ZIP)
│   ├── playwright-report/ # Relatório HTML Playwright
│   ├── tests/             # Scripts de teste de API (specs)
│   ├── package.json
│   ├── package-lock.json
│   └── playwright.config.js
├── e2e-tests/             # Testes E2E com Playwright e Cucumber (Sauce Demo)
│   ├── features/          # Arquivos .feature (login_saucedemo.feature)
│   ├── node_modules/      # (Excluído do ZIP)
│   ├── pages/             # Page Objects (LoginPage, InventoryPage)
│   ├── reports/           # Relatórios (configurar output se necessário)
│   ├── step_definitions/  # Implementação dos steps (saucedemo_steps.js)
│   ├── support/           # Arquivos de suporte (hooks, reporter config)
│   ├── cucumber.conf.js   # Configuração dos hooks do Cucumber
│   ├── package.json
│   └── package-lock.json
├── k6-tests/              # Testes de Carga com K6 (API pública)
│   ├── load-test.js       # Script K6 completo (500 VUs, 5 min)
│   ├── load-test-short.js # Script K6 reduzido (demonstração)
│   ├── summary.html       # Exemplo de relatório HTML (gerado via handleSummary)
│   └── summary.json       # Exemplo de relatório JSON (gerado via handleSummary)
├── mobile-tests/          # Testes Mobile com Appium e WebDriverIO (My Demo App)
│   ├── apps/              # APK do My Demo App
│   │   └── MyDemoApp.apk
│   ├── config/            # Configuração do WebDriverIO (wdio.conf.js)
│   ├── node_modules/      # (Excluído do ZIP)
│   ├── pages/             # Page Objects (LoginPage, ProductsPage)
│   ├── reports/           # Relatórios (Allure configurado)
│   ├── specs/             # Scripts de teste mobile (login.spec.js)
│   ├── package.json
│   └── package-lock.json
├── pipeline/              # Configuração da Pipeline CI/CD (GitHub Actions)
│   └── .github/
│       └── workflows/
│           └── main.yml   # Workflow do GitHub Actions atualizado
├── reports/               # Pasta agregadora de relatórios (gerados na execução)
│   ├── k6/
│   │   ├── results.json         # Relatório JSON da execução K6
│   │   └── analise-resultados.md # Análise manual
│   ├── playwright-api/      # Relatório Playwright API (gerado na execução)
│   └── cucumber/            # Relatório Cucumber E2E (gerado na execução)
├── README.md              # Este arquivo
└── todo.md                # Checklist de progresso
```

## Versões Utilizadas (Principais)

- **Node.js**: v20.18.0
- **npm**: (Versão correspondente ao Node.js v20)
- **K6**: Instalado via repositório (versão estável no momento da execução)
- **Playwright**: v1.40.0 (@playwright/test)
- **Cucumber**: v10.0.1 (@cucumber/cucumber)
- **WebDriverIO**: v8.x.x (Conforme dependências instaladas)
- **Appium**: v2.x.x (Conforme dependências instaladas via `@wdio/appium-service`)

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
     k6 run --out json=../reports/k6/results.json load-test-short.js
     ```
   - O relatório JSON será salvo em `reports/k6/results.json`.
   - A análise manual dos resultados está em `reports/k6/analise-resultados.md`.

**2. Testes de API (Playwright):**

   - Navegue até a pasta `api-tests`.
   - Execute os testes:
     ```bash
     npx playwright test
     ```
   - O relatório HTML será gerado em `api-tests/playwright-report/index.html`.
   - Para visualizar o relatório:
     ```bash
     npx playwright show-report api-tests/playwright-report
     ```

**3. Testes E2E (Playwright + Cucumber - Sauce Demo):**

   - Navegue até a pasta `e2e-tests`.
   - Execute os testes:
     ```bash
     npm test
     ```
   - **Nota:** O cenário de ordenação de produtos (`features/login_saucedemo.feature`) apresentou instabilidade e falha por timeout neste ambiente, mesmo após tentativas de ajuste. Os demais cenários (login válido e inválido) passaram.
   - A geração de relatórios HTML/JSON via Cucumber pode requerer configuração adicional do runner ou de pacotes como `cucumber-html-reporter`.

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
     - Os relatórios (configurados para Allure) serão gerados em `mobile-tests/reports/allure-results`. Para visualizar:
       ```bash
       npm install -g allure-commandline --save-dev
       allure generate mobile-tests/reports/allure-results --clean
       allure open
       ```

**5. Pipeline CI/CD (GitHub Actions):**

   - O arquivo de workflow atualizado está em `pipeline/.github/workflows/main.yml`.
   - A pipeline será acionada automaticamente em eventos de `push` ou `pull_request` para a branch `main` no repositório GitHub.
   - Os relatórios de cada job (K6, API, E2E) serão carregados como artefatos da execução da pipeline (verificar configuração de path dos relatórios E2E e API).
   - O job de testes mobile está configurado como um placeholder devido à impossibilidade de executar em um runner padrão do GitHub Actions sem configuração específica.

## Limitações Conhecidas

- **Testes E2E (Ordenação):** O cenário de ordenação de produtos no Sauce Demo apresentou instabilidade e falhas por timeout neste ambiente, mesmo após ajustes. Pode requerer investigação adicional em um ambiente diferente ou com outras estratégias de espera/interação.
- **Execução de Testes Mobile:** A execução prática dos testes mobile não foi realizada neste ambiente devido à falta do Android SDK e configuração completa do Appium/emulador. Os scripts foram reimplementados para o `My Demo App`, mas a validação funcional requer um ambiente local adequado.
- **Geração de Relatórios E2E:** A configuração padrão do Cucumber pode não gerar relatórios HTML/JSON automaticamente. Pode ser necessário adicionar formatters na linha de comando do `npm test` ou usar pacotes específicos como `cucumber-html-reporter`.

