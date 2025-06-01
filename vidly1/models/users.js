const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const Joi = require('joi');

mongoose.connect('mongodb://localhost/')
    .then(()=> console.log('connect to DB...'))
    .catch(err => console.log('error', err.message));

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 5,
        max: 50,
        required: true
    },
    password: {
        type: String,
        min: 5,
        max: 1024,
        required: true
    },
    email: {
        type: String,
        min: 5,
        max: 255,
        required: true,
        unique: true
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, config.get('jwtSecrete'));
    return token;
}

const User =  mongoose.model('Users', userSchema)

function validateUsers(user){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    }
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUsers;