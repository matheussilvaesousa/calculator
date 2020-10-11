// Global variables

let currDisplay = "0";
let storedDisplay = "";
let currOperator = "";
let secondNumber = false;

// Selectors

const display = document.getElementById("display");
const clearBtn = document.getElementById("clear");
const invertBtn = document.getElementById("invert");
const equalsBtn = document.getElementById("equals");
const decimalBtn = document.getElementById("decimal");
const btns = Array.from(document.querySelectorAll(".button"));
const operatorBtns = btns.filter((btn) => btn.classList.contains("operator"));
const numBtns = btns.filter((btn) => btn.classList.contains("num"));

// Event Listeners

window.addEventListener("load", updateDisplay);
clearBtn.addEventListener("click", clearDisplay);
invertBtn.addEventListener("click", invertSign);
equalsBtn.addEventListener("click", solve);
operatorBtns.forEach((btn) => btn.addEventListener("click", handleOperators));
numBtns.forEach((btn) => btn.addEventListener("click", handleNumbers));

function updateDisplay() {
  let currLength = currDisplay.replace(/-/g, "").length;
  if (currLength > 9) {
    if (currDisplay.includes(".")) {
      currDisplay = currDisplay.slice(0, 9);
    } else {
      display.textContent = "3RR0R";
      return;
    }
  }
  display.textContent = currDisplay;
}

function clearDisplay() {
  currDisplay = "0";
  currOperator = "";
  secondNumber = false;
  updateDisplay();
}

function solve() {
  let currFunction;
  switch (currOperator) {
    case "percentage":
      currFunction = percentage;
      break;
    case "divide":
      currFunction = divide;
      break;
    case "multiply":
      currFunction = multiply;
      break;
    case "subtract":
      currFunction = subtract;
      break;
    case "add":
      currFunction = add;
      break;
    default:
      return;
  }
  if (currFunction === divide && currDisplay === "0") {
    display.textContent = "BW0K3N";
    return;
  }
  currDisplay = operate(
    currFunction,
    Number(storedDisplay),
    Number(currDisplay)
  ).toString();
  secondNumber = false;
  currOperator = "";
  updateDisplay();
}

function invertSign() {
  if (currDisplay.charAt(0) !== "-" && currDisplay !== "0") {
    currDisplay = "-" + currDisplay;
  } else if (currDisplay.charAt(0) === "-") {
    currDisplay = currDisplay.substring(1);
  }
  updateDisplay();
}

function handleOperators() {
  if (currOperator !== "") {
    solve();
    currOperator = this.id;
    return;
  }
  currOperator = this.id;
}

function handleNumbers() {
  if (currOperator !== "" && secondNumber === false) {
    storedDisplay = currDisplay;
    currDisplay = "0";
    secondNumber = true;
  }
  let currLength = currDisplay.replace(/-/g, "").length;
  let alreadyDecimal = currDisplay.includes(".");
  if (currLength >= 9) return;
  if (this.textContent === "." && currDisplay === "0") {
    currDisplay += this.textContent;
  } else if (currDisplay === "0") {
    currDisplay = this.textContent;
  } else if (this.textContent !== "." || !alreadyDecimal) {
    currDisplay += this.textContent;
  }
  updateDisplay();
}

// Operations

function operate(operation, x, y) {
  return operation(x, y);
}

function percentage(x, y) {
  return x * (y / 100);
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
