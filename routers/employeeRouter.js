const express = require("express");
const router = express.Router();

const employeeModel = require("../models/EmployeeModel");

const { CustomError } = require("../customErrorUtil");
const { catchPromise } = require("../customErrorUtil");

router.get("/employees", catchPromise(async (req, res, next) => {
    const employees = await employeeModel.find();

    res.status(200).json({
        status: true,
        length: employees.length,
        employees
    });
}));

router.get("/employees/:eid", catchPromise(async (req, res, next) => {
    const employee = await employeeModel.findById(req.params.eid);

    if (employee == undefined) {
        return next(new CustomError(`Employee ${req.params.eid} is not found..!`, 404));
    }

    res.status(200).json({
        status: true,
        employee,
        message: `Employee ${req.params.eid} has been found!`
    });
}));

router.post("/employees", catchPromise(async (req, res, next) => {
    const newEmployee = await employeeModel.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        salary: req.body.salary
    });
    
    res.status(201).json({
        status: true,
        employee: newEmployee,
        message: "An employee has been successfully added!"
    });
}));

router.put("/employees/:eid", catchPromise(async (req, res, next) => {
    const updatedEmployee = await employeeModel.findByIdAndUpdate(req.params.eid, req.body, { 
        // new: true means that findByIdAndUpdate will return updated document not the original one
        // runValidators: true means it will validate data even though it is not creating a document
        new: true, runValidators: true 
    });

    res.status(200).json({
        status: true,
        message: `Employee ${req.params.eid} has been successfully updated`,
        employee: updatedEmployee
    });
}));

router.delete("/employees", catchPromise(async (req, res, next) => {
    const employee = await employeeModel.findByIdAndDelete(req.query.eid);

    if (employee == undefined) {
        return next(new CustomError(`Employee ${req.query.eid} is not found..!`, 404));
    }

    res.status(204).json({
        status: true
    });
}));

module.exports = router;