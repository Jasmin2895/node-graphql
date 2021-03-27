const { gql } = require('apollo-server-express');

module.exports = gql`
    type Countries {
        name: String
        capital: String
        region: String
        population: Int
        currencies: [Currencies!]
        exchangeRate: Float
        countrynNames: [String]
    }
    type Currencies {
        code: String
        name: String
        symbol: String
    }
    type Query {
        getCountries(name: String!): [Countries]
    }
`;
