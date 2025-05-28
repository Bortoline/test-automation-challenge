# Configuração de Testes Mobile no GitHub Actions

Este documento explica as diferentes abordagens para executar testes mobile com Appium no GitHub Actions.

## Abordagem 1: Android SDK + Emulador (Implementada)

A configuração atual no `main.yml` usa:

### Componentes:
- **Android SDK**: Configurado via `android-actions/setup-android@v3`
- **Java 11**: Necessário para Android SDK
- **KVM**: Habilitado para melhor performance do emulador
- **Android Emulator**: API Level 29, arquitetura x86_64
- **Appium**: Versão mais recente com driver UiAutomator2
- **Cache**: AVD e dependências são cacheadas para acelerar builds

### Vantagens:
- ✅ Controle total sobre versões do Android
- ✅ Cache eficiente do AVD
- ✅ Integração nativa com GitHub Actions
- ✅ Logs detalhados do emulador

### Desvantagens:
- ⚠️ Tempo de setup inicial mais longo
- ⚠️ Requer configuração manual de KVM

## Abordagem 2: Docker Android (Alternativa)

### Container Docker:
```yaml
container:
  image: budtmo/docker-android:emulator_11.0
  options: --privileged -v /dev/bus/usb:/dev/bus/usb
```

### Vantagens:
- ✅ Setup mais rápido
- ✅ Ambiente pré-configurado
- ✅ Múltiplas versões Android disponíveis
- ✅ Isolamento completo

### Desvantagens:
- ⚠️ Menos controle sobre configurações
- ⚠️ Dependência de imagens externas
- ⚠️ Possíveis limitações de performance

## Abordagem 3: Sauce Labs / BrowserStack (Cloud)

### Para ambientes de produção:
```yaml
- name: Run Mobile Tests on Sauce Labs
  env:
    SAUCE_USERNAME: ${{ secrets.SAUCE_USERNAME }}
    SAUCE_ACCESS_KEY: ${{ secrets.SAUCE_ACCESS_KEY }}
  run: cd mobile-tests && npm run test:saucelabs
```

### Vantagens:
- ✅ Dispositivos reais
- ✅ Múltiplas versões Android/iOS
- ✅ Sem overhead de emulador
- ✅ Paralelização nativa

### Desvantagens:
- 💰 Custo adicional
- ⚠️ Dependência de serviço externo

## Como Alternar Entre Abordagens

### Para usar Docker Android:
1. Comente o job `mobile-tests` atual
2. Descomente o job `mobile-tests-docker`
3. Ajuste as configurações conforme necessário

### Para usar Cloud Testing:
1. Configure secrets no GitHub
2. Modifique os scripts de teste para usar cloud providers
3. Atualize as capabilities do WebDriverIO

## Configurações Recomendadas por Ambiente

### Desenvolvimento/CI:
- Use Android SDK + Emulador (atual)
- API Level 29-31 para compatibilidade
- Cache AVD para performance

### Staging:
- Use Docker Android para isolamento
- Múltiplas versões Android em paralelo

### Produção:
- Use Sauce Labs/BrowserStack
- Dispositivos reais
- Testes em paralelo

## Troubleshooting

### Emulador não inicia:
```bash
# Verificar KVM
ls -la /dev/kvm

# Verificar AVD
avdmanager list avd
```

### Appium não conecta:
```bash
# Verificar status do Appium
curl http://localhost:4723/status

# Verificar dispositivos
adb devices
```

### Performance lenta:
- Habilite KVM
- Use cache do AVD
- Reduza animações
- Use GPU hardware acceleration

## Recursos Adicionais

- [Android Emulator Runner](https://github.com/ReactiveCircus/android-emulator-runner)
- [Docker Android](https://github.com/budtmo/docker-android)
- [Appium Documentation](https://appium.io/docs/en/2.0/)
- [WebDriverIO Mobile Testing](https://webdriver.io/docs/mobile-testing/) 