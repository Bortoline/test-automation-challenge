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
        
        await this.fullNameInput.waitForDisplayed({ timeout: 10000 });
        await this.fullNameInput.setValue(addressData.fullName);
        
        await this.address1Input.setValue(addressData.address1);
        await this.address2Input.setValue(addressData.address2);
        await this.cityInput.setValue(addressData.city);
        await this.stateInput.setValue(addressData.state);
        await this.zipInput.setValue(addressData.zip);
        await this.countryInput.setValue(addressData.country);
    }

    async proceedToPayment() {
        console.log('Prosseguindo para pagamento...');
        await this.paymentButton.waitForDisplayed({ timeout: 10000 });
        await this.paymentButton.click();
    }
}

module.exports = new CheckoutPage(); 