/*
  what if we have multiple reative objects that needs to track effects
*/

// two reactive objects
const product = {
  price: 5,
  quanity: 2
};

const user = {
  firstName: 'Joe',
  lastName: 'Smith'
};

// WeakMap whose keys must be object
const targetMap = new WeakMap();

const depsMap = new Map();

let total = 0;

const effect = () => {
  total = product.price * product.quanity;
};

// save the effect into storage
const track = (target, key) => {
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
  dep.add(effect);
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

Object.keys(product).forEach(key => {
  track(product, key);
  trigger(product, key);
});
console.log(`total is ${total}`);
product.quanity = 20;
trigger(product, 'quanity');
console.log(`total is ${total}`);
product.price = 13;
trigger(product, 'price');
console.log(`total is ${total}`);

// the same for user