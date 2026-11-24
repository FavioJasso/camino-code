import { defineConfig } from "@playwright/test";

const SCENE_SPEC = /scene\.spec\.ts$/;

export default defineConfig({
  testDir: "tests/e2e",
  forbidOnly: !!process.env.CI,
  reporter: "list",
  use: { baseURL: "http://localhost:3100" },
  projects: [
    {
      name: "desktop",
      testIgnore: SCENE_SPEC,
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: "phone",
      testIgnore: SCENE_SPEC,
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      // the live scene needs WebGL 2; SwiftShader gives every machine (and CI) a software GPU
      name: "scene",
      testMatch: SCENE_SPEC,
      use: {
        viewport: { width: 1440, height: 900 },
        launchOptions: { args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] },
      },
    },
  ],
  webServer: {
    command: "npm run build && npm run start -- --port 3100",
    url: "http://localhost:3100",
    env: { BOOKING_TEST_MODE: "sent", BOOKING_SENDS_PER_10_MIN: "1000" },
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
