import { env } from "./env/parseEnv";
import dotenv from "dotenv";
dotenv.config({ path: env("COMMON_CONFIG_FILE") });

const common =
  `./src/features/**/*.feature ` +
  `--require-module ts-node/register ` +
  `--require ./src/step-definitions/**/*.ts ` +
  `-f json:${env("JSON_REPORT_FILE")} ` +
  `--format progress-bar`;

const dev = `${common} --tags '@dev'`;
const smoke = `${common} --tags '@smoke'`;
const regression = `${common} --tags '@regression'`;

export { dev, smoke, regression };
