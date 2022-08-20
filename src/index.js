let price = 5;
let quanity = 2;
let total = 0;
// steps
// 1. allocate a storage (dep)
// 2. save the effect into storage (dep)
// 3. run (re-run) teh effect later

// the dependency of total
let dep = new Set(); // to store our effects

// save this effect into storage => above set
let effect = () => {
  total = price * quanity;
};

// save the effect into storage
const track = () => {
  dep.add(effect);
};

// to re-run the effect
const trigger = () => {
  dep.forEach(effect => effect());
};

track();

trigger();
console.log(`total is ${total}`);

// if some dependency changes, re-run effect
price = 20;
trigger();
console.log(`total is ${total}`); // total is not automatically updated!!