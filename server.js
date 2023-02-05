// dependencies
const express = require('express')
const mongoose = require('mongoose')
const exerciseRouter = require('./controllers/exercises')
const usersRouter = require('./controllers/users')
// const Exercise = require('./models/exercise')
const methodOverride = require('method-override')
const session = require('express-session')

// initialize the app
const app = express()

// configure settings
require('dotenv').config()
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

// connection to mongodb
mongoose.set('strictQuery', false)
mongoose.connect(DATABASE_URL)

const db = mongoose.connection

db.on('connected', () => {
    console.log('Connected to MongoDB')
})

db.on('error', (error) => {
    console.log('An error occured with MongoDB' + error.message)
})

// middleware
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'notimportant',
    resave: false,
    saveUninitialized: false
}))

function isAuthenticated(req, res, next) {
    if(!req.session.userId){
        return res.redirect('/login')
    }
    next()
}

// routes
// homepage
app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.use(usersRouter)
app.use(isAuthenticated, exerciseRouter)


// tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`)
})