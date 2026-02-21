import { Before, After, ITestCaseHookParameter } from "@cucumber/cucumber";
import { ScenarioWorld } from "./world";
import { env } from "../../env/parseEnv";
import { formatTimestamp } from "../../utils/date-helper";
import dayjs from "dayjs";

Before(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {
  console.log(`Running cucumber scenario ${scenario.pickle.name}`);

  this.startTime = dayjs();
  const timestamp = formatTimestamp(this.startTime);

  const contextOptions = {
    recordVideo: {
      dir: `${env("VIDEO_PATH")}${scenario.pickle.name}_${timestamp}`,
    },
  };

  const ready = await this.init(contextOptions);
  return ready;
});

After(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {
  const { page, browser } = this.screen || {};

  if (scenario.result?.status === "FAILED") {
    const timestamp = formatTimestamp(this.startTime || dayjs());
    await page?.screenshot({
      path: `${env("SCREENSHOT_PATH")}${scenario.pickle.name}_${timestamp}.png`,
    });
  }

  await browser?.close();
  return browser;
});
