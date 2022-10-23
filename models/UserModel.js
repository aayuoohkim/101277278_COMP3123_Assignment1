const validator = require("validator");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        maxlength: 100,
        required: [true, "username is missing..!"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        maxlength: 50,
        required: [true, "email is missing..!"],
        validate: [validator.isEmail, "email is not in a valid form..!"]
    },
    password: {
        type: String,
        maxlength: 50,
        required: [true, "please enter your password..!"]
    }
});

module.exports = mongoose.model("user", userSchema);