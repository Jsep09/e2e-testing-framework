import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Then(
  /^the contact header should contain the text Contacts$/,
  async function () {
    console.log("the contact header should contain the text Contacts");

    const content = await global.page.textContent("[data-id='contacts']");

    expect(content).toBe("Contacts");
  },
);
