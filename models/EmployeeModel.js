const validator = require("validator");
const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    first_name: {
        type: String,
        maxlength: 100,
        required: [true, "an employee needs a first name..!"]
    },
    last_name: {
        type: String,
        maxlength: 50,
        required: [true, "an employee needs a last name..!"]
    },
    email: {
        type: String,
        maxlength: 50,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "email is missing..!"]
    },
    gender: {
        type: String,
        maxlength: 25,
        enum: ['male', 'female', 'other']
    },
    salary: {
        type: Number,
        required: [true, "an employee needs a salary"]
    }
});

module.exports = mongoose.model("employee", employeeSchema);