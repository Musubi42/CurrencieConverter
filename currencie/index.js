// TODO: Instant faire une requete à l'API pour récupérer toutes les taux de change par rapport à l'EURO
window.addEventListener("DOMContentLoaded", () => {
  var button = document.getElementById("convert");

  button.addEventListener("click", () => {
    Main();
  });
});

function Main() {
  const URL =
    "https://freecurrencyapi.net/api/v2/latest?apikey=c4cd5ff0-7394-11ec-acfe-0161b9bb46f8";

  const baseCurrency = getBaseCurrency();

  console.log(`baseCurrency : ${baseCurrency}`);

  const buildedURL = buildURL(URL, baseCurrency);

  console.log(buildedURL);

  const currenciesChange = httpGetCurrencies(buildedURL);

  addCurrencyToList(currenciesChange);

  var currencieChange = getCurrencieChange(currenciesChange);

  // console.log(JSON.stringify(currencyChange));
  // console.log(currencyChange);
  // console.log(result["response"].total);
}

// Améliorer la fonction pour récupérer automatiquement les données
// Les retourner dans un array Key value pairs
function getBaseCurrency() {
  var listBaseCurrency = document.getElementById("listBaseCurrency");
  return listBaseCurrency.options[listBaseCurrency.selectedIndex].value;
}

function buildURL(URL, baseCurrency) {
  console.log(baseCurrency);
  return `${URL}&base_currency=${baseCurrency}`;
}

// TODO: Mettre à jour la requete
function httpGetCurrencies(buildedURL) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", buildedURL, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
}

var getTargetCurrency = () => {
  var listTargetCurrency = document.getElementById("listTargetCurrency");
  console.log(
    listTargetCurrency.options[listTargetCurrency.selectedIndex].value
  );
};

var addCurrencyToList = (currenciesChange) => {
  var listBaseCurrency = document.getElementById("listBaseCurrency");
  var listTargetCurrency = document.getElementById("listTargetCurrency");

  // Permet de récupérer le taux de change
  for (currencie in currenciesChange.data) {
    var option = document.createElement("option");
    option.text = currencie;
    option.value = currencie;

    // Add currency to lists
    listBaseCurrency.appendChild(option);
    listTargetCurrency.appendChild(option);
  }
};

var getCurrencieChange = (currenciesChange) => {
  var currencieChange = getTargetCurrency();
  return currenciesChange[getTargetCurrency()];
  // return currenciesChange[currencieChange]
};
