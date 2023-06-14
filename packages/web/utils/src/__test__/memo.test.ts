import { describe, expect, it, vi } from "vitest";
import { field, logger } from "@kirklin/logger";
import { memo } from "../util";

describe("memo", () => {
  const add = (a: number, b: number) => {
    return a + b;
  };

  const getDeps = (a: number, b: number) => {
    return [a, b];
  };

  const onChange = vi.fn((result) => {
    logger.info("Result changed:", field("result", result));
  });

  const debug = vi.fn(() => {
    logger.info("Debugging...");
    return true;
  });

  it("should compute and cache the result", () => {
    let a = 2;
    let b = 3;

    const memoizedAdd = memo(() => getDeps(a, b), add, { key: "should compute and cache the result", onChange });

    // 第一次调用应该执行计算函数，并返回计算结果
    expect(memoizedAdd()).toBe(5);

    // 依赖参数没有改变，应该返回缓存的结果
    expect(memoizedAdd()).toBe(5);
    a = 4;
    b = 5;
    // 依赖参数改变，应该重新计算结果并缓存
    expect(memoizedAdd()).toBe(9);

    // 依赖参数没有改变，应该返回缓存的结果
    expect(memoizedAdd()).toBe(9);

    // onChange回调函数应该被调用2次
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(5);
    expect(onChange).toHaveBeenCalledWith(9);
  });

  it("should handle dependency parameter changes", () => {
    let a = 2;
    let b = 3;
    const newOnChange = vi.fn((result) => {
      logger.info("Result changed:", field("result", result));
    });
    const memoizedAdd = memo(() => getDeps(a, b), add, { key: "should handle dependency parameter changes", onChange: newOnChange });

    // 第一次调用应该执行计算函数，并返回计算结果
    expect(memoizedAdd()).toBe(5);

    a = 4;
    b = 5;
    // 依赖参数改变，应该重新计算结果并缓存
    expect(memoizedAdd()).toBe(9);
    a = 6;
    b = 7;
    // 依赖参数改变，应该重新计算结果并缓存
    expect(memoizedAdd()).toBe(13);

    // onChange回调函数应该被调用3次
    expect(newOnChange).toHaveBeenCalledTimes(3);
    expect(newOnChange).toHaveBeenCalledWith(5);
    expect(newOnChange).toHaveBeenCalledWith(9);
    expect(newOnChange).toHaveBeenCalledWith(13);
  });

  it("should call the debug function", () => {
    let a = 2;
    let b = 3;
    const memoizedAdd = memo(() => getDeps(a, b), add, { key: "should call the debug function", debug });

    // 调用计算函数，debug函数应该被调用一次
    expect(memoizedAdd()).toBe(5);
    expect(debug).toHaveBeenCalledTimes(1);

    // 依赖参数没有改变，不应该调用debug函数
    expect(memoizedAdd()).toBe(5);
    expect(debug).toHaveBeenCalledTimes(1);

    a = 4;
    b = 5;

    // 依赖参数改变，调用计算函数，debug函数应该被调用两次
    expect(memoizedAdd()).toBe(9);
    expect(debug).toHaveBeenCalledTimes(2);

    // 依赖参数没有改变，不应该调用debug函数
    expect(memoizedAdd()).toBe(9);
    expect(debug).toHaveBeenCalledTimes(2);
  });
});
