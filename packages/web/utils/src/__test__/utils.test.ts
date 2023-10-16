import { describe, expect, test } from "vitest";
import { getErrorMessage } from "../util";

describe("getErrorMessage", () => {
  test("should return the error message if the error object is an instance of Error", () => {
    const error = new Error("This is an error message");
    expect(getErrorMessage(error)).toBe("This is an error message");
  });

  test("should convert the error object to string if it is not an instance of Error", () => {
    const error = { message: "This is not an Error instance" };
    expect(getErrorMessage(error)).toBe("This is not an Error instance");
  });

  test("should return the error message as string if the error object is a string", () => {
    const error = "This is a string error";
    expect(getErrorMessage(error)).toBe("This is a string error");
  });
});
