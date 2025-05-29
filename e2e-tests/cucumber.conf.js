const { Before, After, setDefaultTimeout, BeforeAll, AfterAll } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

// Aumenta o timeout padrão para 60 segundos (60000 ms)
setDefaultTimeout(60 * 1000);

let browser;
let context;

// Hooks para inicializar e finalizar o browser/página
BeforeAll(async () => {
  // O browser pode ser inicializado aqui se for compartilhado entre features,
  // mas para isolamento, é melhor fazer no Before.
});

Before(async function () {
  // Lança o browser e cria um novo contexto/página para cada cenário
  browser = await chromium.launch({ headless: true }); // Use headless: false para debug visual
  context = await browser.newContext();
  this.page = await context.newPage();
});

After(async function () {
  if (this.page) {
    await this.page.close();
  }
  if (context) {
    await context.close();
  }
  if (browser) {
     await browser.close();
  }
});

AfterAll(async () => {
  if (browser?.isConnected()) {
     await browser.close();
  }
});
