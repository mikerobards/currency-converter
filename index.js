// Instructions:

// 1. Add the functionality to exchange one currency to another 
//(you can use a technology of your choice) 🤖
// 2. Style the app 🎨

const button = document.querySelector('button');
const orCur = document.getElementById('originCurrency');
const conCur = document.getElementById('convertedCurrency');
const outputText = document.getElementById('output-text');
const amount = document.getElementById('original-currency-amount');
const exRate = document.getElementById('exchange-rate');

button.addEventListener('click', function () {

  const url = `https://www.freeforexapi.com/api/live?pairs=${orCur.value}${conCur.value}`
  if (orCur.value === conCur.value) {
    outputText.innerHTML = `<span><strong>Please choose different currencies!</strong></span>`;
  }

  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(convert)
    .catch(printError)
});

function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
}

function parseJSON(res) {
  return res.json()
    .then(function (parsed) {
      return parsed;
    })
}

function convert(data) {
  let rate = data.rates[`${orCur.value}${conCur.value}`].rate;
  exRate.innerText = `${rate}`;
  let conv = Math.floor(rate * parseInt(amount.value));
  let orSym = '';
  let conSym = '';
  switch (orCur.value) {
    case 'GBP':
      orSym = "£"
      break;
    case 'EUR':
      orSym = "€"
      break;
    case 'USD':
      orSym = "$"
      break;
  }
  switch (conCur.value) {
    case 'GBP':
      conSym = "£"
      break;
    case 'EUR':
      conSym = "€"
      break;
    case 'USD':
      conSym = "$"
      break;
  }

  outputText.innerText = `💰 Your ${orSym}${amount.value} ${orCur.value} will currently buy you ${conSym}${conv} ${conCur.value}! 💰`;
}

function printError(error) {
  console.log(error);
}
