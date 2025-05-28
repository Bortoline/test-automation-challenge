class PaymentPage {
    get nameInput() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/nameET"]');
    }

    get cardNumberInput() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/cardNumberET"]');
    }

    get expirationDateInput() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/expirationDateET"]');
    }

    get securityCodeInput() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/securityCodeET"]');
    }

    get paymentButton() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/paymentBtn"]');
    }

    async scrollDown() {
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

    async fillPaymentInfo(paymentData) {
        console.log('Preenchendo dados de pagamento...');
        
        // Nome do cartão
        await this.nameInput.waitForDisplayed({ timeout: 15000 });
        await this.nameInput.setValue(paymentData.name);
        console.log('Nome do cartão preenchido');
        
        // Número do cartão
        await this.cardNumberInput.waitForDisplayed({ timeout: 10000 });
        await this.cardNumberInput.setValue(paymentData.cardNumber);
        console.log('Número do cartão preenchido');
        
        // Data de expiração
        await this.expirationDateInput.waitForDisplayed({ timeout: 10000 });
        await this.expirationDateInput.setValue(paymentData.expirationDate);
        console.log('Data de expiração preenchida');
        
        // Tentar código de segurança primeiro sem scroll
        console.log('Tentando encontrar código de segurança...');
        try {
            await this.securityCodeInput.waitForDisplayed({ timeout: 5000 });
            await this.securityCodeInput.setValue(paymentData.securityCode);
            console.log('Código de segurança preenchido (sem scroll)');
        } catch (error) {
            console.log('Campo não visível, fazendo scroll...', error.message);
            
            // Scroll para garantir que o campo de código de segurança esteja visível
            try {
                await this.scrollDown();
                await driver.pause(500);
                console.log('Scroll realizado');
            } catch (scrollError) {
                console.log('Erro no scroll, tentando continuar...', scrollError.message);
            }
            
            try {
                // Tentar novamente após scroll
                await this.securityCodeInput.waitForDisplayed({ timeout: 15000 });
                await this.securityCodeInput.setValue(paymentData.securityCode);
                console.log('Código de segurança preenchido (após scroll)');
            } catch (retryError) {
                console.error('Falha ao preencher código de segurança após tentativas:', retryError.message);
                throw retryError;
            }
        }
        
        console.log('✅ Todos os dados de pagamento preenchidos');
    }

    async placeOrder() {
        console.log('Finalizando pedido...');
        
        // Tentar clicar no botão primeiro sem scroll
        try {
            await this.paymentButton.waitForDisplayed({ timeout: 5000 });
            await this.paymentButton.click();
            console.log('Pedido finalizado com sucesso (sem scroll)!');
        } catch (error) {
            console.log('Botão não visível, fazendo scroll...', error.message);
            
            // Scroll para garantir que o botão esteja visível
            try {
                await this.scrollDown();
                await driver.pause(500);
                console.log('Scroll realizado para botão');
            } catch (scrollError) {
                console.log('Erro no scroll, tentando continuar...', scrollError.message);
            }
            
            try {
                await this.paymentButton.waitForDisplayed({ timeout: 15000 });
                await this.paymentButton.click();
                console.log('Pedido finalizado (após scroll)!');
            } catch (retryError) {
                console.error('Falha ao finalizar pedido após tentativas:', retryError.message);
                throw retryError;
            }
        }
    }
}

module.exports = new PaymentPage(); 