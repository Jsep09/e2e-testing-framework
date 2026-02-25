export type PageId = string;
export type PageConfig = Record<PageId, Record<string, string>>;
export type Hostconfig = Record<string, string>;

export type GlobalConfig = {
  hostsConfig: Hostconfig;
  pagesConfig: PageConfig;
};
