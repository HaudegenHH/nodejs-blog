const express = require('express')
const router = express.Router()

// routes
router.get('/', (req, res) => {
    // passing data to the page
    const locals = {
        title: "NodeJS Blog",
        desc: "simple blog with node, express and mongodb"
    }

    res.render('index', {locals})
})
router.get('/about', (req, res) => {
    res.render('about')
})

module.exports = router