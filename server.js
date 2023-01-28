// dependencies
const express = require('express')

// initialize the app
const app = express()

// configure settings
require('dotenv').config()
const PORT = process.env.PORT
// establish connection to mongodb

// mount middleware

// mount routes

// tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`)
})