const winston = require("winston");
const {createLogger, transports } = winston
const { combine, timestamp, printf, prettyPrint } = winston.format;
require("express-async-errors");

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level}]: ${message}`;
});

const logger = createLogger({
  level: "http",
  format: combine(timestamp(), prettyPrint(), myFormat),
  // format: winston.format.json(),
  // defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({
      filename: "./log/error.log",
      level: "error",
    }),
    new transports.Console({ level: "error" }),
    new transports.File({ filename: "./log/combined.log" }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: "./log/exceptions.log" }),
    new transports.Console({format: winston.format.simple()})
  ],
  rejectionHandlers: [
    new transports.File({ filename: "./log/rejections.log" }),
    new transports.Console({format: winston.format.simple()})
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(timestamp(), prettyPrint(), myFormat),
      level: "info",
    })
  );
}

module.exports = logger;



// const winston = require('winston');
// require('winston-mongodb');
// require('express-async-errors');

// // Main function
// module.exports = function () {
//     winston.handleExceptions(
//         new winston.transports.Console({
//             colorize: true,
//             prettyPrint: true
//         }),
//         new winston.transports.File({
//             filename: 'uncaughtExceptions.log'
//         })
//     );

//     process.on('unhandledRejection', (ex) => {
//         throw ex;
//     });

//     winston.add(winston.transports.File, {
//         filename: 'logfile.log'
//     });
//     winston.add(winston.transports.MongoDB, {
//         db: 'mongodb://localhost/harel-web',
//         level: 'info'
//     });
// }
