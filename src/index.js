// Express App
const express = require('express');
const app = express();

// START UP
const logger = require("./startup/logging.js");
// Debug
if (app.get("env") === "development") {
  require("./startup/debug")(app);
}

// moved to here for debug comfort. need to use it inside startup/routes
const publicPath = `${__dirname}/./../client/`;
app.use("/", express.static(publicPath));

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require("./startup/prod")(app);

// Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  // console.log(`Listening on port ${port}...`)
  logger.info(`Listening on port ${port}...`)
);

logger.info("Application Server Is Up!");

module.exports = server;

// const debug = require('debug')('app:startup');
// const morgan = require('morgan');
// const helmet = require('helmet');
// const logger = require('./middleware/logger');

// if (app.get('env') === 'development') {
//   app.use(morgan('tiny'));
//   debug('Morgan enabled...');
//   // console.log('Morgan enabled...');
//   // console.log(`app: ${app.get('env')}`);
// }

// app.use(logger);

// app.use(function (req, res, next) {
//   console.log('Authenticating...');
//   next();
// });

// const courseSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   auther: String,
//   tags: [String],
//   date: { type: Date, default: Date.now },
//   isPublished: Boolean
// });

// // Model
// const Course = mongoose.model('Course', courseSchema);

// async function createCourse() {
//   const course = new Course({
//     name: 'Angular Course', // 'Node.js Course'
//     auther: 'IDO',
//     tags: ['angular', 'backend'], // 'node'
//     isPublished: true
//   });

//   try {
//     const result = await course.save();
//     console.log(result);
//   } catch(ex) {
//     console.log(ex.message);
//   }
// }

// async function getCourses() {
//   const courses = await Course.find().sort({
//     name: 1
//   });
//   console.log(courses);
// }

// async function updateCourse(id) {
//   const result = await Course.updateOne({
//     _id: id
//   }, {
//     $set: {
//       auther: 'Another Author',
//       isPublished: false
//     }
//   });
//   console.log('Update!!!');
//   console.log(result);
// }

// async function removeCourse(id) {
//   const result = await Course.deleteOne({
//     _id: id
//   });
//   console.log('Delete!!!');
//   console.log(result);
// }

// getCourses();
// // createCourse();
// updateCourse('5ffc797b8dca52442c554a9f');
// // removeCourse('5ffc77616cb3f9456416e2b7');

// // Configuration
// console.log('Application Name: ' + config.get('name'));
// console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));