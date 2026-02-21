import dayjs, { Dayjs } from "dayjs";

/**
 * Formats a date into a timestamp string: DD-MM-YYYY_HH-mm-ss
 * @param date The date to format
 * @returns Formatted timestamp string
 */
export const formatTimestamp = (date: Dayjs): string => {
  return date.format("DD-MM-YYYY_HH-mm-ss");
};
