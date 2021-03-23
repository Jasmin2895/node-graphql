const controller = require('../controllers/users');
const validateToken = require('../utils').validateToken;
const rateLimiter = require('./../middleware');

module.exports = (router) => {
  router.route('/users')
    .post(controller.add)
    .get(validateToken, controller.getAll);
  
  router.route('/login')
    .post(rateLimiter, controller.login)
};