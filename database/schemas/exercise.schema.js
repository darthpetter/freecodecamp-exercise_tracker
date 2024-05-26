const mongoose = require('mongoose');
const mongooseConnectionInstance = require('../mongoose.config');


const ExerciseSchema = new mongoose.Schema({
    userId: String,
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
})

const ExerciseModel = mongoose.model('Exercise', ExerciseSchema)

module.exports = ExerciseModel