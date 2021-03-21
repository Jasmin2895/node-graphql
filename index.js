require('dotenv').config();

const experss = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser'); // add all the information we pass to the API to the request.body
const { ApolloServer } = require("apollo-server-express")

const app = experss();
const router = experss.Router();

const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];
const routes = require('./routes/index.js');
const typeDefs = require('./graphql/schema')
const resolvers =require('./graphql/resolver')
const rateLimiter = require('./middleware/');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

if (environment !== 'production') {
    app.use(logger('dev'));
    app.use('/', logger('dev'));
}

app.use('/api/v1', routes(router));

//Mount a jwt or other authentication middleware that is run before the GraphQL execution
// app.use(path, jwtCheck);

const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

server.applyMiddleware({ app }); 
app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;