const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
    windowMs: 1000, // 15 minutes
    max: 1, // limit each IP to 100 requests per windowMs
    message: "Too many accounts created from this IP, please try again after an hour"
  });


