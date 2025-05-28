// pages/InventoryPage.js
class InventoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = "[data-test=\"title\"]";
    this.inventoryContainer = "#inventory_container .inventory_list"; 
    this.sortDropdown = ".product_sort_container";
    this.inventoryItems = ".inventory_item";
    this.itemPrice = ".inventory_item_price";
    this.addToCartButton = ".btn_inventory";
    this.shoppingCartLink = "#shopping_cart_container a";
    this.addOnesieButton = "[data-test=\"add-to-cart-sauce-labs-onesie\"]";
    this.shoppingCartLinkDataTest = "[data-test=\"shopping-cart-link\"]";
  }

  async getPageTitle() {
    await this.page.waitForSelector(this.pageTitle, { state: "visible", timeout: 10000 });
    return await this.page.textContent(this.pageTitle);
  }

  async sortProducts(optionText) {
    await this.page.waitForSelector(this.inventoryContainer, { state: "visible", timeout: 15000 });
    await this.page.waitForSelector(this.sortDropdown, { state: "visible", timeout: 15000 });
    await this.page.selectOption(this.sortDropdown, { label: optionText });
    await this.page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => console.log("Network idle wait timed out, continuing..."));

  }

  async getFirstItemPrice() {
    await this.page.waitForSelector(this.inventoryItems, { state: "visible", timeout: 10000 });
    const firstItem = await this.page.locator(this.inventoryItems).first();
    const priceText = await firstItem.locator(this.itemPrice).textContent();
    return parseFloat(priceText.replace("$", ""));
  }

  async addProductToCart(productName) {
    await this.page.waitForSelector(this.inventoryItems, { state: "visible", timeout: 10000 });
    const productElement = await this.page.locator(this.inventoryItems).filter({ hasText: productName });
    await productElement.locator(this.addToCartButton).click();
  }

  async addSauceLabsBackpackToCart() {
    await this.page.waitForSelector(this.addOnesieButton, { state: "visible", timeout: 10000 });
    await this.page.click(this.addOnesieButton);
  }

  async goToShoppingCart() {
    await this.page.click(this.shoppingCartLink);
  }

  async goToShoppingCartByDataTest() {
    await this.page.waitForSelector(this.shoppingCartLinkDataTest, { state: "visible", timeout: 10000 });
    await this.page.click(this.shoppingCartLinkDataTest);
  }
}

module.exports = { InventoryPage };
