import { Before, After, ITestCaseHookParameter } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page } from "playwright";
import { ScenarioWorld } from "./world";

Before(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {
  console.log(`Running cucumber scenario ${scenario.pickle.name}`);

  const contextOptions = {
    recordVideo: {
      dir: "./reports/videos/" + scenario.pickle.name,
    },
  };

  const ready = await this.init(contextOptions);
  return ready;
});

After(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {
  const { page, browser } = this.screen || {};

  if (scenario.result?.status === "FAILED") {
    await page?.screenshot({
      path: `./reports/screenshots/${scenario.pickle.name}.png`,
    });
  }

  await browser?.close();
  return browser;
});
