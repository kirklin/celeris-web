import { describe, expect, it } from "vitest";
import { Snowflake } from "../snowflake";

describe("snowflake", () => {
  it("generates unique IDs", () => {
    const snowflake1 = new Snowflake(1, 2);
    const snowflake2 = new Snowflake(3, 4);

    const id1 = snowflake1.nextId();
    const id2 = snowflake2.nextId();

    expect(id1).not.toEqual(id2);
  });

  it("throws error if worker ID is greater than max value", () => {
    expect(() => {
      const snowflake = new Snowflake(32, 0);
      snowflake.nextId();
    }).toThrow("worker id can't be greater than 31 or less than 0");
    expect(() => {
      const snowflake = new Snowflake(-1, 0);
      snowflake.nextId();
    }).toThrow("worker id can't be greater than 31 or less than 0");
  });

  it("throws error if datacenter ID is greater than max value", () => {
    expect(() => {
      const snowflake = new Snowflake(0, 32);
      snowflake.nextId();
    }).toThrow("datacenter id can't be greater than 31 or less than 0");
    expect(() => {
      const snowflake = new Snowflake(0, -1);
      snowflake.nextId();
    }).toThrow("datacenter id can't be greater than 31 or less than 0");
  });

  it("should throw an error if the clock moved backwards", () => {
    const snowflake = new Snowflake(0, 0);
    snowflake.nextId();
    const timestamp = Date.now();
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    snowflake.lastTimestamp = BigInt(timestamp + 1000);
    expect(() => snowflake.nextId()).toThrow();
  });
});
