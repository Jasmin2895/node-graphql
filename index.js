require('dotenv').config();

const experss = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser'); // add all the information we pass to the API to the request.body


const app = experss();
const router = experss.Router();

console.log("PORT", process.env.PORT)
const environment = process.env.NODE_ENV;
console.log("environment", environment)
const stage = require('./config')[environment];
const routes = require('./routes/index.js');


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