export type PageId = string;
export type PageConfig = Record<PageId, Record<string, string>>;
export type Hostconfig = Record<string, string>;
export type ElementKey = string;
export type ElementLocator = string;
export type PageElementMapping = Record<
  PageId,
  Record<ElementKey, ElementLocator>
>;
export type GlobalVariables = { [key: string]: string };

export type GlobalConfig = {
  hostsConfig: Hostconfig;
  pagesConfig: PageConfig;
  pageElementMapping: PageElementMapping;
};
