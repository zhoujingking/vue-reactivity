import { activeEffect, effect } from "./effect.js";

let targetMap = new WeakMap();

function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect);
  }  
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (depsMap) {
    const dep = depsMap.get(key);
    if (dep) {
      dep.forEach(effect => effect())
    }
  }
}

export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, reciever) {
      track(target, key);
      return Reflect.get(target, key, reciever);
    },
    set(target, key, value, reciever) {
      const oldVal = target[key]; 
      const success = Reflect.set(target, key, value, reciever);
      if (oldVal !== value) {
        trigger(target, key);
      }
      return success;
    }
  })
};

export function ref(raw) {
  return {
    get value() {
      track(this, 'value');
      return raw;
    },
    set value(newVal) {
      trigger(this, 'value');
      raw = newVal;
      return true;
    }
  }
}