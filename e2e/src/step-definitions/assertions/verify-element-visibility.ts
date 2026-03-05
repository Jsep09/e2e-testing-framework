import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getElementLocator } from "../../support/web-element-helper";
import { ElementKey } from "../../env/global";
import { ScenarioWorld } from "../setup/world";

Then(
  /^the "([^"]*)" should contain the text "([^"]*)"$/,
  async function (
    this: ScenarioWorld,
    elementKey: ElementKey,
    expectedElementText: string,
  ) {
    const {
      screen: { page },
      globalVariables,
      globalConfig,
    } = this;

    console.log(
      `the ${elementKey} should contain the text ${expectedElementText}`,
    );

    const elementIdentifier = getElementLocator(
      page,
      elementKey,
      globalVariables,
      globalConfig,
    );

    const content = await elementIdentifier.textContent();

    expect(content).toBe(expectedElementText);
  },
);

Then(
  /^the "([^"]*)" element should be displayed$/,
  async function (this: ScenarioWorld, elementKey: string) {
    const {
      screen: { page },
      globalVariables,
      globalConfig,
    } = this;

    console.log(`the ${elementKey} should be displayed`);

    const locator = getElementLocator(
      page,
      elementKey,
      globalVariables,
      globalConfig,
    );

    await expect(locator).toBeVisible();
  },
);
