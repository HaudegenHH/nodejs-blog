const express = require('express')
const router = express.Router()

// import post and user model
const Post = require('../models/Post')
const User = require('../models/User')

// for en- and decrypting the password
const bcrypt = require('bcrypt')

// JWT for the cookie
const jwt = require('jsonwebtoken')

// JWT Secret
const jwtSecret = process.env.JWT_SECRET

// path to admin layout
const adminLayout = '../views/layouts/admin'

// *************************************************************

/**
 * 
 * Check Login
*/
const authMiddleware = (req, res, next ) => {
    const token = req.cookies.token;
  
    if(!token) {
      return res.status(401).json( { message: 'Unauthorized'} );
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.userId;
      next();
    } catch(error) {
      res.status(401).json( { message: 'Unauthorized'} );
    }
  }

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
// router.post('/admin', async (req, res) => {

//     try {
//         // quick test if login works (before i hook it up to the db)
//         // destructure usename & password from the form
//         const { username, password } = req.body
//         if(username === 'admin' && password === 'password') {
//             res.send('you are logged in')
//         } else {
//             res.send('Wrong credentials')
//         }

//         // res.render('admin/index', { locals, layout: adminLayout })        
//     } catch (error) {
//         console.log(error);
//     }

// })


/**
 * POST /
 * Admin - Check Login
*/
router.post('/admin', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await User.findOne( { username } );
  
      if(!user) {
        return res.status(401).json( { message: 'Invalid credentials' } );
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if(!isPasswordValid) {
        return res.status(401).json( { message: 'Invalid credentials' } );
      }
  
      // cookie with the token inside will be stored in the browsers cookie store
      // and will keep the user logged in 
      const token = jwt.sign({ userId: user._id}, jwtSecret );
      res.cookie('token', token, { httpOnly: true });
      res.redirect('/dashboard');
  
    } catch (error) {
      console.log(error);
    }
});

/**
 * POST /
 * Admin - Register
*/
router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;

      // 2nd param is the salt which is used in encryption,
      // the 10 specify the number of rounds (of "salting")
      const hashedPassword = await bcrypt.hash(password, 10);
  
      try {
        const user = await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: 'User Created', user });

      } catch (error) {
        
        if(error.code === 11000) {
          res.status(409).json({ message: 'User already in use'});
        }

        res.status(500).json({ message: 'Internal server error'})
      }
  
    } catch (error) {
      console.log(error);
    }
});

/**
 * GET /
 * Admin Dashboard
 * protected with authMiddleware, which checks if there is a valid token
*/
router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
      const locals = {
        title: 'Dashboard',
        description: 'Simple Blog created with NodeJs, Express & MongoDb.'
      }
  
      const data = await Post.find();
      res.render('admin/dashboard', {
        locals,
        data,
        layout: adminLayout
      });
  
    } catch (error) {
      console.log(error);
    }
  
});

/**
 * GET /
 * Admin Create new Post
*/
router.get('/add-post', authMiddleware, async (req, res) => {
    try {
      const locals = {
        title: 'Add New Post',
        description: 'Simple Blog created with NodeJs, Express & MongoDb.'
      }
  
      const data = await Post.find();
      res.render('admin/add-post', {
        locals,        
        layout: adminLayout
      });
  
    } catch (error) {
      console.log(error);
    }
  
});

/**
 * POST /
 * Admin Create new Post
*/
router.post('/add-post', authMiddleware, async (req, res) => {

    const { title, body } = req.body

    try {
      const post = await Post.create({ title, body })
      res.redirect('/dashboard')  
    } catch (error) {
      console.log(error);
    }
  
});


module.exports = router