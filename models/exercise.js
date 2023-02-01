const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exerciseSchema = new Schema ({
    name: {type: String},
    category: {type: String},
    videoUrl: {type: String},
    img: {type: String},
    eq: {type: String},
    sets: {type: Number},
    reps: {type: String},
    dificulty: {type: String},
    workoutName: {type: String}
})

module.exports = mongoose.model('Exercise', exerciseSchema)