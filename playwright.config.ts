import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: process.env.BASE_URL,
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