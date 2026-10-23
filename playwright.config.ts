
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const targetEnv = process.env.TARGET_ENV;

const baseURLByEnvironment: Record<string, string | undefined> = {
  QA: process.env.QA_BASE_URL,
  Staging: process.env.STAGING_BASE_URL,
  UAT: process.env.UAT_BASE_URL,
};

if (!targetEnv || !(targetEnv in baseURLByEnvironment)) {
  throw new Error('TARGET_ENV must be QA, Staging, or UAT.');
}

// CI must use the BASE_URL selected by GitHub Actions.
// Locally, BASE_URL can override the environment-specific .env setting.
const baseURL = process.env.CI
  ? process.env.BASE_URL
  : process.env.BASE_URL ?? baseURLByEnvironment[targetEnv];

if (!baseURL) {
  throw new Error(
    process.env.CI
      ? `BASE_URL must be provided by CI for ${targetEnv}.`
      : `Missing URL configuration for ${targetEnv}.`,
  );
}

let parsedURL: URL;

try {
  parsedURL = new URL(baseURL);
} catch {
  throw new Error(`Invalid URL configured for ${targetEnv}.`);
}

if (parsedURL.protocol !== 'https:') {
  throw new Error(`${targetEnv} must use an HTTPS URL.`);
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
  ],

  outputDir: 'test-results/',

  use: {
    // Use the validated URL; never silently fall back to the demo site.
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
