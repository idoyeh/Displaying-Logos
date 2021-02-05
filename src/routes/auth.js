const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User} = require('../models/user');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message); }

    let user = await User.findOne( { email: req.body.email } );
    if (!user) { return res.status(404).send('Invalid email or password.'); }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) { return res.status(400).send('Invalid email or password.'); }

    const token = user.generateAuthToken();
    res.send(token);
});

// POST ['api/auth/login']       -   Login
router.post('/login', async (req, res) => {
    console.log("--- Login ---");
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message); }

    let user = await User.findOne( { name: req.body.name } );
    if (!user) { return res.status(404).send('Invalid name or password.'); }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) { return res.status(400).send('Invalid name or password.'); }

    // const token = user.generateAuthToken();
    // res.send(token);

    // Create JWT
    res.header('x-auth-token', user.generateAuthToken());
    res.send(_.pick(user, ['name', 'password']));
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).email(),
        name: Joi.string().min(2).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    });

    // return Joi.validate(req, schema);
    return schema.validate(req);
}

module.exports = router;
