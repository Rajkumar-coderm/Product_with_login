const mongoose = require('../config/config.db')
const validator = require('validator');

const userShema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "Email id is already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    fullName: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('User', userShema)