const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const JWT_SECRET = "Harryisagood$boy" //Normally on config file

//Create A User using : POST "/api/auth/" .
router.post('/createuser', [
    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', "Password should be at least 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Check whether the user with this same email exists already.
    try {
        let user = await User.findOne({ email: req.body.email })
        console.log(user)
        if (user) {
            return res.status(400).json({ error: "Sorry this user already exits" })
        }

        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt)
        

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        const data = {
            user: {
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
        res.json({authToken})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occurred")
    }

    //   then(user => res.json(user)).catch((error)=>console.log(error),res.json({error:"Please enter unique value for email"}))
})



module.exports = router