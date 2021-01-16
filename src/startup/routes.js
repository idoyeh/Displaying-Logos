// Express Import
const express = require('express');
const cors = require('cors');

// Routes Import
const home = require('../routes/home');
const instegram = require('../routes/instegram');
const logo = require('../routes/logo');
const courses = require('../routes/courses');
const users = require('../routes/users');
const auth = require('../routes/auth');

// Error Middleware Import
const error = require('../middleware/error');

// Main function
module.exports = function (app) {
    app.use(cors({
        exposedHeaders: ['x-auth-token']
    }));
    app.use(express.json());
    app.use('/', home);
    app.use('/instegram', instegram);
    app.use('/logo', logo);
    app.use('/api/courses', courses);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
    // app.use(express.urlencoded({
    //     extended: true
    // }));
    // app.use(helmet());
    // app.use(express.static('public'));
}