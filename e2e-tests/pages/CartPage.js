class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = "[data-test=\"checkout\"]";
    this.cartItems = ".cart_item";
    this.continueShoppingButton = ".btn_secondary";
  }

  async clickCheckout() {
    await this.page.waitForSelector(this.checkoutButton, { state: "visible", timeout: 10000 });
    await this.page.click(this.checkoutButton);
  }

  async getCartItemsCount() {
    await this.page.waitForSelector(this.cartItems, { state: "visible", timeout: 10000 });
    return await this.page.locator(this.cartItems).count();
  }
}

module.exports = { CartPage }; 