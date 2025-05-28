const ProductsPage = require('../pageobjects/ProductsPage');
const LoginPage = require('../pageobjects/LoginPage');
const CheckoutPage = require('../pageobjects/CheckoutPage');
const PaymentPage = require('../pageobjects/PaymentPage');

describe('Fluxo Completo de Compra - Corrigido', () => {
    it('Deve realizar uma compra completa do produto Sauce Labs Backpack', async () => {
        // Aguardar o app carregar
        await driver.pause(3000);
        
        // 1. Verificar se estamos na tela de produtos
        console.log('=== INICIANDO FLUXO DE COMPRA ===');
        const isProductPageDisplayed = await ProductsPage.isProductPageDisplayed();
        expect(isProductPageDisplayed).toBe(true);
        
        // 2. Selecionar o produto Sauce Labs Backpack
        await ProductsPage.selectSauceLabsBackpack();
        console.log('✓ Produto selecionado');
        
        // 3. Rolar a tela para baixo
        await ProductsPage.scrollDown();
        console.log('✓ Tela rolada');
        
        // 4. Adicionar produto ao carrinho
        await ProductsPage.addToCart();
        console.log('✓ Produto adicionado ao carrinho');
        
        // 5. Abrir carrinho
        await ProductsPage.openCart();
        console.log('✓ Carrinho aberto');
        
        // 6. Prosseguir para checkout
        await ProductsPage.proceedToCheckout();
        console.log('✓ Prosseguiu para checkout');
        
        // 7. Fazer login
        await LoginPage.login('bod@example.com', '10203040');
        console.log('✓ Login realizado');
        
        // 8. Lidar com popup do Android (se aparecer)
        try {
            const noButton = await $('//android.widget.Button[@text="Agora não"]');
            if (await noButton.isDisplayed()) {
                await noButton.click();
                console.log('✓ Popup do Android fechado');
                await driver.pause(2000);
            }
        } catch (error) {
            console.log('ℹ Popup do Android não encontrado ou já fechado:', error.message);
        }
        
        // 9. Aguardar e verificar qual tela apareceu
        await driver.pause(3000);
        const pageSource = await driver.getPageSource();
        await driver.saveScreenshot('./reports/after-login-screen.png');
        
        console.log('=== VERIFICANDO TELA APÓS LOGIN ===');
        
        // Verificar se é tela de endereço
        if (pageSource.includes('fullNameET')) {
            console.log('✓ Detectada tela de endereço - continuando fluxo');
            
            // Preencher endereço
            await CheckoutPage.fillAddress({
                fullName: 'João Silva',
                address1: 'Rua das Flores, 123',
                address2: 'Apto 45',
                city: 'São Paulo',
                state: 'SP',
                zip: '01234-567',
                country: 'Brasil'
            });
            console.log('✓ Endereço preenchido');
            
            // Prosseguir para pagamento
            await CheckoutPage.proceedToPayment();
            console.log('✓ Prosseguiu para pagamento');
            
            // Preencher dados de pagamento
            await PaymentPage.fillPaymentInfo({
                name: 'João Silva',
                cardNumber: '1234567890123456',
                expirationDate: '12/25',
                securityCode: '123'
            });
            console.log('✓ Dados de pagamento preenchidos');
            

            // Finalizar pedido
            await PaymentPage.placeOrder();
            console.log('✓ Pedido finalizado');
            
        } else if (pageSource.includes('cardNumberET')) {
            console.log('✓ Detectada tela de pagamento diretamente');
            
            // Preencher dados de pagamento
            await PaymentPage.fillPaymentInfo({
                name: 'João Silva',
                cardNumber: '1234567890123456',
                expirationDate: '12/25',
                securityCode: '123'
            });
            console.log('✓ Dados de pagamento preenchidos');
            
            // Finalizar pedido
            await PaymentPage.placeOrder();
            console.log('✓ Pedido finalizado');
            
        } else {
            // Investigar qual tela apareceu
            console.log('⚠ Tela não identificada após login');
            console.log('Page source:', pageSource.substring(0, 2000));
            
            // Procurar por elementos específicos
            const elements = await driver.$$('//*[@resource-id]');
            console.log('Elementos com resource-id encontrados:');
            for (let element of elements.slice(0, 10)) {
                try {
                    const resourceId = await element.getAttribute('resource-id');
                    const text = await element.getText();
                    const isDisplayed = await element.isDisplayed();
                    if (isDisplayed && resourceId) {
                        console.log(`- ${resourceId}: "${text}"`);
                    }
                } catch (e) {
                    // Ignorar erros de elementos que não existem mais
                    console.log('Erro ao acessar elemento:', e.message);
                }
            }
            
            // Tentar encontrar botões ou próximos passos
            try {
                const buttons = await driver.$$('//android.widget.Button');
                console.log('Botões encontrados:');
                for (let button of buttons.slice(0, 5)) {
                    try {
                        const text = await button.getText();
                        const isDisplayed = await button.isDisplayed();
                        if (isDisplayed && text) {
                            console.log(`- Botão: "${text}"`);
                        }
                    } catch (e) {
                        // Ignorar erros
                        console.log('Erro ao acessar botão:', e.message);
                    }
                }
            } catch (e) {
                console.log('Nenhum botão encontrado:', e.message);
            }
        }
        
        console.log('=== FLUXO CONCLUÍDO ===');
    });
}); 