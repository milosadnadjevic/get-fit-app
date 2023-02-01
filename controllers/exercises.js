const express = require('express')
const router = express.Router()
const data = require('../data')
const Exercise = require('../models/exercise')

// index
router.get('/getfit/workouts', (req, res) => {
    res.render('workouts.ejs')
})


router.get('/getfit/back', (req, res) => {
    Exercise.find({category: 'back'}, (error, backExercises) => {
        res.render('back.ejs', {
            exercises: backExercises
        })
    })
})
router.get('/getfit/chest', (req, res) => {
    Exercise.find({category: 'chest'}, (error, allChestExercises) => {
        res.render('chest.ejs', {
            exercises: allChestExercises
        })
    })
})
router.get('/getfit/shoulders', (req, res) => {
    Exercise.find({category: 'shoulders'}, (error, shouldersExercises) => {
        res.render('shoulders.ejs', {
            exercises: shouldersExercises
        })
    })
})
router.get('/getfit/arms', (req, res) => {
    Exercise.find({category: 'arms'}, (error, armsExercises) => {
        res.render('arms.ejs', {
            exercises: armsExercises
        })
    })
})
router.get('/getfit/legs', (req, res) => {
    Exercise.find({category: 'legs'}, (error, legsExercises) => {
        res.render('legs.ejs', {
            exercises: legsExercises
        })
    })
})
router.get('/getfit/fullbody', (req, res) => {
    Exercise.find({category: 'full body'}, (error, fullbodyExercises) => {
        res.render('fullbody.ejs', {
            exercises: fullbodyExercises
        })
    })
})
router.get('/getfit/abs', (req, res) => {
    Exercise.find({category: 'abs'}, (error, absExercises) => {
        res.render('abs.ejs', {
            exercises: absExercises
        })
    })
})
router.get('/getfit/functional', (req, res) => {
    Exercise.find({category: 'functional'}, (error, functionalExercises) => {
        res.render('functional.ejs', {
            exercises: functionalExercises
        })
    })
})

// new
router.get('/getfit/new', (req, res) => {
    res.render('new.ejs')
})

// delete
router.delete('/getfit/workouts/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id, (eror, deletedExercise) => {
        res.redirect('/getfit/workouts')
    })
})

// update
router.put('/getfit/workouts/:id', (req, res) => {
    Exercise.findByIdAndUpdate(req.params.id, req.body, (error, Exercise) => {
        res.redirect('/getfit/workouts')
    })
})

// create
router.post('/getfit/workouts', (req, res) => {
    Exercise.create(req.body, (error, createdExercise) => {
         res.render('workouts.ejs')
    })
})

// edit
router.get('/getfit/workouts/:id/edit', (req, res) => {
    Exercise.findById(req.params.id, (error, foundExercise) => {
        res.render('edit.ejs', {
            exercise: foundExercise
        })
    })
})

// show
router.get('/getfit/workouts/:name', (req, res) => {
    Exercise.findById(req.params.name, (error, foundExercise) => {
        res.render('show.ejs', { exercise: foundExercise})
    })
})

module.exports = router