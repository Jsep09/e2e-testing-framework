import { GlobalConfig, Hostconfig, PageConfig } from "./env/global";
import { env, getJsonFromFile } from "./env/parseEnv";
import dotenv from "dotenv";
dotenv.config({ path: env("COMMON_CONFIG_FILE") });

const hostsConfig: Hostconfig = getJsonFromFile(env("HOSTS_URL_PATH"));

console.log("🚀 ~ hostsConfig:", hostsConfig);

const pagesConfig: PageConfig = getJsonFromFile(env("PAGES_URL_PATH"));

console.log("🚀 ~ pagesConfig:", pagesConfig);

const worldParameters: GlobalConfig = {
  hostsConfig,
  pagesConfig,
};
const common =
  `./src/features/**/*.feature ` +
  `--require-module ts-node/register ` +
  `--require ./src/step-definitions/**/*.ts ` +
  `--world-parameters ${JSON.stringify(worldParameters)} ` +
  `-f json:${env("JSON_REPORT_FILE")} ` +
  `--format progress-bar`;

const dev = `${common} --tags '@dev'`;
const smoke = `${common} --tags '@smoke'`;
const regression = `${common} --tags '@regression'`;

export { dev, smoke, regression };
