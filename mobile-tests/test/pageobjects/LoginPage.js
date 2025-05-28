
class LoginPage {
    get usernameInput() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/nameET"]'); 
    }

    get passwordInput() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/passwordET"]');
    }

    get loginButton() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/loginBtn"]');
    }

    get genericErrorMessage() {
        return $("~generic-error-message");
    }

    async login(username, password) {
        console.log(`Fazendo login com usuário: ${username}`);
        await this.usernameInput.waitForDisplayed({ timeout: 10000 });
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        
        // Esconder teclado se estiver visível
        try {
            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard();
            }
        } catch (error) {
            console.log('Método hideKeyboard não disponível:', error.message);
        }
        
        await this.loginButton.click();
    }

    async getErrorMessageText() {
        await this.genericErrorMessage.waitForDisplayed({ timeout: 5000 });
        return await this.genericErrorMessage.getText();
    }
}

module.exports = new LoginPage();
