require('dotenv').config()

const express = require('express')
const expressLayout = require('express-ejs-layouts')

// helping with storing&reading the cookies..
const cookieParser = require('cookie-parser')
const session = require('express-session');
// ..and important for MongoDB session store
const MongoStore = require('connect-mongo')

const connectDB = require('./server/config/db')

const app = express()

// connect to mongodb 
connectDB()

// middleware added, to pass data through forms
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// adding cookie parser as middleware
app.use(cookieParser())

// and for the sessions
app.use(session({
    secret: 'something secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_CONNECTION_STRING
    })  // creating the cookie
    // and setting expiration if wished
    // cookie: {maxAge: new Date(Date.now() + 3600)}
}))

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
