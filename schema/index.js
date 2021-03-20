export const schema = buildSchema(`
    type Query {
        country(name: String!): Countries
    },
    type Countries {
        name: String
        capital: String
        region: String
        population: Int
        currencies: [Currencies!]!
    }
    type Currencies {
        code: String
        name: String
        symbol: String
    }
`);

