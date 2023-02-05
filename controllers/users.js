const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


router.get('/signup', (req, res) => {
    res.render('signup.ejs')
})

router.post('/signup', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    User.create(req.body, (err, newUser) => {
        res.redirect('/getfit/workouts')
    })
})


module.exports = router