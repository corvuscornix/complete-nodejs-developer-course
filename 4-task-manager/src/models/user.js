const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        validate (value) {
            if (!validator.isEmail(value)) {
                throw new Error('Not a valid email');
            }
        },
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate (value) {
            if (value.toLowerCase().includes('password')) throw new Error('cannot contain word "password"');

            return true;
        }
    }
});

module.exports = User;