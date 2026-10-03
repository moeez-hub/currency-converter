const amountEl = document.getElementById("amount");
const buttonEl = document.getElementById("exchangeBtn");
const fromEl = document.getElementById("from");
const toEl = document.getElementById("to");
const resultEl = document.getElementById("result");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");

const countries = {
  PKR: "PK",
  USD: "US",
  EUR: "EU",
  GBP: "GB",
  JPY: "JP",
  AUD: "AU",
  CAD: "CA",
  CNY: "CN",
};

buttonEl.addEventListener("click", async function () {
  const amount = parseFloat(amountEl.value);

  if (fromEl.value === toEl.value) {
    resultEl.innerText = "Please select different currencies";
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    resultEl.innerText = "Please enter a valid amount";
    return;
  }

  resultEl.innerText = "Loading...";

  try {
    const url = `https://open.er-api.com/v6/latest/${fromEl.value}`;
    const response = await fetch(url);
    const data = await response.json();

    const rate = data.rates[toEl.value];
    const total = (amount * rate).toFixed(2);

        console.log(data);
    console.log(rate);
    console.log(total);

    resultEl.innerText = `${amount} ${fromEl.value} = ${total} ${toEl.value}`;
  } catch (error) {
    resultEl.innerText = "Error fetching rates. Check your internet.";
  }
});

fromEl.addEventListener("change", function () {
  fromFlag.src = `https://flagsapi.com/${countries[fromEl.value]}/flat/64.png`;
});

toEl.addEventListener("change", function () {
  toFlag.src = `https://flagsapi.com/${countries[toEl.value]}/flat/64.png`;
});

const swapBtn = document.getElementById("swapBtn");
swapBtn.addEventListener("click", function () {
  
  const temp = fromEl.value;
  fromEl.value = toEl.value;
  toEl.value = temp;

  fromFlag.src = `https://flagsapi.com/${countries[fromEl.value]}/flat/64.png`;
  toFlag.src = `https://flagsapi.com/${countries[toEl.value]}/flat/64.png`;
});