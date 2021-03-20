require('dotenv').config();

const experss = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser'); // add all the information we pass to the API to the request.body

const app = experss();
const router = experss.Router();

const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];
const routes = require('./routes/index.js');

// import GraphQL libraries
const { graphqlHTTP }  = require('express-graphql');
const { buildSchema } = require('graphql');

//FIXME: sample schema using GraphQL server. Move it to schema folder Later
const schema = buildSchema(`type Query { hello: String}`)

// root resolver
var root = {
    hello: () => {
      return 'Hello world!';
    },
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

if (environment !== 'production') {
    app.use(logger('dev'));
    app.use('/', logger('dev'));
}

app.use('/api/v1', routes(router));

app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;