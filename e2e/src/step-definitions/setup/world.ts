import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import playwright, {
  Browser,
  BrowserContext,
  BrowserContextOptions,
  BrowserType,
  Page,
} from "playwright";
import { env } from "../../env/parseEnv";
import { GlobalConfig, GlobalVariables } from "../../env/global";
import { Dayjs } from "dayjs";

export type Screen = {
  browser: Browser;
  browserContext: BrowserContext;
  page: Page;
};

export class ScenarioWorld extends World {
  constructor(options: IWorldOptions) {
    super(options);
    this.globalConfig = options.parameters as GlobalConfig;
    this.globalVariables = { currentScreen: "" };
  }

  screen!: Screen;
  startTime!: Dayjs;
  globalConfig!: GlobalConfig;
  globalVariables!: GlobalVariables;

  async init(ContextOptions?: BrowserContextOptions): Promise<Screen> {
    if (this.screen) {
      await this.screen.page.close();
      await this.screen.browserContext.close();
      await this.screen.browser.close();
    }

    const browser = await this.newBrowser();
    const browserContext = await browser.newContext(ContextOptions);
    const page = await browserContext.newPage();

    this.screen = { browser, browserContext, page };
    return this.screen;
  }
  private newBrowser = async (): Promise<Browser> => {
    const automationBrowsers = ["chromium", "firefox", "webkit"];

    type AutomationBrowser = (typeof automationBrowsers)[number];

    const automationBrowser = env("UI_AUTOMATION_BROWSER") as AutomationBrowser;

    const browserType: BrowserType = playwright[
      automationBrowser as keyof typeof playwright
    ] as BrowserType;

    const browser = await browserType.launch({
      headless: process.env.HEADLESS !== "false",
      args: [
        "--disable-web-security",
        "--disable-features=IsolateOrigins",
        "--site-per-process",
      ],
    });

    return browser;
  };
}

setWorldConstructor(ScenarioWorld);
