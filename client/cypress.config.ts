import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',

    setupNodeEvents(on, config) {},
  },

  env: {
    strapiURL: 'http://localhost:1337/api',
  },
});
