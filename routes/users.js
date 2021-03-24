const userController = require('../controllers/users');
const validateToken = require('../utils').validateToken;
const rateLimiter = require('./../middleware');
const countryController = require('../controllers/country');

module.exports = (router) => {
  router.route('/users')
    .post(userController.add)
    .get(validateToken, userController.getAll);
  
  router.route('/login')
    .post(rateLimiter, userController.login)

  router.route('/countryDetails')
    .post(countryController.addCountries)
    .get(countryController.getAllSavedCountries)
};