import { effect } from "./effect.js";
import { ref } from "./reactive.js";

export function computed(getter) {
  const result = ref();
  effect(() => result.value = getter())
  return result;
}