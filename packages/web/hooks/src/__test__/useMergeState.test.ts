import { ref } from "vue";
import { describe, expect, it } from "vitest";
import { useMergeState } from "../useMergeState";

describe("useMergeState", () => {
  it("should return the default value when no props.value is provided", () => {
    const defaultValue = "default";
    const [mergeValue] = useMergeState(defaultValue, { value: undefined });
    expect(mergeValue.value).toBe(defaultValue);
  });

  it("should return the value from props when props.value is provided", () => {
    const propsValue = "propsValue";
    const [mergeValue] = useMergeState("default", { value: propsValue });
    expect(mergeValue.value).toBe(propsValue);
  });

  it("should update mergeValue when props.value changes", () => {
    const defaultValue = "default";
    const propsValue1 = "propsValue1";
    const propsValue2 = "propsValue2";
    const props = ref(propsValue1);
    const [mergeValue] = useMergeState(defaultValue, { value: props });

    expect(mergeValue.value).toBe(propsValue1);
    // Update props.value
    props.value = propsValue2;
    // Wait for reactivity
    setTimeout(() => {
      expect(mergeValue.value).toBe(propsValue2);
    }, 0);
  });

  it("should set localValue and mergeValue to undefined when props.value is undefined and _setLocalValue is called with undefined", () => {
    const defaultValue = "default";
    const [mergeValue, setLocalValue, localValue] = useMergeState(defaultValue, { value: undefined });
    setLocalValue(undefined);
    expect(localValue.value).toBeUndefined();
    expect(mergeValue.value).toBeUndefined();
  });
});
