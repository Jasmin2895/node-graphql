const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 30, // limit each IP to 30 requests per windowMs
    message:
        'Too many accounts created from this IP, please try again after an hour',
});
