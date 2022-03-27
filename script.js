// Default Variables
let STARTING_VALUE = '0';

// Operator Functions
function add(num1, num2) {
    return (num1 + num2);
}

function subtract(num1, num2) {
    return (num1 - num2);
}

function multiply(num1, num2) {
    return (num1 * num2);
}

function divide(num1, num2) {
    return (num1 / num2);
}

function operate(num1, num2, operatorFunction) {
    if (operatorFunction == 'divide') {
        return divide(num1, num2);
    } else if (operatorFunction == 'multiply') {
        return multiply(num1, num2);
    } else if (operatorFunction == 'minus') {
        return subtract(num1, num2);
    } else if (operatorFunction == 'plus') {
        return add(num1, num2);
    }
}

// Initialize JS Variables from HTML Elements
// Number Buttons
let oneButton = document.getElementById('oneBtn');
let twoButton = document.getElementById('twoBtn');
let threeButton = document.getElementById('threeBtn');
let fourButton = document.getElementById('fourBtn');
let fiveButton = document.getElementById('fiveBtn');
let sixButton = document.getElementById('sixBtn');
let sevenButton = document.getElementById('sevenBtn');
let eightButton = document.getElementById('eightBtn');
let nineButton = document.getElementById('nineBtn');
let zeroButton = document.getElementById('zeroBtn');

// Other Buttons
let divideButton = document.getElementById('divideBtn');
let timesButton = document.getElementById('timesBtn');
let minusButton = document.getElementById('minusBtn');
let plusButton = document.getElementById('plusBtn');
let equalButton = document.getElementById('equalBtn');
let dotButton = document.getElementById('dotBtn');

// Display and Clear Reference
let clearButton = document.getElementById('clearBtnId');
let deleteButton = document.getElementById('deleteBtnId');

// Display Reference
let display = document.getElementById('displayContentId')

// Function that updates the display content with a given value
function updateDisplay(num) {
    if(display.textContent.length > 14) {
        return;
    } else {
        if (display.textContent == '0') {
            display.textContent = num;
        }
        else {
            let displayString = display.textContent.toString();
            let newNumberString = num.toString();
            let finalNumber = displayString + newNumberString;
            display.textContent = finalNumber;
        }
    }
}

// We need a distinct function to update the '.' because there can
// only be one of this charType in a calculator. Example, a number cannot
// be 12.34.5 etc.
function updateDot() {
    if (display.textContent.includes('.')) {
        return;
    } else {
        display.textContent += '.';
    } 
}

// Function that clears the display
function clearDisplay() {
    display.textContent = STARTING_VALUE;
    firstNumber = 0;
    secondNumber = 0;
    operatorCounter = 0;
}

// Function that deletes the most recent number
function deleteDisplay() {
    if (display.textContent.length == 1) {
        display.textContent = '0';
    } else {
         display.textContent = display.textContent.slice(0, -1);
    }
}

// We need to add the initial event listeners for the buttons
oneButton.onclick = () => updateDisplay(1);
twoButton.onclick = () => updateDisplay(2);
threeButton.onclick = () => updateDisplay(3);
fourButton.onclick = () => updateDisplay(4);
fiveButton.onclick = () => updateDisplay(5);
sixButton.onclick = () => updateDisplay(6);
sevenButton.onclick = () => updateDisplay(7);
eightButton.onclick = () => updateDisplay(8);
nineButton.onclick = () => updateDisplay(9);
zeroButton.onclick = () => updateDisplay(0);
dotButton.onclick = () => updateDot();

// Add functionality for the clear button
clearButton.onclick = () => clearDisplay();

// Add functionality for the delete button
deleteButton.onclick = () => deleteDisplay();

// The next section is related to using the operate function to make the
// calculator functional, with the information we can now capture

// Initialize the pair of numbers
let firstNumber = 0;
let secondNumber = 0;
let operatorCounter = 0;
let operatorStatus = '';

function checkOperatorType(operatorId) {
    if (operatorId == 'divideBtn') {
        return 'divide';
    } else if (operatorId == 'timesBtn') {
        return 'multiply';
    } else if (operatorId == 'minusBtn') {
        return 'minus';
    } else {
        return 'plus'
    }
}

function clickOperator(operatorId) {
    if(operatorCounter == 0) {
        firstNumber = parseFloat(display.textContent);
        display.textContent = 0;
        operatorStatus = checkOperatorType(operatorId);
    } 

    // if(operatorCounter > 0) {
    //     operatorStatus = checkOperatorType(operatorId);
    //     secondNumber = parseFloat(display.textContent);
    //     console.log("First Number " + firstNumber);
    //     console.log("Second Number " + secondNumber);
    //     console.log("Operator Status " + operatorStatus);
    //     firstNumber = operate(firstNumber, secondNumber, operatorStatus);
    //     console.log("newFirstNumber " + firstNumber);
    //     display.textContent = 0;
        
    //     // secondNumber = parseFloat(display.textContent);
    //     // firstNumber = operate(firstNumber, secondNumber, operatorStatus);
    //     // operatorStatus = checkOperatorType(operatorId);
    //     // display.textContent = firstNumber;
    //     // operatorCounter++;
    // }

    operatorCounter++;
}

function clickEquals() {
    secondNumber = parseFloat(display.textContent);
    let finalResult = operate(firstNumber, secondNumber, operatorStatus);
    if (finalResult.toString().length > 14) {
        alert('Your response is too large!');
        display.textContent = '0';
        firstNumber = 0;
        secondNumber = 0;
    } else {
        display.textContent = finalResult;
    }

    operatorCounter = 0;
}

// Activate the operator buttons
divideButton.onclick = () => clickOperator(event.target.id);
timesButton.onclick = () => clickOperator(event.target.id);
plusButton.onclick = () => clickOperator(event.target.id);
minusButton.onclick = () => clickOperator(event.target.id);
equalButton.onclick = () => clickEquals();

