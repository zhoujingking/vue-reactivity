/*
  How to call track and trigger reactively
*/
let activeEffect = null;

// eff is type of Function
function effect(eff) {
  activeEffect = eff;
  activeEffect();
  activeEffect = null;
}

// WeakMap whose keys must be object
const targetMap = new WeakMap();
const depsMap = new Map();

// save the effect into storage
const track = (target, key) => {
  if (activeEffect) {
    console.log('track called')
    let depMap = targetMap.get(target);
    if (!depMap) {
      // if no depMap, let's create one
      targetMap.set(target, (depMap = new Map()));
    }
    
    let dep = depMap.get(key);
    if (!dep) {
      // if no dep, let's create one
      depMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect);
  }   
};

// to re-run the effect
const trigger = (target, key) => {
  const depMap = targetMap.get(target);
  if (depMap) {
    const dep = depMap.get(key);
    if (dep) {
      dep.forEach(effect => effect())
    }
  }
};

// define actions like vue3
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, reciever) {
      track(target, key);
      return Reflect.get(target, key, reciever);
    },
    set(target, key, value, reciever) {    
      const oldValue = target[key];
      const success = Reflect.set(target, key, value, reciever);
      if (oldValue !== value) {
        trigger(target, key);
      }
      return success;
    }
  });
}

function ref(raw) {
  return {
    get value() {
      track(this, 'value');
      return raw;
    },
    set value(newVal) {
      raw = newVal;
      trigger(this, 'value')
    }
  }
}

const product = reactive({
  price: 5,
  quanity: 2,
  name: 'king'
});

let total = 0;

effect(() => {
  console.log('effect called')
  total = product.quanity * product.price;
});
console.log(`total is ${total}`);

product.price = 10;
console.log(`total is ${total}`);

// property `name` is not being tracked since it's not in effect callback
product.name = 'changed';
