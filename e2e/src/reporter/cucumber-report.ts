import { generate } from "multiple-cucumber-html-reporter";
import { env } from "../env/parseEnv";
import dotenv from "dotenv";

dotenv.config({ path: env("COMMON_CONFIG_FILE") });

console.log(
  "DEBUG: Generating report using multiple-cucumber-html-reporter...",
);

generate({
  jsonDir: "./reports/",
  reportPath: "./reports/html/",
  metadata: {
    browser: {
      name: "chrome",
      version: "133",
    },
    device: "Local test machine",
    platform: {
      name: "windows",
      version: "11",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "E2E Testing Framework" },
      { label: "Release", value: "1.0.0" },
      { label: "Cycle", value: "B11221.34321" },
    ],
  },
});
