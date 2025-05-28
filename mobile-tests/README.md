# Testes Mobile - My Demo App

Este projeto contém testes automatizados para o aplicativo My Demo App usando WebdriverIO e Appium.

## Pré-requisitos

1. **Node.js** (versão 14 ou superior)
2. **Android SDK** configurado
3. **ADB** no PATH do sistema
4. **Dispositivo Android** conectado ou **Emulador Android** rodando

## Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Verificar dispositivos conectados
```bash
npm run devices
```

### 3. Iniciar o servidor Appium (em um terminal separado)
```bash
npm run appium:start
```

## Executando os Testes

### Rodar todos os testes
```bash
npm test
```

### Rodar com logs detalhados (debug)
```bash
npm run test:debug
```

### Rodar com relatório Allure
```bash
npm run test:allure
```

## Estrutura do Projeto

```
mobile-tests/
├── apps/
│   └── MyDemoApp.apk          # Aplicativo a ser testado
├── test/
│   ├── pageobjects/           # Page Objects
│   │   ├── LoginPage.js
│   │   └── ProductsPage.js
│   └── specs/                 # Casos de teste
│       └── login.spec.js
├── wdio.conf.js              # Configuração do WebdriverIO
└── package.json
```

## Configuração do Dispositivo

O projeto está configurado para detectar automaticamente o dispositivo Android conectado. Se você quiser especificar um dispositivo específico, pode adicionar as seguintes capabilities no `wdio.conf.js`:

```javascript
'appium:deviceName': 'Nome_do_Dispositivo',
'appium:platformVersion': 'Versão_do_Android',
'appium:udid': 'ID_do_Dispositivo'
```

## Troubleshooting

### Erro: "Could not find a connected Android device"
- Verifique se o dispositivo está conectado: `adb devices`
- Certifique-se de que a depuração USB está habilitada
- Reinicie o servidor ADB: `adb kill-server && adb start-server`

### Erro: "Appium server not running"
- Inicie o servidor Appium: `npm run appium:start`
- Verifique se a porta 4723 não está sendo usada por outro processo

### Erro: "App not found"
- Verifique se o arquivo `MyDemoApp.apk` está na pasta `apps/`
- Certifique-se de que o caminho no `wdio.conf.js` está correto

## Relatórios Allure

Este projeto está configurado para gerar relatórios detalhados usando Allure Framework.

### Comandos disponíveis:

- `npm run allure:generate` - Gera o relatório HTML a partir dos resultados
- `npm run allure:open` - Abre o relatório gerado no navegador
- `npm run allure:serve` - Gera e serve o relatório temporariamente
- `npm run test:allure` - Executa os testes e abre o relatório automaticamente

### Estrutura dos relatórios:

- `./reports/allure-results/` - Dados brutos dos testes (JSON)
- `./reports/allure-report/` - Relatório HTML gerado
- `./reports/after-login-screen.png` - Screenshots capturados durante os testes

### Recursos do relatório Allure:

- ✅ Histórico de execuções
- 📊 Gráficos e estatísticas
- 📸 Screenshots automáticos em falhas
- 📝 Steps detalhados de cada teste
- 🏷️ Categorização por features e stories
- ⚠️ Níveis de severidade
- 📋 Logs detalhados

## Utilitários

- `npm run appium:start` - Inicia o servidor Appium
- `npm run devices` - Lista dispositivos Android conectados 