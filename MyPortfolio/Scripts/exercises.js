﻿clearOnClose = [];

function clearText() {
  clearOnClose.forEach(e => {
    e.value ? (e.value = '') : (e.textContent = '');
  });
}

$('#exerciseModal').on('hidden.bs.modal', clearText);

// Statistics
(() => {
  const calcBtn = document.querySelector('#menu1 .calc-btn');
  const inputs = [...document.querySelectorAll('#menu1 input')];
  const outputs = document.querySelectorAll('#menu1 .output');
  const msg = document.querySelector('#menu1 .msg');

  clearOnClose.push(...inputs, ...outputs, msg);

  function getNumbers(inputs) {
    return inputs.map(input => Number(input.value));
  }

  function validate(inputs) {
    for (const input of inputs) {
      if (input.value === '' || isNaN(input.value)) {
        return `'${input.value}' is not a valid number.`;
      }
    }
  }

  function calculate(numbers) {
    const max = Math.max(...numbers);
    const min = Math.min(...numbers);
    const sum = numbers.reduce((acc, cur) => acc + cur);
    const mean = sum / numbers.length;
    const product = numbers.reduce((acc, cur) => acc * cur);

    return {
      max,
      min,
      sum,
      mean,
      product
    };
  }

  function showOutput(obj) {
    let n = 0;
    Object.keys(obj).forEach(key => {
      outputs[n].textContent = `${key}: ${obj[key]}`;
      n++;
    });
  }

  function handleClick() {
    msg.textContent = '';
    outputs.forEach(output => (output.textContent = ''));

    const errMsg = validate(inputs);
    if (errMsg) {
      msg.textContent = errMsg;
      return;
    }
    showOutput(calculate(getNumbers(inputs)));
  }

  calcBtn.addEventListener('click', handleClick);
})();

// Factorial
(() => {
  const calcBtn = document.querySelector('#menu2 .calc-btn');
  const input = document.querySelector('#menu2 input');
  const output = document.querySelector('#menu2 .output');

  clearOnClose.push(input, output);

  function factorial(n) {
    if (n <= 1) {
      return 1;
    }
    return n * factorial(n - 1);
  }

  function handleClick() {
    const n = Number(input.value);
    let msg = '';
    if (!Number.isInteger(n) || n < 0) {
      msg = `'${n}' must be a non-negative integer.`;
    } else {
      msg = `The factorial of '${n}' is ${factorial(n)}.`;
    }
    output.textContent = msg;
  }

  calcBtn.addEventListener('click', handleClick);
})();

// FizzBuzz
(() => {
  const checkBtn = document.querySelector('#menu3 .fizzbuzz-btn');
  const inputs = [...document.querySelectorAll('#menu3 input')];
  const output = document.querySelector('#menu3 .output');

  clearOnClose.push(...inputs, output);

  function validate(inputs) {
    for (const input of inputs) {
      const n = Number(input.value);
      if (!Number.isInteger(n) || n < 1) {
        return `Input numbers must be integers and greater than 0.`;
      }
    }
  }

  function fizzBuzz(m, n) {
    const results = [];
    for (let i = 1; i <= 100; i++) {
      let str = '';
      if (i % m === 0) {
        str += 'Fizz';
      }
      if (i % n === 0) {
        str += 'Buzz';
      }
      results.push(str === '' ? i : str);
    }
    return results;
  }

  function handleClick() {
    output.textContent = '';
    const msg = validate(inputs);
    if (msg) {
      output.textContent = msg;
      return;
    }
    output.textContent = fizzBuzz(
      Number(inputs[0].value),
      Number(inputs[1].value)
    ).join(', ');
  }

  checkBtn.addEventListener('click', handleClick);
})();

// Palindrome
(() => {
  const checkBtn = document.querySelector('#menu4 .check-btn');
  const input = document.querySelector('#menu4 input');
  const output = document.querySelector('#menu4 .output');

  clearOnClose.push(input, output);

  function checkPalindrome(word) {
    const reversed = word
      .split('')
      .reverse()
      .join('');
    if (word === reversed) {
      return true;
    }
    return false;
  }

  function handleClick() {
    let msg = '';
    const word = input.value.trim().toLowerCase();
    if (word.match(/^[a-z]+$/)) {
      msg = `${word} is ${checkPalindrome(word) ? '' : 'not '}a palindrome`;
    } else {
      msg = 'Only English letters are allowed!';
    }
    output.textContent = msg;
  }

  checkBtn.addEventListener('click', handleClick);
})();
