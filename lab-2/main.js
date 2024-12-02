const API_KEY = '189349df8cfb0ee159549319';
const CURRENCIES = {
    "CAD": "🇨🇦 CAD - Canadian Dollar",
    "USD": "🇺🇸 USD - US Dollar",
    "EUR": "🇪🇺 EUR - Euro",
    "GBP": "🇬🇧 GBP - British Pound",
    "JPY": "🇯🇵 JPY - Japanese Yen",
    "AUD": "🇦🇺 AUD - Australian Dollar",
    "BRL": "🇧🇷 BRL - Brazilian Real",
    "INR": "🇮🇳 INR - Indian Rupee",
    "CNY": "🇨🇳 CNY - Chinese Yuan",
    "CHF": "🇨🇭 CHF - Swiss Franc",
    "RUB": "🇷🇺 RUB - Russian Ruble",
    "ZAR": "🇿🇦 ZAR - South African Rand",
    "MXN": "🇲🇽 MXN - Mexican Peso",
    "SGD": "🇸🇬 SGD - Singapore Dollar",
    "HKD": "🇭🇰 HKD - Hong Kong Dollar",
    "NZD": "🇳🇿 NZD - New Zealand Dollar",
    "KRW": "🇰🇷 KRW - South Korean Won",
    "TRY": "🇹🇷 TRY - Turkish Lira"
};

document.addEventListener('DOMContentLoaded', function () {
    const sourceCurrencySelect = document.getElementById('sourceCurrency');
    const targetCurrencySelect = document.getElementById('targetCurrency');

    for (const [code, name] of Object.entries(CURRENCIES)) {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = name;
        sourceCurrencySelect.appendChild(option.cloneNode(true));
        targetCurrencySelect.appendChild(option);
    }
});

document.getElementById('convert').addEventListener('click', function () {
    const amount = document.getElementById('amount').value;
    const sourceCurrency = document.getElementById('sourceCurrency').value;
    const targetCurrency = document.getElementById('targetCurrency').value;
    const resultField = document.getElementById('result');
    const selectedRateField = document.getElementById('selectedRate');

    if (amount && sourceCurrency && targetCurrency) {
        fetchExchange(amount, sourceCurrency, targetCurrency, resultField, selectedRateField);
    } else {
        resultField.value = 'Please fill in all fields';
    }
});

function fetchExchange(amount, sourceCurrency, targetCurrency, resultField, selectedRateField) {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${sourceCurrency}/${targetCurrency}/${amount}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                const conversionResult = data.conversion_result;
                resultField.value = `${amount} ${sourceCurrency} = ${conversionResult} ${targetCurrency}`;
                selectedRateField.value = `1 ${sourceCurrency} = ${data.conversion_rate} ${targetCurrency}`;

                // Fetch and display exchange rates
                fetchExchangeRates(sourceCurrency);
            } else {
                resultField.value = 'Error fetching conversion rate';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultField.value = 'Error fetching conversion rate';
        });
}

function fetchExchangeRates(baseCurrency) {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                const conversionRates = data.conversion_rates;
                const exchangeRatesList = document.getElementById('exchangeRates');

                // Clear previous exchange rates
                exchangeRatesList.innerHTML = '';

                // Populate exchange rates list using the provided currencies array
                for (const [code, name] of Object.entries(CURRENCIES)) {
                    if (conversionRates[code]) {
                        const rateItem = document.createElement('li');
                        rateItem.className = 'list-group-item';
                        rateItem.textContent = `${name} = ${conversionRates[code]}`;
                        exchangeRatesList.appendChild(rateItem);
                    }
                }
            } else {
                console.error('Error fetching exchange rates');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}