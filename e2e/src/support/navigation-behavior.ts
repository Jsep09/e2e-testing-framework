import { Page } from "playwright";
import { env } from "process";
import { GlobalConfig, PageId } from "src/env/global";

export const navigateToPage = async (
  page: Page,
  pageId: PageId,
  { pagesConfig, hostsConfig }: GlobalConfig,
): Promise<void> => {
  const { UI_AUTOMATION_HOST: hostName = "localhost" } = process.env;

  const hostPath = hostsConfig[`${hostName}`];

  console.log("hostPath", hostPath);

  const url = new URL(hostPath);

  console.log("url", url);

  const pageConfigItem = pagesConfig[pageId];

  url.pathname = pageConfigItem.route;

  console.log("pages route", url.pathname);

  await page.goto(url.href);
};
