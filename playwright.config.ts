import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',

      use: {
        browserName: 'chromium',
        headless: false,
      },
    },
  ],
});