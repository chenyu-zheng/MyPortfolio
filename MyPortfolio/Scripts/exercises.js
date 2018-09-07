clearOnClose = [];

function clearText() {
  clearOnClose.forEach(e => {
    e.value ? (e.value = '') : (e.textContent = '');
  });
}

$('#exerciseModal').on('hidden.bs.modal', clearText);

showCode = [];

// Statistics
(() => {
  const calcBtn = document.querySelector('#jse-tab1 .calc-btn');
  const inputs = [...document.querySelectorAll('#jse-tab1 input')];
  const outputs = document.querySelectorAll('#jse-tab1 .output');
  const msg = document.querySelector('#jse-tab1 .msg');

  showCode.push({
    code: document.querySelector('#jse-tab1 .code'),
    button: document.querySelector('#jse-tab1 .show-code')
  });
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
  const calcBtn = document.querySelector('#jse-tab2 .calc-btn');
  const input = document.querySelector('#jse-tab2 input');
  const output = document.querySelector('#jse-tab2 .output');

  showCode.push({
    code: document.querySelector('#jse-tab2 .code'),
    button: document.querySelector('#jse-tab2 .show-code')
  });
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
      msg = `The number must be a non-negative integer.`;
    } else {
      msg = `The factorial of '${n}' is ${factorial(n)}.`;
    }
    output.textContent = msg;
  }

  calcBtn.addEventListener('click', handleClick);
})();

// FizzBuzz
(() => {
  const checkBtn = document.querySelector('#jse-tab3 .fizzbuzz-btn');
  const inputs = [...document.querySelectorAll('#jse-tab3 input')];
  const output = document.querySelector('#jse-tab3 .output');

  showCode.push({
    code: document.querySelector('#jse-tab3 .code'),
    button: document.querySelector('#jse-tab3 .show-code')
  });
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
  const checkBtn = document.querySelector('#jse-tab4 .check-btn');
  const input = document.querySelector('#jse-tab4 input');
  const output = document.querySelector('#jse-tab4 .output');

  showCode.push({
    code: document.querySelector('#jse-tab4 .code'),
    button: document.querySelector('#jse-tab4 .show-code')
  });
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

showCode.forEach(item => {
  $(item.code).hide();
  $(item.button).click(() => {
    $(item.code).toggle();
    $(item.button).text(
      $(item.button).text() === 'Show Code' ? 'Hide Code' : 'Show Code'
    );
  });
});
