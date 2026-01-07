let display = document.getElementById("display");
let output = "";
let firstValue = null;
let operator = null;
let trigFunction = null;
let isDegree = true;

// ---------------- BASIC INPUT ----------------
function appendNumber(num) {
    output = output + num;
    display.value = output;
}

function clearDisplay() {
    output = "";
    firstValue = null;
    operator = null;
    trigFunction = null;
    display.value = "";
}

function deleteLast() {
    output = output.slice(0, -1);
    display.value = output;
}

function insertPi() {
    const piValue = "3.141592653589793";
    output += piValue;
    display.value = output;
}


// ---------------- DEG / RAD ----------------
function toggleMode() {
    isDegree = !isDegree;
    document.querySelector(".mode").innerText = isDegree ? "DEG" : "RAD";
}

// Degree → Radian conversion (NO Math trig used)
function toRadian(x) {
    return isDegree ? (x * 3.141592653589793) / 180 : x;
}

// ---------------- FACTORIAL ----------------
function factorial(n) {
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}

// ---------------- TAYLOR SERIES ----------------
function sinSeries(x) {
    let res = 0;
    for (let n = 0; n < 10; n++) {
        res += ((-1) ** n) * (x ** (2 * n + 1)) / factorial(2 * n + 1);
    }
    return res;
}

function cosSeries(x) {
    let res = 0;
    for (let n = 0; n < 10; n++) {
        res += ((-1) ** n) * (x ** (2 * n)) / factorial(2 * n);
    }
    return res;
}

function setOperation(op) {

    // Trigonometric & unary operators
    if (["sin","cos","tan","cosec","sec","cot","√","∛","e"].includes(op)) {
        trigFunction = op;
        output = "";
        display.value += op + "(";
        return;
    }

    // Binary operators
    if (output === "") return;

    firstValue = parseFloat(output);
    operator = op;
    display.value += " " + op + " ";
    output = "";
}


// ---------------- EQUALS ----------------
document.getElementById("eql").addEventListener("click", () => {

    // Trigonometric / unary calculation
    if (trigFunction && output !== "") {
        let value = parseFloat(output);
        let result = calculateTrig(value, trigFunction);
        display.value = "=" + result;
        output = result.toString();
        trigFunction = null;
        return;
    }

    // Binary calculation
    if (operator && output !== "") {
        let secondValue = parseFloat(output);
        let result = calculateBinary(firstValue, secondValue, operator);
        display.value = "=" + result;
        output = result.toString();
        operator = null;
        firstValue = null;
    }
});

// ---------------- TRIG CALCULATIONS ----------------
function calculateTrig(x, fn) {
    x = toRadian(x);

    switch (fn) {
        case "√": return x ** 0.5;
        case "∛": return x ** (1 / 3);
        case "e": return 2.7182818284590 ** x;
        case "sin": return sinSeries(x);
        case "cos": return cosSeries(x);
        case "tan": return cosSeries(x) !== 0 ? sinSeries(x) / cosSeries(x) : "∞";
        case "cosec": return sinSeries(x) !== 0 ? 1 / sinSeries(x) : "∞";
        case "sec": return cosSeries(x) !== 0 ? 1 / cosSeries(x) : "∞";
        case "cot": return sinSeries(x) !== 0 ? cosSeries(x) / sinSeries(x) : "∞";
        
    }
}

// ---------------- BINARY CALCULATIONS ----------------
function calculateBinary(a, b, op) {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b !== 0 ? a / b : "Error";
        case "%": return b !== 0 ? a % b : "Error";
        case "^": return a ** b;
    }
}
