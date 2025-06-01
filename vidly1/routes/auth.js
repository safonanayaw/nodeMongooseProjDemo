const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();




router.post('/', async (req, res)=> {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    console.log(error);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Invalid email or password");
    
    const ValidPassword = await bcrypt.compare(req.body.password, user.password);
    if(!ValidPassword) return res.status(400).send("Invalid email or password");

     const token = user.generateAuthToken();
     console.log(token);

})

function validate(user){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }
    return Joi.validate(user, schema);
}

module.exports = router;

