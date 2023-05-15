const express = require('express')
const router = express.Router()

// import post model
const Post = require('../models/Post')

// passing data to the page / ejs template engine
const locals = {
    title: "NodeJS Blog",
    desc: "simple blog with node, express and mongodb"
}

// routes

// Home route
router.get('', async (req, res) => {
   
    // call this fn once then comment it out again
    //insertPostDummyData();

    // fetching the data from the blog collection
    // and aggregate for pagination
    try {
        // const data = await Post.find()

        let perPage = 5
        // http://localhost:5000/?page=2
        // console.log(req.query.page) -> 2
        let page = req.query.page || 1
        
        // $sort by createdAt -1 (oldest at the top)
        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec()

        const count = await Post.count()
        const nextPage = parseInt(page) + 1
        const hasNextPage = nextPage <= Math.ceil(count / perPage)
        
        res.render('index', {
            locals, 
            data,
            current: page, 
            nextPage: hasNextPage ? nextPage : null
        })
    } catch (error) {
        console.log(error);
    }
    
})


// details page with a single post 
router.get('/post/:id', async (req, res) => {

    try {
        let id = req.params.id
        const post = await Post.findById(id)
        res.render('details', {locals, post})        
    } catch (error) {
        console.log(error);
    }

})
// details page with a single post 
router.get('/post/:id', async (req, res) => {

    try {
        let id = req.params.id
        const post = await Post.findById(id)
        res.render('details', {locals, post})        
    } catch (error) {
        console.log(error);
    }

})

// search  
router.post('/search', async (req, res) => {

    try {
        let searchTerm = req.body.searchTerm
        // console.log(searchTerm);
        // sanitize the searchTerm by removing specialchars
        const searchNoSpecialChar = searchTerm.replace(/[a-zA-Z0-9]/g, "")

        // search with mongoose by using regex
        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
            ]   
        })
        res.render("search", {
            locals, 
            data
        })        
    } catch (error) {
        console.log(error);
    }

})

function insertPostDummyData() {
    Post.insertMany([
        {
            title: "Building a blog 1",
            body: "Body text 1"
        },
        {
            title: "Building a blog 2",
            body: "Body text 2"
        },
        {
            title: "Building a blog 3",
            body: "Body text 3"
        },
        {
            title: "Building a blog 4",
            body: "Body text 4"
        },
        {
            title: "Building a blog 5",
            body: "Body text 5"
        },
        {
            title: "Building a blog 6",
            body: "Body text 6"
        },
        {
            title: "Building a blog 7",
            body: "Body text 7"
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