import { defineConfig } from 'cypress'

import cypress from './cypress/plugins'

export default defineConfig({
  viewportHeight: 900,
  viewportWidth: 1440,
  defaultCommandTimeout: 10000,
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return cypress(on, config)
    },
    baseUrl: 'http://localhost:8000/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  }
})
