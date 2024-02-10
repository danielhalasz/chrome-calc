document.addEventListener('DOMContentLoaded', function () {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.button');
  const clearButton = document.getElementById('clear');

  let operand1 = localStorage.getItem('lastDisplayValue') || ''; // Initialize operand1 with the last displayed value
  let operand2 = '';
  let operator = '';
  let result = '';

  display.value = operand1; // Set the display value to operand1

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      handleButtonPress(button.textContent);
    });
  });

  clearButton.addEventListener('click', clearCalculator);

  document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (
      isNumeric(key) ||
      key === '+' ||
      key === '-' ||
      key === '*' ||
      key === '/'
    ) {
      handleButtonPress(key);
    } else if (key === '=' || key === 'Enter') {
      handleButtonPress('=');
    } else if (key === 'Escape') {
      clearCalculator();
    }
  });

  function handleButtonPress(value) {
    if (isNumeric(value)) {
      if (operator === '') {
        operand1 += value;
      } else {
        operand2 += value;
      }
    } else if (value === '=') {
      if (operand1 !== '' && operand2 !== '' && operator !== '') {
        result = calculateResult();
        display.value = result;
        operand1 = result;
        operand2 = '';
        operator = '';
      }
    } else if (value === 'AC') {
      clearCalculator();
    } else {
      operator = value;
    }

    display.value = operand1 + operator + operand2;
    localStorage.setItem('lastDisplayValue', operand1); // Update the stored value in localStorage
  }

  function isNumeric(value) {
    return /^\d+$/.test(value);
  }

  function calculateResult() {
    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);

    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        if (num2 !== 0) {
          return num1 / num2;
        } else {
          return 'Error: Division by zero';
        }
      default:
        return '';
    }
  }

  function clearCalculator() {
    operand1 = '';
    operand2 = '';
    operator = '';
    result = '';
    display.value = '';
    localStorage.removeItem('lastDisplayValue');
  }
});
