// mobile-tests/pages/ProductsPage.js
class ProductsPage {
    // Seletores baseados no mapeamento fornecido
    get productsHeader() {
        return $("//android.widget.TextView[@text=\"Products\"]"); 
    }

    get sauceLabsBackpackProduct() {
        return $('//*[@class="android.view.ViewGroup" and ./*[@text="Sauce Labs Backpack"]]');
    }

    get addToCartButton() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/cartBt"]');
    }

    get cartIcon() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/cartIV"]');
    }

    get proceedToCheckoutButton() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/cartBt"]');
    }

    async isProductPageDisplayed() {
        try {
            await this.productsHeader.waitForDisplayed({ timeout: 15000 });
            return await this.productsHeader.isDisplayed();
        } catch (error) {
            console.error("Products header not found or timed out.", error);
            return false;
        }
    }

    async selectSauceLabsBackpack() {
        console.log('Selecionando produto Sauce Labs Backpack...');
        await this.sauceLabsBackpackProduct.waitForDisplayed({ timeout: 10000 });
        await this.sauceLabsBackpackProduct.click();
    }

    async scrollDown() {
        console.log('Rolando a tela para baixo...');
        await driver.execute('mobile: scrollGesture', {
            left: 100, top: 100, width: 200, height: 200,
            direction: 'down',
            percent: 3.0
        });
    }

    async addToCart() {
        console.log('Adicionando produto ao carrinho...');
        await this.addToCartButton.waitForDisplayed({ timeout: 10000 });
        await this.addToCartButton.click();
    }

    async openCart() {
        console.log('Abrindo carrinho...');
        await this.cartIcon.waitForDisplayed({ timeout: 10000 });
        await this.cartIcon.click();
    }

    async proceedToCheckout() {
        console.log('Prosseguindo para checkout...');
        await this.proceedToCheckoutButton.waitForDisplayed({ timeout: 10000 });
        await this.proceedToCheckoutButton.click();
    }
}

module.exports = new ProductsPage();
