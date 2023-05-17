const express = require('express')
const router = express.Router()

// import post model
const Post = require('../models/Post')
const User = require('../models/User')

const adminLayout = '../views/layouts/admin'

/**
 * GET
 * Admin - Login 
 */
router.get('/admin', async (req, res) => {
    
    const locals = {
        title: "Admin",
        desc: "simple blog with node, express and mongodb"
    }

    try {
        res.render('admin/index', { locals, layout: adminLayout })        
    } catch (error) {
        console.log(error);
    }

})

/**
 * POST
 * Admin - Check login credentials 
 */
router.post('/admin', async (req, res) => {

    try {
        // quick test if login works (before i hook it up to the db)
        // destructure usename & password from the form
        const { username, password } = req.body
        if(username === 'admin' && password === 'password') {
            res.send('you are logged in')
        } else {
            res.send('Wrong credentials')
        }

        // res.render('admin/index', { locals, layout: adminLayout })        
    } catch (error) {
        console.log(error);
    }

})
module.exports = router