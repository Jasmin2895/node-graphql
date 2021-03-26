const axios = require('axios');

const API_ENDPOINTS = {
    COUNTRIES: 'https://restcountries.eu/rest/v2/name/',
    EXCHANGE_RATE: 'https://api.exchangeratesapi.io/latest?base=SEK',
};

module.exports = {
    Query: {
        getCountries: async (parent, { name }) => {
            try {
                const countries = await axios.get(
                    `${API_ENDPOINTS.COUNTRIES}${name}`,
                );
                const { data } = await axios.get(
                    `${API_ENDPOINTS.EXCHANGE_RATE}`,
                );
                let currencyList = [];
                if (data && data.rates) {
                    currencyList = Object.keys(data.rates);
                }
                const getExachangeRate = (countryCurrency) => {
                    if (currencyList.indexOf(countryCurrency) > -1) {
                        return data.rates[countryCurrency];
                    } else {
                        return -1;
                    }
                };
                return countries.data.map(
                    ({
                        name,
                        capital,
                        region,
                        population,
                        currencies,
                    }) => ({
                        name,
                        capital,
                        region,
                        population,
                        currencies,
                        exchangeRate: getExachangeRate(
                            currencies[0].code,
                        ),
                    }),
                );
            } catch (error) {
                throw error;
            }
        },
    },
};
