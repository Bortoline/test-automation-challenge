const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test"); // Import expect from Playwright
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutPage } = require("../pages/CheckoutPage");

let loginPage;
let inventoryPage;
let cartPage;
let checkoutPage;

Given("que estou na página de login do Sauce Demo", async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When("preencho o campo de usuário com {string}", async function (username) {
  await loginPage.fillUsername(username);
});

When("preencho o campo de senha com {string}", async function (password) {
  await loginPage.fillPassword(password);
});

When("clico no botão de login", async function () {
  await loginPage.clickLogin();
});

Then("devo ser redirecionado para a página de inventário", async function () {
  await this.page.waitForURL("**/inventory.html");
  inventoryPage = new InventoryPage(this.page);
});

Then("devo ver o título {string}", async function (expectedTitle) {
  const actualTitle = await inventoryPage.getPageTitle();
  expect(actualTitle).toBe(expectedTitle);
});

Then("devo ver a mensagem de erro {string}", async function (expectedError) {
  const actualError = await loginPage.getErrorMessage();
  expect(actualError).toContain(expectedError); 
});

Given("que estou logado no Sauce Demo com {string}", async function (username) {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  await loginPage.fillUsername(username);
  await loginPage.fillPassword("secret_sauce");
  await loginPage.clickLogin();
  await this.page.waitForURL("**/inventory.html");
  inventoryPage = new InventoryPage(this.page);
});

When("ordeno os produtos por {string}", async function (sortOption) {
  await inventoryPage.sortProducts(sortOption);
});

Then("o primeiro produto listado deve ter o menor preço", async function () {
  const itemPrices = await this.page.locator(inventoryPage.itemPrice).allTextContents();
  const numericPrices = itemPrices.map(price => parseFloat(price.replace("$", "")));
  
  let isSorted = true;
  for (let i = 0; i < numericPrices.length - 1; i++) {
    if (numericPrices[i] > numericPrices[i + 1]) {
      isSorted = false;
      break;
    }
  }
  expect(isSorted).toBe(true);
});

When("adiciono o produto {string} ao carrinho", async function (productName) {
  if (productName === "Sauce Labs Backpack") {
    await inventoryPage.addSauceLabsBackpackToCart();
  } else {
    await inventoryPage.addProductToCart(productName);
  }
});

When("clico no carrinho de compras", async function () {
  await inventoryPage.goToShoppingCartByDataTest();
  cartPage = new CartPage(this.page);
});

When("clico no botão de checkout", async function () {
  await cartPage.clickCheckout();
  checkoutPage = new CheckoutPage(this.page);
});

When("preencho os dados de checkout com nome {string}, sobrenome {string} e CEP {string}", async function (firstName, lastName, postalCode) {
  await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
});

When("clico no botão continuar", async function () {
  await checkoutPage.clickContinue();
});

When("clico no botão finalizar", async function () {
  await checkoutPage.clickFinish();
});

Then("devo ver a mensagem de confirmação {string}", async function (expectedMessage) {
  const actualMessage = await checkoutPage.getCompleteMessage();
  expect(actualMessage).toBe(expectedMessage);
});
