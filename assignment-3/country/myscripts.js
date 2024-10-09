/*
Name: Vinicius Teruel
Student ID: 200587844
Email: 200587844@student.georgianc.on.ca
 */

function showCountryInfo() {
    const selectedCountry = document.getElementById("country-select").value;

    document.getElementById("country-info").style.display = "none";
    document.getElementById("country-loading").style.display = "none";

    if (selectedCountry === "") return;

    document.getElementById("country-info").style.display = "none";
    document.getElementById("country-loading").style.display = "block";

    fetch(
        `https://api.api-ninjas.com/v1/country?name=${selectedCountry}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'fqpORERjLXuHXRsIVfojbg==4n4pPoAxdb4VyIj6'
        }
    }
    )
        .then(response => {
            if (!response.ok)
                throw new Error('network response error');
            return response.json();
        })
        .then(data => {
            const info = data[0];
            document.getElementById("unemployment").textContent = info.unemployment;
            document.getElementById("homicide_rate").textContent = info.homicide_rate;
            document.getElementById("currency_name").textContent = info.currency.name;
            document.getElementById("currency_code").textContent = info.currency.code;
            document.getElementById("capital").textContent = info.capital;
            document.getElementById("population").textContent = info.population;
            document.getElementById("region").textContent = info.region;
            document.getElementById("country-info").style.display = "block";
            document.getElementById("country-loading").style.display = "none";
        })
        .catch(err => {
            console.error(err);
        });
}