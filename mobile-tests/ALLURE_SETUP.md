# Configuração do Allure Reporter

## O que foi implementado

### 1. Instalação das dependências
```bash
npm install --save-dev @wdio/allure-reporter allure-commandline
```

### 2. Configuração no wdio.conf.js
- Adicionado o Allure reporter na configuração
- Configurado para salvar resultados em `./reports/allure-results`
- Screenshots automáticos habilitados

### 3. Scripts no package.json
Novos scripts adicionados:
- `allure:generate` - Gera o relatório HTML
- `allure:open` - Abre o relatório no navegador
- `allure:serve` - Serve o relatório diretamente dos resultados
- `test:allure` - Executa testes e abre o relatório

### 4. Organização de arquivos
- Screenshots agora são salvos em `./reports/` em vez da raiz
- Relatórios organizados em `./reports/allure-results/` e `./reports/allure-report/`

## Como usar

### Executar testes e gerar relatório
```bash
npm run test:allure
```

### Apenas gerar relatório (após executar testes)
```bash
npm run allure:generate
npm run allure:open
```

### Servir relatório diretamente
```bash
npm run allure:serve
```

## Funcionalidades do Allure

✅ **Relatórios visuais**: Interface web moderna e interativa
✅ **Screenshots**: Capturas automáticas em pontos específicos
✅ **Histórico**: Acompanhamento de execuções anteriores
✅ **Categorização**: Organização por features e stories
✅ **Timeline**: Visualização temporal da execução
✅ **Anexos**: Screenshots e logs anexados aos testes
✅ **Estatísticas**: Métricas detalhadas de execução

## Estrutura de arquivos

```
mobile-tests/
├── reports/
│   ├── allure-results/          # Dados brutos dos testes
│   ├── allure-report/           # Relatório HTML gerado
│   └── after-login-screen.png   # Screenshots dos testes
├── wdio.conf.js                 # Configuração do Allure
└── package.json                 # Scripts do Allure
```

## Próximos passos

Para melhorar ainda mais os relatórios, você pode:

1. **Adicionar anotações nos testes**:
   ```javascript
   await allure.addFeature('E-commerce');
   await allure.addStory('Fluxo de Compra');
   await allure.addSeverity('critical');
   ```

2. **Organizar em steps**:
   ```javascript
   await allure.addStep('Fazer login', async () => {
       // código do step
   });
   ```

3. **Anexar evidências**:
   ```javascript
   await allure.addAttachment('Screenshot', screenshot, 'image/png');
   ```

O Allure está agora totalmente configurado e funcionando! 🎉 