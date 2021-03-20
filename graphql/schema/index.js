const { buildSchema } = require("graphql");

module.exports = buildSchema(`
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
`)