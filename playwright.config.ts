import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./__tests__/e2e",
  timeout: 30 * 1000,
  use: {
    baseURL: "http://localhost:3000", // ton app Next.js
    headless: true,
  },
  webServer: {
    command: "npm run dev", // ou "npm run start" pour la prod buildée
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});