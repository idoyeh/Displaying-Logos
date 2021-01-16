// Handle Errors
const logger = require('../startup/logging');
// const winston = require('winston');

module.exports = function(err, req, res, next){
    // Log the exception
    // logger.error(err.message, err);

    // winston.error(err.message, err);

    // error
    // warn
    // info
    // verbose
    // debug
    // silly
    console.log(err);
    res.status(500).send('Something failed.');
}