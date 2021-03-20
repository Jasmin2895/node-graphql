const { ApolloServer, gql } = require("apollo-server")
const axios = require("axios")
const { formatDate }= require('./helper')

const typeDefs = gql`
    type Countries {
        name: String
        capital: String
        region: String
        population: Int
        currencies: [Currencies!]
        exchangeRate: Float
    }
    type Currencies {
        code: String
        name: String
        symbol: String
    }
    type Query {
        country: [Countries]
    }
`

const resolvers = {
    Query: {
        country: async () => {
        try {
            //FIXME: using https://exchangeratesapi.io/ instead of the fixer.io
            // const FIXER_API_KEY = "65a46a3c3c9c4a87ab07b6a72500b80d"
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
    },
  }
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  
  server.listen().then(({ url }) => console.log(`Server ready at ${url}`))