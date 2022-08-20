const cof = {
  name: 'coffee',
  get value() {
    console.log(this)
    return this.name;
  }
}

const proxiedCof = new Proxy(cof, {
  get(target, key, reciever) {
    // return target[key];
    // bind this correctly
    return Reflect.get(target, key, reciever)
  }
});

const myObj = {
  name: 'godking'
};
Object.setPrototypeOf(myObj, proxiedCof);

// it's intension is to log myObj.name;
// but logged cof.name, `this` is changed accidentally
console.log(myObj.value)