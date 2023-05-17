require('dotenv').config()

const express = require('express')
const expressLayout = require('express-ejs-layouts')

const connectDB = require('./server/config/db')

const app = express()

// connect to mongodb 
connectDB()

// middleware added, to pass data through forms
app.use(express.urlencoded({extended: true}))
app.use(express.json())


const PORT = process.env.PORT || 5000

// for the static files like css, img or js
app.use(express.static('public'))

// register ejs template engine as middleware
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// register routes
app.use('/', require('./server/routes/main'))
app.use('/', require('./server/routes/admin'))

app.listen(PORT, () => {
    console.log(`Server is listening on port: http://localhost:${PORT}`)
})
