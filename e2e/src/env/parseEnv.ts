import * as dotenv from "dotenv";
import * as fs from "fs";
import * as nodePath from "path";
dotenv.config();

export const env = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`No environment variable found for ${key}`);
  }
  return value;
};

export const getJsonFromFile = <T = Record<string, string>>(
  filePath: string,
): T => {
  return require(nodePath.resolve(process.cwd(), filePath));
};
