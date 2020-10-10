function operate(operation, x, y) {
  return operation(x, y);
}
function add(x, y) {
  return x + y;
}
function subtract(x, y) {
  return x - y;
}
function multiply(x, y) {
  return x * y;
}
function divide(x, y) {
  return x / y;
}
function percentage(x, y) {
  return x * (y / 100);
}

let a = operate(percentage, 500, 20);
console.log(a);
