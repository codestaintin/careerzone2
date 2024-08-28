const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportDir: 'cypress/reports/html'
    },
    specPattern: "cypress/e2e/api.spec.js" ,
    baseUrl: "https://jsonplaceholder.typicode.com/",
    watchForFileChanges: true
  },
});
