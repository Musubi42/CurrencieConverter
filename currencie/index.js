// TODO: Instant faire une requete à l'API pour récupérer toutes les taux de change par rapport à l'EURO
// TODO : Modifier les les commentaires spéciaux et faire une note dans Notion tops VS Code
// TODO : Dev en jQuery mais pas que
window.addEventListener("DOMContentLoaded", () => {
  var button = document.getElementById("convert");

  button.addEventListener("click", () => {
    Main();
  });
});

// Ajouter au chargement de la page les monnaies dans les listes
window.addEventListener("DOMContentLoaded", (event) => {
  const baseCurrency = getCurrenciesNames();

  addCurrencyToList(baseCurrency);
});

function Main() {
  // $("#listBaseCurrency").html("test");

  // OLD URL   "https://freecurrencyapi.net/api/v2/latest?apikey=c4cd5ff0-7394-11ec-acfe-0161b9bb46f8";

  var nameBaseCurrencie = getNameBaseCurrencie();
  var nameTargetCurrencie = getNameTargetCurrencie();
  var amountBaseCurrencie = getAmountBaseCurrencie();
  var amountTargetCurrencie = getAmountTargetCurrencie();

  const buildedURL = buildURL(nameBaseCurrencie);

  const currenciesChange = getCurrenciesChange(buildedURL);

  var exchangeRate = getExchangeRate(currenciesChange, nameTargetCurrencie);

  console.log(exchangeRate);
  console.log(amountBaseCurrencie);
  var change = computeChange(exchangeRate, amountBaseCurrencie);

  console.log(change);
  displayChange(change);

  // addCurrencyToList(currenciesChange);

  // var currencieChange = getCurrencieChange(currenciesChange);

  // console.log(JSON.stringify(currencyChange));
  // console.log(currencyChange);
  // console.log(result["response"].total);
}

var displayChange = (change) => {
  document.getElementById("amoutTargetCurrency").value = change.toFixed(2);
};

// TODO : compute the change
var computeChange = (exchangeRate, amountTargetCurrencie) => {
  return exchangeRate * amountTargetCurrencie;
};

// Doc of the API endpoint https://developers.coinbase.com/api/v2#get-currencies
// TODO : Get the exchange rate betwen Base and Target
var getExchangeRate = (currenciesChange, nameTargetCurrencie) => {
  for (rate in currenciesChange.data.rates) {
    if (rate === nameTargetCurrencie) {
      return currenciesChange.data.rates[rate];
    }
  }
};

// Doc of the API endpoint https://developers.coinbase.com/api/v2#get-exchange-rates
function getCurrenciesNames() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "https://api.coinbase.com/v2/currencies", false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
}

function buildURL(nameBaseCurreny) {
  // https://api.coinbase.com/v2/exchange-rates?currency=EUR
  return `https://api.coinbase.com/v2/exchange-rates?currency=${nameBaseCurreny}`;
}

// TODO: Mettre à jour la requete, deux requetes à faire
// TODO: Récup toutes les monnaies
function getCurrenciesChange(buildedURL) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", buildedURL, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
}

// Améliorer la fonction pour récupérer automatiquement les données
// Les retourner dans un array Key value pairs
function getNameBaseCurrencie() {
  var listNameBaseCurrency = document.getElementById("listNameBaseCurrency");
  return listNameBaseCurrency.options[listNameBaseCurrency.selectedIndex].value;
}

var getAmountBaseCurrencie = () => {
  return document.getElementById("amoutBaseCurrency").value;
};

var getNameTargetCurrencie = () => {
  var listNameTargetCurrency = document.getElementById(
    "listNameTargetCurrency"
  );
  return listNameTargetCurrency.options[listNameTargetCurrency.selectedIndex]
    .value;
};

var getAmountTargetCurrencie = () => {
  return document.getElementById("amoutTargetCurrency").value;
};

// TODO : je sais pas pourquoi je ne peux pas ajouter en même temps les options aux deux listes
// En fait si je pense savoir
var addCurrencyToList = (baseCurrency) => {
  var listNameBaseCurrency = document.getElementById("listNameBaseCurrency");
  var listNameTargetCurrency = document.getElementById(
    "listNameTargetCurrency"
  );

  baseCurrency.data.forEach((currencie) => {
    let optionBaseCurrency = document.createElement("option");
    let optionTargetCurrency = document.createElement("option");

    optionBaseCurrency.text = currencie.name;
    optionBaseCurrency.value = currencie.id;
    optionTargetCurrency.text = currencie.name;
    optionTargetCurrency.value = currencie.id;

    // Add currency to lists
    listNameBaseCurrency.appendChild(optionBaseCurrency);
    listNameTargetCurrency.appendChild(optionTargetCurrency);
  });
};

var getCurrencieChange = (currenciesChange) => {
  var currencieChange = getTargetCurrency();
  return currenciesChange[getTargetCurrency()];
  // return currenciesChange[currencieChange]
};
