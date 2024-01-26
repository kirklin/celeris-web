import { describe, expect, it } from "vitest";
import { deepMerge } from "../util";

describe("deepMerge function", () => {
  it("should correctly merge basic data types", () => {
    const source = { a: 1, b: 2, c: null };
    const target = {
      a: 2,
      b: undefined,
      c: 3,
    };
    const expected = {
      a: 2,
      b: 2,
      c: 3,
    };
    expect(deepMerge(source, target)).toStrictEqual(expected);
  });

  it("should return the same date if only 1 is passed", () => {
    const foo = new Date();
    const merged = deepMerge(foo, null);
    const merged2 = deepMerge(undefined, foo);
    expect(merged).toStrictEqual(foo);
    expect(merged2).toStrictEqual(foo);
    expect(merged).toStrictEqual(merged2);
  });

  it("should merge two objects recursively", () => {
    const source = {
      a: { b: { c: 1 }, d: [1, 2] },
      e: [1, 2],
      foo: { bar: 3 },
      array: [{
        does: "work",
        too: [1, 2, 3],
      }],
      r: { a: 1 },
    };
    const target = {
      a: { b: { d: [3] } },
      e: [3],
      foo: { baz: 4 },
      qu: 5,
      array: [{
        does: "work",
        too: [4, 5, 6],
      }, {
        really: "yes",
      }],
      r: { a: 2 },
    };
    const expected = {
      a: { b: { c: 1, d: [3] }, d: [1, 2] },
      e: [3],
      foo: {
        bar: 3,
        baz: 4,
      },
      array: [{
        does: "work",
        too: [4, 5, 6],
      }, {
        really: "yes",
      }],
      qu: 5,
      r: { a: 2 },
    };
    expect(deepMerge(source, target)).toStrictEqual(expected);
  });

  it("should replace arrays by default", () => {
    const source = {
      a: { b: { d: [1, 2] } },
      e: [1, 2],
    };
    const target = {
      a: { b: { d: [3] } },
      e: [3],
    };
    const expected = {
      a: { b: { d: [3] } },
      e: [3],
    };
    expect(deepMerge(source, target)).toStrictEqual(expected);
  });

  it("should union arrays using mergeArrays = 'union'", () => {
    const source = {
      a: { b: { d: [1, 2] } },
      e: [1, 2],
    };
    const target = {
      a: { b: { d: [2, 3] } },
      e: [1, 3],
    };
    const expected = {
      a: { b: { d: [1, 2, 3] } },
      e: [1, 2, 3],
    };
    expect(deepMerge(source, target, "union")).toStrictEqual(expected);
  });

  it("should intersect arrays using mergeArrays = 'intersection'", () => {
    const source = {
      a: { b: { d: [1, 2] } },
      e: [1, 2],
    };
    const target = {
      a: { b: { d: [2, 3] } },
      e: [3],
    };
    const expected = {
      a: { b: { d: [2] } },
      e: [],
    };
    expect(deepMerge(source, target, "intersection")).toStrictEqual(expected);
  });

  it("should concatenate arrays using mergeArrays = 'concat'", () => {
    const source = {
      a: { b: { d: [1, 2] } },
      e: [1, 2],
    };
    const target = {
      a: { b: { d: [2, 3] } },
      e: [3],
    };
    const expected = {
      a: { b: { d: [1, 2, 2, 3] } },
      e: [1, 2, 3],
    };
    expect(deepMerge(source, target, "concat")).toStrictEqual(expected);
  });
});
