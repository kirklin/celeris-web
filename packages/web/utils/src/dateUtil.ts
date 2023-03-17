import dayjs from "dayjs";

// Date-time and date format constants
const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
const DATE_FORMAT = "YYYY-MM-DD";

/**
 * Formats a date to a specific date-time format.
 * @param date - The date to be formatted.
 * @param format - The desired date-time format.
 * @returns The formatted date-time string.
 */
export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format);
}

/**
 * Formats a date to a specific date format.
 * @param date - The date to be formatted.
 * @param format - The desired date format.
 * @returns The formatted date string.
 */
export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;
