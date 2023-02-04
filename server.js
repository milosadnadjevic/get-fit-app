// dependencies
const express = require('express')
const mongoose = require('mongoose')
const exerciseRouter = require('./controllers/exercises')
// const Exercise = require('./models/exercise')
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


// routes
// homepage
app.get('/', (req, res) => {
    res.render('home.ejs')
})
app.use(exerciseRouter)

// tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`)
})