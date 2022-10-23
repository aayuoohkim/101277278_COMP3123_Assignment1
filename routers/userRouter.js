const express = require("express");
const router = express.Router();

const UserModel = require("../models/UserModel");

const { CustomError } = require("../customErrorUtil");
const { catchPromise } = require("../customErrorUtil");

router.post("/signup", catchPromise(async (req, res, next) => {
    const newUser = await UserModel.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    res.status(201).json({
        status: true,
        user: newUser,
        message: "A user has been successfully signed up!"
    });
}));

router.post("/login", catchPromise(async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return next(new CustomError("Username or Password is invalid..!", 401));
    }

    const user = await UserModel.findOne({username});

    // check if the user is exists with the username
    // or if the provided password is valid
    if (user == undefined || user.password != password) {
        return next(new CustomError("Username or Password is invalid..!", 401));
    }

    res.status(200).json({
        status: true,
        user,
        message: "A user has been successfully logged in!"
    });
}));

module.exports = router;