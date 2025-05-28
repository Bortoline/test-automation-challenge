class PaymentPage {
    // Seletores para preenchimento de dados de pagamento
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

    async fillPaymentInfo(paymentData) {
        console.log('Preenchendo dados de pagamento...');
        
        await this.nameInput.waitForDisplayed({ timeout: 10000 });
        await this.nameInput.setValue(paymentData.name);
        
        await this.cardNumberInput.setValue(paymentData.cardNumber);
        await this.expirationDateInput.setValue(paymentData.expirationDate);
        await this.securityCodeInput.setValue(paymentData.securityCode);
    }

    async placeOrder() {
        console.log('Finalizando pedido...');
        await this.paymentButton.waitForDisplayed({ timeout: 10000 });
        await this.paymentButton.click();
    }
}

module.exports = new PaymentPage(); 