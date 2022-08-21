import { computed } from "./computed.js";
import { reactive } from "./reactive.js";

const product = reactive({
  price: 2,
  quantity: 5,
  name: 'godking'
});

const total = computed(() => {
  return product.price * product.quantity 
})

console.log(total.value);

product.price = 10;

console.log(total.value);