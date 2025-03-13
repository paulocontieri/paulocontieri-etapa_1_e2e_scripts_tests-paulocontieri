const { defineConfig } = require("cypress");
const fs = require("fs");
const pdf = require("pdf-parse");
const https = require("https");
const mochawesome = require("cypress-mochawesome-reporter");

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 15000,

    setupNodeEvents(on, config) {
      // Mochawesome reporter
      require("cypress-mochawesome-reporter/plugin")(on);

      // Tasks personalizadas
      on("task", {
        // Task parsePdf
        parsePdf({ filePath }) {
          if (!fs.existsSync(filePath)) {
            throw new Error(`O arquivo ${filePath} não foi encontrado.`);
          }
          const dataBuffer = fs.readFileSync(filePath);
          return pdf(dataBuffer).then((data) => data.text);
        },

        // Task enviarParaDiscord
        enviarParaDiscord(message) {
          return new Promise((resolve, reject) => {
            const postData = JSON.stringify({ content: message });

            const options = {
              hostname: 'discord.com',
              path: '/api/webhooks/1349386806159740958/fboPbiDzX6TE3Z5MPBwO-pFcl8zju2pIlq7nxD7AgEN0wXOpmg7jGUKZkYf8TfAfRwds',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
              }
            };

            const req = https.request(options, res => {
              let responseBody = '';

              res.on('data', chunk => {
                responseBody += chunk;
              });

              res.on('end', () => {
                resolve({ statusCode: res.statusCode, body: responseBody });
              });
            });

            req.on('error', error => {
              console.error('Erro ao enviar para o Discord:', error);
              reject(error);
            });

            req.write(postData);
            req.end();
          });
        }
      });

      return config;
    }
  },

  reporter: mochawesome,
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: true,
    json: true,
    autoMerge: false,
    saveAllAttempts: false
  }
});
