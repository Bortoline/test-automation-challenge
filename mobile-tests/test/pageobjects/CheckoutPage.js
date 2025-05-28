class CheckoutPage {
    // Seletores para preenchimento de endereço
    get fullNameInput() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/fullNameET"]');
    }

    get address1Input() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/address1ET"]');
    }

    get address2Input() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/address2ET"]');
    }

    get cityInput() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/cityET"]');
    }

    get stateInput() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/stateET"]');
    }

    get zipInput() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/zipET"]');
    }

    get countryInput() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/countryET"]');
    }

    get paymentButton() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/paymentBtn"]');
    }

    async scrollDown() {
        // Usar abordagem mais simples e compatível
        try {
            // Tentar scroll usando elemento da tela
            await driver.execute('mobile: scrollGesture', {
                left: 100, top: 100, width: 200, height: 200,
                direction: 'down',
                percent: 0.75
            });
        } catch (error) {
            // Fallback: usar swipe com performActions (mais moderno)
            const { width, height } = await driver.getWindowSize();
            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: width / 2, y: height * 0.8 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 500, x: width / 2, y: height * 0.2 },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);
            await driver.releaseActions();
        }
    }

    async fillAddress(addressData) {
        console.log('Preenchendo dados de endereço...');
        
        // Aguardar primeiro campo aparecer
        await this.fullNameInput.waitForDisplayed({ timeout: 15000 });
        await this.fullNameInput.setValue(addressData.fullName);
        console.log('✓ Nome completo preenchido');
        
        // Scroll para garantir que próximos campos estejam visíveis
        await this.scrollDown();
        await driver.pause(1000);
        
        await this.address1Input.waitForDisplayed({ timeout: 10000 });
        await this.address1Input.setValue(addressData.address1);
        console.log('✓ Endereço 1 preenchido');
        
        await this.address2Input.waitForDisplayed({ timeout: 10000 });
        await this.address2Input.setValue(addressData.address2);
        console.log('✓ Endereço 2 preenchido');
        
        // Scroll novamente para campos inferiores
        await this.scrollDown();
        await driver.pause(1000);
        
        await this.cityInput.waitForDisplayed({ timeout: 10000 });
        await this.cityInput.setValue(addressData.city);
        console.log('✓ Cidade preenchida');
        
        await this.stateInput.waitForDisplayed({ timeout: 10000 });
        await this.stateInput.setValue(addressData.state);
        console.log('✓ Estado preenchido');
        
        // Scroll final para garantir que ZIP e Country estejam visíveis
        await this.scrollDown();
        await driver.pause(1000);
        
        // Tentar múltiplas estratégias para o campo ZIP
        try {
            await this.zipInput.waitForDisplayed({ timeout: 10000 });
            await this.zipInput.setValue(addressData.zip);
            console.log('✓ ZIP preenchido');
        } catch (error) {
            console.log('⚠ Tentando scroll adicional para ZIP...');
            await this.scrollDown();
            await driver.pause(2000);
            
            // Tentar novamente
            await this.zipInput.waitForDisplayed({ timeout: 10000 });
            await this.zipInput.setValue(addressData.zip);
            console.log('✓ ZIP preenchido (segunda tentativa)');
        }
        
        await this.countryInput.waitForDisplayed({ timeout: 10000 });
        await this.countryInput.setValue(addressData.country);
        console.log('✓ País preenchido');
        
        console.log('✅ Todos os campos de endereço preenchidos com sucesso');
    }

    async proceedToPayment() {
        console.log('Prosseguindo para pagamento...');
        
        // Scroll para garantir que o botão esteja visível
        await this.scrollDown();
        await driver.pause(1000);
        
        try {
            await this.paymentButton.waitForDisplayed({ timeout: 15000 });
            await this.paymentButton.click();
            console.log('✓ Botão de pagamento clicado');
        } catch (error) {
            console.log('⚠ Tentando scroll adicional para botão de pagamento...');
            await this.scrollDown();
            await driver.pause(2000);
            
            await this.paymentButton.waitForDisplayed({ timeout: 10000 });
            await this.paymentButton.click();
            console.log('✓ Botão de pagamento clicado (segunda tentativa)');
        }
    }
}

module.exports = new CheckoutPage(); 