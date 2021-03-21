const { gql } = require("apollo-server-express")

module.exports = gql`
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
        countries: [Countries]
        getCountries(name: String!): [Countries]
    }
`


// module.exports = {typeDefs}
// module.exports = buildSchema(`
//     type Countries {
//         name: String
//         capital: String
//         region: String
//         population: Int
//         currencies: [Currencies!]
//         exchangeRate: Float
//     }
//     type Currencies {
//         code: String
//         name: String
//         symbol: String
//     }
//     type Query {
//         country: [Countries]
//     }
// `)