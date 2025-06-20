const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res)=> {
    const user = await User.findById(req.user._id).select('-password');
    if(!user) return res.status(400).send('Bad request');
    res.status(200).send(user);
})


router.post('/', async (req, res)=> {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    console.log(error);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(404).send("User already registered...");
    
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    
    const salt =  await bcrypt.genSalt(10);
     
    user.password = await bcrypt.hash(user.password, salt);;


    await user.save();
    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']));

})

module.exports = router;

