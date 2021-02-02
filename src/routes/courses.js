const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Course, validate } = require('../models/course');
const bcrypt = require('bcrypt');
const _ = require('lodash'); // Pick/Select values from object

router.get('/', async (req, res) => {
    const courses = await Course.find().sort('name');
    
    res.status(200).send(courses);
    console.log(courses);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let course = new Course(_.pick(req.body, ['name', 'auther', 'tags', 'date', 'isPublished']));
    await course.save();

    res.status(200).send(course);
    console.log(course);
});

// router.post('/', auth, async (req, res) => {
//     const { error } = validate(req.body);
//     if (error) {
//         return res.status(400).send(error.details[0].message);
//     }

//     let course = new Course({
//         name: req.body.name,
//         auther: req.body.auther,
//         tags: req.body.tags,
//         date: req.body.date,
//         isPublished: req.body.isPublished
//     });
//     course = await course.save();
//     res.status(200).send(course);

//     // const token = course.generateAuthToken();
//     // res.status(200).header('x-auth-token', token).send(_.pick(course, ['name', 'auther', 'tags', 'date', 'isPublished']));
// });

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = await Course.findByIdAndUpdate(req.params.id, {
        name: req.params.name,
        auther: req.params.auther,
        tags: req.params.tags,
        date: req.params.date,
        isPublished: req.params.isPublished
    }, {
        new: true
    });
    if (!course) return res.status(404).send('ID ERROR!');

    res.status(200).send(course);
    console.log(course);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id);

    if (!course) return res.status(404).send('ID ERROR!');

    res.status(200).send(course);
    console.log(course);
});

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).send('ID ERROR!');

    res.status(200).send(course);
    console.log(course);
});

module.exports = router;


////////////////////////////////////////
////////////////////////////////////////

// const express = require('express');
// const router = express.Router();

// const courses = [{
//         id: 1,
//         name: 'course1'
//     },
//     {
//         id: 2,
//         name: 'course2'
//     },
//     {
//         id: 3,
//         name: 'course3'
//     }
// ];

// router.get('/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) return res.status(404).send('ID ERROR!');

//     res.send(course);
//     console.log(course);
// });

// router.get('/', (req, res) => {
//     res.send(courses);
//     console.log(courses);
// });

// router.post('/', (req, res) => {
//     const {
//         error
//     } = validateCourse(req.body);
//     if (error) {
//         // 400 Bad Request
//         return res.status(400).send(error.details[0].message);
//     }

//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     };
//     courses.push(course);
//     res.send(course);
//     console.log(course);

//     // const schema = Joi.object({
//     //   name: Joi.string().min(3).required()
//     // });

//     // const result = schema.validate(req.body);
//     // console.log(result);

//     // if (result.error){
//     //   // 400 Bad Request
//     //   res.status(400).send(result.error.details[0].message);
//     //   return;
//     // }

//     // const schema = {
//     //   name: Joi.string().min(3).required()
//     // };

//     // const result = Joi.validate(req.body, schema);
//     // console.log(result);


//     // if (!req.body.name || req.body.name.length < 3){
//     //   // 400 Bad Request
//     //   res.status(400).send('Name is required and should be minimum 3 charcter');
//     //   return;
//     // }

// });

// router.put('/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) return res.status(404).send('ID ERROR!');

//     const {
//         error
//     } = validateCourse(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     course.name = req.body.name;
//     res.send(course);
//     console.log(course);
// });

// router.delete('/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) return res.status(404).send('ID ERROR!');

//     const index = courses.indexOf(course);
//     courses.splice(index, 1);

//     res.send(course);
//     console.log(course);
// });

// function validateCourse(course) {
//     const schema = Joi.object({
//         name: Joi.string().min(3).required()
//     });

//     return schema.validate(course);
// }

// module.exports = router;

////////////////////////////////////////
////////////////////////////////////////