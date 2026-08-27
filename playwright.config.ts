import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import {env} from './config/env';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: env.baseUrl,
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