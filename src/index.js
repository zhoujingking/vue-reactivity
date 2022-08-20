/*
  previous version is one property version.
  Here, we to for object which has multiple properties, and
  each property has their own dep.
*/

const product = {
  price: 5,
  quanity: 2
};

const depsMap = new Map();

let total = 0;

const effect = () => {
  total = product.price * product.quanity;
};

// save the effect into storage
const track = (key) => {
  let dep = depsMap.get(key);
  if (!dep) {
    // if no dep, let's create one
    depsMap.set(key, (dep = new Set()));
  }
  dep.add(effect);
};

// to re-run the effect
const trigger = (key) => {
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => effect())
  }
};


// const keyToTrack = 'quantity';
// track(keyToTrack);
// trigger(keyToTrack);
// console.log(`total is ${total}`);

// // if some dependency changes, re-run effect
// product.price = 20;
// trigger(keyToTrack);
// console.log(`total is ${total}`);

Object.keys(product).forEach(key => {
  track(key);
  trigger(key);
});
console.log(`total is ${total}`);
product.quanity = 20;
trigger('quanity');
console.log(`total is ${total}`);
product.price = 13;
trigger('price');
console.log(`total is ${total}`);