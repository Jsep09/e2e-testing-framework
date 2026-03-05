import {
  GlobalConfig,
  Hostconfig,
  PageConfig,
  PageElementMapping,
} from "./env/global";
import { env, getJsonFromFile } from "./env/parseEnv";
import dotenv from "dotenv";
import * as fs from "fs";
dotenv.config({ path: env("COMMON_CONFIG_FILE") });

const hostsConfig: Hostconfig = getJsonFromFile(env("HOSTS_URLS_PATH"));

const pagesConfig: PageConfig = getJsonFromFile(env("PAGES_URLS_PATH"));

const mappingFile = fs.readdirSync(
  `${process.cwd()}/${env("PAGES_ELEMENTS_PATH")}`,
);

const pageElementMapping: PageElementMapping = mappingFile.reduce(
  (pageElementConfigAcc, file) => {
    const key = file.replace(".json", "");
    const elementMapping = getJsonFromFile<Record<string, string>>(
      `${env("PAGES_ELEMENTS_PATH")}${file}`,
    );
    return { ...pageElementConfigAcc, [key]: elementMapping };
  },
  {} as PageElementMapping,
);

const worldParameters: GlobalConfig = {
  hostsConfig,
  pagesConfig,
  pageElementMapping,
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
