// dependencies
const express = require('express')
const mongoose = require('mongoose')
const Exercise = require('./models/exercise')
const methodOverride = require('method-override')

// initialize the app
const app = express()

// configure settings

require('dotenv').config()
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

// establish connection to mongodb
mongoose.set('strictQuery', false)
mongoose.connect(DATABASE_URL)

const db = mongoose.connection

db.on('connected', () => {
    console.log('Connected to MongoDB')
})
db.on('error', (error) => {
    console.log('An error occured with MongoDB' + error.message)
})

// mount middleware
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

// mount routes

// index
app.get('/getfit/workouts', (req, res) => {
    res.render('workouts.ejs')
})


app.get('/getfit/back', (req, res) => {
    Exercise.find({category: 'back'}, (error, backExercises) => {
        res.render('back.ejs', {
            exercises: backExercises
        })
    })
})
app.get('/getfit/chest', (req, res) => {
    Exercise.find({category: 'chest'}, (error, allChestExercises) => {
        res.render('chest.ejs', {
            exercises: allChestExercises
        })
    })
})
app.get('/getfit/shoulders', (req, res) => {
    Exercise.find({category: 'shoulders'}, (error, shouldersExercises) => {
        res.render('shoulders.ejs', {
            exercises: shouldersExercises
        })
    })
})
app.get('/getfit/arms', (req, res) => {
    Exercise.find({category: 'arms'}, (error, armsExercises) => {
        res.render('arms.ejs', {
            exercises: armsExercises
        })
    })
})
app.get('/getfit/legs', (req, res) => {
    Exercise.find({category: 'legs'}, (error, legsExercises) => {
        res.render('legs.ejs', {
            exercises: legsExercises
        })
    })
})
app.get('/getfit/functional', (req, res) => {
    Exercise.find({category: 'functional'}, (error, functionalExercises) => {
        res.render('functional.ejs', {
            exercises: functionalExercises
        })
    })
})


// app.get('/getfit/back', (req, res) => {
//     Exercise.find({}, (error, allExercise) => {
//         res.render('back.ejs', {
//             exercise: allExercise
//         })
//     })
// })

// new
app.get('/getfit/new', (req, res) => {
    res.render('new.ejs')
})

// delete
app.delete('/getfit/workouts/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id, (eror, deletedExercise) => {
        res.redirect('/getfit/workouts')
    })
})

// update

// create
app.post('/getfit/workouts', (req, res) => {
    Exercise.create(req.body, (error, createdExercise) => {
         res.render('workouts.ejs')
    })
   
})

// edit
// app.get('/getfit/workouts/:id/edit', (req, res) => {
//     Exercise.findById(req.params.id, (error, foundExercise) => {
//         res.render('edit.ejs', {
//             exercise: foundExercise
//         })
//     })
// })

// show
app.get('/getfit/workouts/:name', (req, res) => {
    Exercise.findById(req.params.name, (error, foundExercise) => {
        res.render('show.ejs', { exercise: foundExercise})
    })
})

// tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`)
})