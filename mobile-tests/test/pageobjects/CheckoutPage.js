class CheckoutPage {
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
        try {
            await driver.execute('mobile: scrollGesture', {
                left: 100, top: 100, width: 200, height: 200,
                direction: 'down',
                percent: 0.75
            });
        } catch (error) {
            console.log('Scroll gesture falhou, usando fallback:', error.message);

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
        
        await this.fullNameInput.waitForDisplayed({ timeout: 15000 });
        await this.fullNameInput.setValue(addressData.fullName);
        console.log('Nome completo preenchido');
        
        await this.scrollDown();
        await driver.pause(1000);
        
        await this.address1Input.waitForDisplayed({ timeout: 10000 });
        await this.address1Input.setValue(addressData.address1);
        console.log('Endereço 1 preenchido');
        
        await this.address2Input.waitForDisplayed({ timeout: 10000 });
        await this.address2Input.setValue(addressData.address2);
        console.log('Endereço 2 preenchido');
        
        await this.scrollDown();
        await driver.pause(1000);
        
        await this.cityInput.waitForDisplayed({ timeout: 10000 });
        await this.cityInput.setValue(addressData.city);
        console.log('Cidade preenchida');
        
        await this.stateInput.waitForDisplayed({ timeout: 10000 });
        await this.stateInput.setValue(addressData.state);
        console.log('Estado preenchido');
        
        await this.scrollDown();
        await driver.pause(1000);
        
        try {
            await this.zipInput.waitForDisplayed({ timeout: 10000 });
            await this.zipInput.setValue(addressData.zip);
            console.log('ZIP preenchido');
        } catch (error) {
            console.log('Tentando scroll adicional para ZIP...', error.message);
            await this.scrollDown();
            await driver.pause(2000);
            
            try {
                await this.zipInput.waitForDisplayed({ timeout: 10000 });
                await this.zipInput.setValue(addressData.zip);
                console.log('ZIP preenchido (segunda tentativa)');
            } catch (retryError) {
                console.error('Falha ao preencher ZIP após tentativas:', retryError.message);
                throw retryError;
            }
        }
        
        await this.countryInput.waitForDisplayed({ timeout: 10000 });
        await this.countryInput.setValue(addressData.country);
        console.log('País preenchido');
        
        console.log('Todos os campos de endereço preenchidos com sucesso');
    }

    async proceedToPayment() {
        console.log('Prosseguindo para pagamento...');
        
        await this.scrollDown();
        await driver.pause(1000);
        
        try {
            await this.paymentButton.waitForDisplayed({ timeout: 15000 });
            await this.paymentButton.click();
            console.log('Botão de pagamento clicado');
        } catch (error) {
            console.log('Tentando scroll adicional para botão de pagamento...', error.message);
            await this.scrollDown();
            await driver.pause(2000);
            
            try {
                await this.paymentButton.waitForDisplayed({ timeout: 10000 });
                await this.paymentButton.click();
                console.log('Botão de pagamento clicado (segunda tentativa)');
            } catch (retryError) {
                console.error('Falha ao clicar no botão de pagamento após tentativas:', retryError.message);
                throw retryError;
            }
        }
    }
}

module.exports = new CheckoutPage(); 