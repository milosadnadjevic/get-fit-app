const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

//sign up routes
router.get('/signup', (req, res) => {
    res.render('signup.ejs')
})

router.post('/signup', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    User.create(req.body, (err, newUser) => {
        req.session.userId = newUser._id
        res.redirect('/getfit/workouts')
    })
})

// login route

router.get('/login', (req, res) => {
    res.render('login.ejs')
})

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, foundUser) => {
        if(!foundUser) {
            return res.redirect('/login')
        }
        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password)
        if(!isMatched) {
            return res.redirect('/login')
        }
        req.session.userId = foundUser._id

        res.redirect('/getfit/workouts')
    })
})




router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/')
    })
})

module.exports = router