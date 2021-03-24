const axios = require("axios")
module.exports = {
    Query: {
      countries: async (parent) => {
        try {
            //FIXME: using https://exchangeratesapi.io/ instead of the fixer.io
            // const FIXER_API_KEY = "65a46a3c3c9c4a87ab07b6a72500b80d" 
            // Send country name in the API and Add a way to limit the API.
            console.log("parent", parent)
          const countries = await axios.get("https://restcountries.eu/rest/v2/name/ind")
          const { data } = await axios.get(`https://api.exchangeratesapi.io/latest?base=SEK`)
          let currencyList = [];
          if(data && data.rates){
            currencyList = Object.keys(data.rates)
          }
          console.log("countries", )
          const getExachangeRate = (countryCurrency) =>{
              console.log("countryCurrency",countryCurrency,currencyList.indexOf(countryCurrency)> -1 )
              if(currencyList.indexOf(countryCurrency)> -1){
                return data.rates[countryCurrency]
              }else {
                  return -1;
              }
          }
        //   console.log("getCurrencies", data)
          return countries.data.map(({ name, capital, region, population, currencies }) => ({
            name,
            capital,
            region,
            population,
            currencies,
            exchangeRate: getExachangeRate(currencies[0].code)
          }))
        } catch (error) {
          throw error
        }
      },
      getCountries: async(parent, {name}) => {
        console.log("name", name)
        try {
          const countries = await axios.get(`https://restcountries.eu/rest/v2/name/${name}`)
          const { data } = await axios.get(`https://api.exchangeratesapi.io/latest?base=SEK`)
          let currencyList = [];
          if(data && data.rates){
            currencyList = Object.keys(data.rates)
          }
          console.log("countries", )
          const getExachangeRate = (countryCurrency) =>{
              console.log("countryCurrency",countryCurrency,currencyList.indexOf(countryCurrency)> -1 )
              if(currencyList.indexOf(countryCurrency)> -1){
                return data.rates[countryCurrency]
              }else {
                  return -1;
              }
          }
        //   console.log("getCurrencies", data)
          return countries.data.map(({ name, capital, region, population, currencies }) => ({
            name,
            capital,
            region,
            population,
            currencies,
            exchangeRate: getExachangeRate(currencies[0].code),
          }))
        }catch(error) {
          throw error
        }
      }      
    }
  }
