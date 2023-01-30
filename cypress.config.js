const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
    baseUrl: "http://restapi.adequateshop.com/api",
    env: {
      "username": "DevOps55@gmail.com",
      "password": 123456
    },
    "reporter": "mochawesome",
    "reporterOptions": {
      "reporterDir": "mochawesome-report",
      "quiet": true,
      "overwrite": false,
      "html": false,
      "json": true
    }

  }
});
