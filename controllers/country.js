const mongoose = require('mongoose');
const Country = require('../models/country');

const connUri = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {
    addCountries: (req, res)=> {
        const {name, population, currency, exchangeRate} = req.body;
        mongoose.connect(connUri, { useNewUrlParser : true }, (err) => {
            let result = {};
            let status = 201;
            if (!err) {
                const country = new Country({ name, population, currency, exchangeRate });
                country.save((err, country)=> {
                    if (!err) {
                        result.status = status;
                        result.result = country;
                      } else {
                        status = 500;
                        result.status = status;
                        result.error = err;
                      }
                    res.status(status).send(result);
                })
            }else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        })
    },
    getAllSavedCountries: (req, res) => {
        mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
            Country.find({}, (err, countries) => {
              if (!err) {
                res.send(countries);
              } else {
                console.log('Error', err);
              }
            });
        });
    }
}