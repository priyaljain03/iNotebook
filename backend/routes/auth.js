const express = require('express')
const router = express.Router()
const User = require('../models/User')



//Create A User using : POST "/api/auth/" . Doesnt require auth

router.post('/',(req,res)=>{
    const user = User(req.body)
    user.save() 
    res.send("Hello")
})



module.exports = router