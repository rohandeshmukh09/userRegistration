const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env = {
        email: process.env.EMAIL,
        password: process.env.PASSWORD
      }
      /*config.env = config.env || {}
      config.env.email = process.env.EMAIL
      //console.log(process.env.EMAIL)*/
      return config

    },
    baseUrl: "http://restapi.adequateshop.com/api",
    //env: {
    //"username": "DevOps55@gmail.com",
    //"password": 123456
    //},
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
