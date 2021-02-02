const Joi = require('joi');
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    auther: { type: String },
    tags: [{ type: String }],
    date: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: false }
  });
  
  // Model
  const Course = mongoose.model('Course', courseSchema);
  
  function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        auther: Joi.string(),
        tags: Joi.array().items(Joi.string()),
        date: Joi.date(),
        isPublished: Joi.boolean()
    });

    // return Joi.validate(course, schema);
    return schema.validate(course);
}

exports.Course = Course;
exports.courseSchema = courseSchema;
exports.validate = validateCourse;

