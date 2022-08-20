/*
  how to access a property of an object
  1. product.quantity -- dot notation
  2. product['quantity'] -- bracket notation
  3. Reflect.get(product, 'quantity)
*/

/*
  Proxy is a placeholder for anther object, which by default
  delegates to the object
*/

const product = {
  price: 5,
  quantity: 2,
  printPrice() {
    console.log(this.constructor.name)
    console.log(this.price)
  }
};

const proxiedProduct = new Proxy(product, {
  get(target, key, reciever) {
    console.log(target, key)
    return target[key];
  }
});

console.log(proxiedProduct.quantity)
proxiedProduct.printPrice();