// pages/CheckoutPage.js
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = "[data-test=\"firstName\"]";
    this.lastNameInput = "[data-test=\"lastName\"]";
    this.postalCodeInput = "[data-test=\"postalCode\"]";
    this.continueButton = "[data-test=\"continue\"]";
    this.finishButton = "[data-test=\"finish\"]";
    this.completeHeader = "[data-test=\"complete-header\"]";
    this.errorMessage = ".error-message-container";
  }

  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.page.waitForSelector(this.firstNameInput, { state: "visible", timeout: 10000 });
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
  }

  async clickContinue() {
    await this.page.click(this.continueButton);
  }

  async clickFinish() {
    await this.page.waitForSelector(this.finishButton, { state: "visible", timeout: 10000 });
    await this.page.click(this.finishButton);
  }

  async getCompleteMessage() {
    await this.page.waitForSelector(this.completeHeader, { state: "visible", timeout: 10000 });
    return await this.page.textContent(this.completeHeader);
  }

  async isOrderComplete() {
    try {
      await this.page.waitForSelector(this.completeHeader, { state: "visible", timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { CheckoutPage }; 