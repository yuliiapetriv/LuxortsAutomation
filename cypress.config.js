const { defineConfig } = require("cypress");

module.exports = defineConfig({
    env: {
        backend_url:
            "http://luxorts-backend-staging-1718099474.us-east-2.elb.amazonaws.com/",
        api_server: "api/v1/",
    },
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    firstRun: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        experimentalSessionAndOrigin: true,
        setupNodeEvents(on, config) {
            return require("./cypress/plugins/index.js")(on, config);
        },
        baseUrl:
            "http://luxorts-frontend-staging-1986524029.us-east-2.elb.amazonaws.com/",
        excludeSpecPattern: [
            "**/1-getting-started/*",
            "**/2-advanced-examples/*",
        ],
    },
});
