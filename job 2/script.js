const screen = document.getElementById('screen');
const clearButton = document.getElementById('clear');
const equalButton = document.getElementById('equal');
const keys = document.querySelector('.calculator-keys');

let currentInput = '';
let previousInput = '';
let operator = '';

keys.addEventListener('click', function(e) {
    const target = e.target;
    if (target.matches('button')) {
        const action = target.dataset;
        if (action.number) {
            handleNumber(action.number);
        } else if (action.operator) {
            handleOperator(action.operator);
        } else if (target.classList.contains('decimal')) {
            handleDecimal();
        }
    }
});

clearButton.addEventListener('click', clearScreen);
equalButton.addEventListener('click', calculate);

function handleNumber(number) {
    if (currentInput.length < 12) {
        currentInput += number;
        screen.value = currentInput;
    }
}

function handleOperator(op) {
    if (currentInput === '' && operator === '') return;
    if (previousInput && currentInput) {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        screen.value = currentInput;
    }
}

function clearScreen() {
    currentInput = '';
    previousInput = '';
    operator = '';
    screen.value = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    screen.value = result;
    currentInput = result.toString();
    previousInput = '';
    operator = '';
}
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= 0 && key <= 9) {
        handleNumber(key);
    } else if (key === '+') {
        handleOperator('+');
    } else if (key === '-') {
        handleOperator('-');
    } else if (key === '*') {
        handleOperator('*');
    } else if (key === '/') {
        handleOperator('/');
    } else if (key === '.') {
        handleDecimal();
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearScreen();
    }
});
