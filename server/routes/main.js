const express = require('express')
const router = express.Router()

// import post model
const Post = require('../models/Post')

// routes

// Home route
router.get('/', async (req, res) => {
    // passing data to the page / ejs template engine
    const locals = {
        title: "NodeJS Blog",
        desc: "simple blog with node, express and mongodb"
    }
    
    // call this fn it once then comment it out again
    // insertPostDummyData();

    // fetching the data from the blog collection
    try {
        const data = await Post.find()
        res.render('index', {locals, data})
    } catch (error) {
        console.log(error);
    }

})

function insertPostDummyData() {
    Post.insertMany([
        {
            title: "Building a blog",
            body: "Body text"
        },
        {
            title: "Building a blog 2",
            body: "Body text 2"
        },
    ])
}

router.get('/about', (req, res) => {
    res.render('about')
})
router.get('/contact', (req, res) => {
    res.render('contact')
})

module.exports = router