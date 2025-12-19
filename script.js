let output = '';
let number1 = null;
let operator = null;

function appendNumber(num) {
    output += num;
    document.getElementById('display').value = output;

}

function clearDisplay() {
    document.getElementById('display').value = '';
    output = '';
    number1 = null;
    operator = null;

}
function deleteLast() {
    output = output.slice(0, -1);
    document.getElementById('display').value = output;
}


function setOperation(op) {

    if (number1 === null) {
        number1 = parseFloat(output);

    }
    else if (operator) {
        number2 = parseFloat(output)
        number1 = calculate(number1, number2, operator);
        document.getElementById('display').value = number1;

    }
    output = '';
    operator = op;
    output += op;
    document.getElementById('display').value = output;
    output = '';
}


let ans = document.getElementById("eql");
ans.addEventListener("click", function () {
    if (operator && output !== '') {
        let number3 = parseFloat(output);
        var result = calculate(number1, number3, operator);
        document.getElementById('display').value = '=' + result;
        output = result;
        number1 = null;
        operator = null;
    }
})

// factorial helper
function factorial(n) {
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}

// Taylor series for sine
function sinSeries(x) {
    let res = 0;
    for (let n = 0; n < 10; n++) {  // 10 terms for accuracy
        res += ((-1) ** n) * (x ** (2 * n + 1)) / factorial(2 * n + 1);
    }
    return res;
}

// Taylor series for cosine
function cosSeries(x) {
    let res = 0;
    for (let n = 0; n < 10; n++) {
        res += ((-1) ** n) * (x ** (2 * n)) / factorial(2 * n);
    }
    return res;
}

function calculate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Cannot Divide By Zero';
        case '%': return b !== 0 ? a % b : 'Cannot Divide By Zero';
        case '^': return a ** b;
        case '√': return b ** 0.5;
        case '∛': return b ** (1/3);
        case 'e': return 2.7182818284590 ** b;

        // 🔥 New Trigonometric Functions (input in RADIANS)
        case 'sin': return sinSeries(b);
        case 'cos': return cosSeries(b);
        case 'tan': return cosSeries(b) !== 0 ? sinSeries(b) / cosSeries(b) : '∞';
        case 'cosec': return sinSeries(b) !== 0 ? 1 / sinSeries(b) : '∞';
        case 'sec': return cosSeries(b) !== 0 ? 1 / cosSeries(b) : '∞';
        case 'cot': return sinSeries(b) !== 0 ? cosSeries(b) / sinSeries(b) : '∞';
    }
}

