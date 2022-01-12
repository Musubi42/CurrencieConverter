function Main() {
  const URL =
    "http://api.exchangeratesapi.io/v1/latest?access_key=ce61b0665230b6288e0188a9f1617da3";

  const result = httpGetCurrencies(URL);
  console.log(JSON.stringify(result));
  console.log(result);
  // console.log(result["response"].total);
}

// Améliorer la fonction pour récupérer automatiquement les données
// Les retourner dans un array Key value pairs
function getParameters() {
  const listParameters = ["lastName", "firstName", "deathCountry", "deathCity"];
  const parameters = {};

  for (let i = 0; i < listParameters.length; i++) {
    if (document.getElementById(listParameters[i]) != "") {
      parameters[listParameters[i]] = document.getElementById(
        listParameters[i]
      ).value;
    }
  }

  return parameters;
}

// test Token

function buildURL(parameters) {
  return (URL = `https://deces.matchid.io/deces/api/v1/agg?firstName=${parameters["firstName"]}&lastName=${parameters["lastName"]}&deathCity=${parameters["deathCity"]}&deathCountry=${parameters["deathCountry"]}&fuzzy=false&aggs=firstName`);
}

function httpGetCurrencies(url) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
}

function numberDeath(result) {
  document.getElementById("death").textContent = result["response"].total;
}
