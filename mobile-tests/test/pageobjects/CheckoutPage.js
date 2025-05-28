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

    async fillAddress(addressData) {
        console.log('Preenchendo dados de endereço...');
        
        // Aguardar primeiro campo aparecer
        await this.fullNameInput.waitForDisplayed({ timeout: 15000 });
        await this.fullNameInput.setValue(addressData.fullName);
        console.log('✓ Nome completo preenchido');
        
        // Scroll para garantir que próximos campos estejam visíveis
        await driver.execute('mobile: scroll', { direction: 'down' });
        await driver.pause(1000);
        
        await this.address1Input.waitForDisplayed({ timeout: 10000 });
        await this.address1Input.setValue(addressData.address1);
        console.log('✓ Endereço 1 preenchido');
        
        await this.address2Input.waitForDisplayed({ timeout: 10000 });
        await this.address2Input.setValue(addressData.address2);
        console.log('✓ Endereço 2 preenchido');
        
        // Scroll novamente para campos inferiores
        await driver.execute('mobile: scroll', { direction: 'down' });
        await driver.pause(1000);
        
        await this.cityInput.waitForDisplayed({ timeout: 10000 });
        await this.cityInput.setValue(addressData.city);
        console.log('✓ Cidade preenchida');
        
        await this.stateInput.waitForDisplayed({ timeout: 10000 });
        await this.stateInput.setValue(addressData.state);
        console.log('✓ Estado preenchido');
        
        // Scroll final para garantir que ZIP e Country estejam visíveis
        await driver.execute('mobile: scroll', { direction: 'down' });
        await driver.pause(1000);
        
        // Tentar múltiplas estratégias para o campo ZIP
        try {
            await this.zipInput.waitForDisplayed({ timeout: 10000 });
            await this.zipInput.setValue(addressData.zip);
            console.log('✓ ZIP preenchido');
        } catch (error) {
            console.log('⚠ Tentando scroll adicional para ZIP...');
            await driver.execute('mobile: scroll', { direction: 'down' });
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
        await driver.execute('mobile: scroll', { direction: 'down' });
        await driver.pause(1000);
        
        try {
            await this.paymentButton.waitForDisplayed({ timeout: 15000 });
            await this.paymentButton.click();
            console.log('✓ Botão de pagamento clicado');
        } catch (error) {
            console.log('⚠ Tentando scroll adicional para botão de pagamento...');
            await driver.execute('mobile: scroll', { direction: 'down' });
            await driver.pause(2000);
            
            await this.paymentButton.waitForDisplayed({ timeout: 10000 });
            await this.paymentButton.click();
            console.log('✓ Botão de pagamento clicado (segunda tentativa)');
        }
    }
}

module.exports = new CheckoutPage(); 