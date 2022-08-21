export let activeEffect = null;

export function effect(eff) {
  activeEffect = eff;
  activeEffect();
  activeEffect = null;
}