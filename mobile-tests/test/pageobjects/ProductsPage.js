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

    // Seletores alternativos para o botão Add to Cart
    get addToCartButtonAlt1() {
        return $('//android.widget.Button[contains(@text, "Add")]');
    }

    get addToCartButtonAlt2() {
        return $('//*[contains(@content-desc, "cart") or contains(@content-desc, "Cart")]');
    }

    get cartIcon() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/cartIV"]');
    }

    get proceedToCheckoutButton() {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/cartBt"]');
    }

    async isProductPageDisplayed() {
        try {
            await this.productsHeader.waitForDisplayed({ timeout: 20000 });
            return await this.productsHeader.isDisplayed();
        } catch (error) {
            console.error("Products header not found or timed out.", error);
            return false;
        }
    }

    async selectSauceLabsBackpack() {
        console.log('Selecionando produto Sauce Labs Backpack...');
        await this.sauceLabsBackpackProduct.waitForDisplayed({ timeout: 15000 });
        await this.sauceLabsBackpackProduct.click();
        // Aguardar a tela de detalhes carregar
        await driver.pause(3000);
    }

    async scrollDown() {
        console.log('Rolando a tela para baixo...');
        try {
            await driver.execute('mobile: scrollGesture', {
                left: 100, top: 100, width: 200, height: 200,
                direction: 'down',
                percent: 3.0
            });
        } catch (error) {
            console.log('Tentando scroll alternativo...');
            // Fallback para scroll manual
            await driver.touchAction([
                { action: 'press', x: 200, y: 800 },
                { action: 'moveTo', x: 200, y: 400 },
                { action: 'release' }
            ]);
        }
        await driver.pause(2000);
    }

    async addToCart() {
        console.log('Adicionando produto ao carrinho...');
        
        // Tentar múltiplos seletores para o botão Add to Cart
        const selectors = [
            this.addToCartButton,
            this.addToCartButtonAlt1,
            this.addToCartButtonAlt2
        ];
        
        let buttonFound = false;
        
        for (let i = 0; i < selectors.length; i++) {
            try {
                console.log(`Tentando seletor ${i + 1}...`);
                await selectors[i].waitForDisplayed({ timeout: 8000 });
                await selectors[i].click();
                buttonFound = true;
                console.log(`✓ Botão encontrado com seletor ${i + 1}`);
                break;
            } catch (error) {
                console.log(`Seletor ${i + 1} falhou:`, error.message);
                continue;
            }
        }
        
        if (!buttonFound) {
            // Debug: capturar informações da tela
            console.log('=== DEBUG: Elementos não encontrados ===');
            try {
                const pageSource = await driver.getPageSource();
                console.log('Page source (primeiros 1000 chars):', pageSource.substring(0, 1000));
                
                // Procurar por todos os botões
                const allButtons = await driver.$$('//android.widget.Button');
                console.log(`Encontrados ${allButtons.length} botões na tela:`);
                
                for (let j = 0; j < Math.min(allButtons.length, 5); j++) {
                    try {
                        const text = await allButtons[j].getText();
                        const resourceId = await allButtons[j].getAttribute('resource-id');
                        const isDisplayed = await allButtons[j].isDisplayed();
                        console.log(`- Botão ${j}: text="${text}", resource-id="${resourceId}", displayed=${isDisplayed}`);
                    } catch (e) {
                        console.log(`- Botão ${j}: erro ao acessar`);
                    }
                }
            } catch (debugError) {
                console.log('Erro no debug:', debugError.message);
            }
            
            throw new Error('Nenhum botão Add to Cart encontrado com os seletores disponíveis');
        }
        
        await driver.pause(2000);
    }

    async openCart() {
        console.log('Abrindo carrinho...');
        await this.cartIcon.waitForDisplayed({ timeout: 15000 });
        await this.cartIcon.click();
        await driver.pause(2000);
    }

    async proceedToCheckout() {
        console.log('Prosseguindo para checkout...');
        await this.proceedToCheckoutButton.waitForDisplayed({ timeout: 15000 });
        await this.proceedToCheckoutButton.click();
        await driver.pause(2000);
    }
}

module.exports = new ProductsPage();
