import { Locator, Page } from "playwright";
import { GlobalConfig, GlobalVariables } from "../env/global";

export const getElementLocator = (
  page: Page,
  elementKey: string,
  globalVariables: GlobalVariables,
  globalConfig: GlobalConfig,
): Locator => {
  const { pageElementMapping } = globalConfig;
  const currentPage = globalVariables.currentScreen;

  const elementIdentifier =
    pageElementMapping[currentPage]?.[elementKey] ||
    `[data-id='${elementKey}']`;

  return page.locator(elementIdentifier);
};
