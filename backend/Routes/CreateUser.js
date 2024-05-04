const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = "MynameisSecretSuperstar";

// console.log("running");
router.post('/createuser', 
[body('email').isEmail(),
body('name').isLength({min: 3}),
// password must be atleast 5 chars
body('password', 'Password must have minimum 5 characters').isLength({min: 5})],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
// by using bcrypt hashing algorithm to store user password
    const salt = await bcrypt.genSalt(10);
    let securedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        // console.log("running");
      await User.create({
            name: req.body.name,
            password: securedPassword,
            email: req.body.email,
            location: req.body.location
        });
    
    res.json({success: true}); 
    } catch (error) {
        console.log(error);
        res.json({success: false}); 
    }
})


router.post('/loginuser',[body('email').isEmail(),
body('password', 'Password must have minimum 5 characters').isLength({min: 5})],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    let email = req.body.email;
    try {
        let userData = await User.findOne({email});
        if (!userData) {
            return res.status(400).json({errors: "Try logging with correct credentials"});
        }

        // comparing the entered encrypted data with the already saved data in database
        const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
        if (!pwdCompare) {
            return res.status(400).json({errors: "Try logging with correct credentials"});
        }

        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        
        if (userData.role === 'admin') {
            return res.json({ success: true, authToken: authToken, role: 'admin' });
        }

        return res.json({success: true, authToken: authToken, role: 'user', id: userData.id });

    } catch (error) {
        console.log(error);
        res.json({success: false}); 
    }
})

module.exports = router;