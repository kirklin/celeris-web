import { describe, expect, it } from "vitest";
import { formatToDate, formatToDateTime } from "../dateUtil";

describe("formatToDate function", () => {
  it("should return formatted date when given a valid date object", () => {
    const validDate = new Date("2023-01-01T00:00:00.000Z");
    const expectedOutput = "2023-01-01";
    const actualOutput = formatToDate(validDate);
    expect(actualOutput).toBe(expectedOutput);
  });

  it("should return formatted date with the given format when passed a valid date object and a format string", () => {
    const validDate = new Date("2023-01-01T00:00:00.000Z");
    const formatString = "YYYY-MM-DD";
    const expectedOutput = "2023-01-01";
    const actualOutput = formatToDate(validDate, formatString);
    expect(actualOutput).toBe(expectedOutput);
  });

  it("should throw an error when passed an invalid date string", () => {
    const invalidDate = "2018-10-10-10-10-10";
    const expectedOutput = "Invalid Date";
    const actualOutput = formatToDate(invalidDate);
    expect(actualOutput).toBe(expectedOutput);
  });
});

describe("formatToDateTime function", () => {
  it("should return formatted date and time when given a valid date object", () => {
    const validDate = new Date("2023-01-01T00:00:00.000");
    const expectedOutput = "2023-01-01 00:00:00"; // assuming timezone offset is +08:00
    const actualOutput = formatToDateTime(validDate);
    expect(actualOutput).toBe(expectedOutput);
  });

  it("should throw an error when passed an invalid date string", () => {
    const invalidDate = "2018-10-10-10-10-10";
    const expectedOutput = "Invalid Date";
    const actualOutput = formatToDateTime(invalidDate);
    expect(actualOutput).toBe(expectedOutput);
  });
});
