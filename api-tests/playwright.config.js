// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  reporter: [
    ['html', { outputFolder: '../reports/playwright-api' }],
    ['json', { outputFile: '../reports/playwright-api/results.json' }]
  ],
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
      'Accept': 'application/json'
    },
  },
  projects: [
    {
      name: 'API Tests',
      testMatch: /.*\.spec\.js/
    }
  ]
});
