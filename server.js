const mongoose = require("mongoose");
const express = require("express");
const app = express();

// Middlewares
app.use(express.json());

// Routers
const userRouter = require("./routers/userRouter");
const employeeRouter = require("./routers/employeeRouter");
app.use("/api/user", userRouter);
app.use("/api/emp", employeeRouter);

// Global Error Handler
const errorHandler = require("./errorHandler");
app.use(errorHandler);

// DB connection
const DataBase = "mongodb+srv://Yoonhee:0407xoxKyh@comp3123-assignment1.6vngmmc.mongodb.net/comp3123-assignment1";
mongoose.connect(DataBase, {
    useNewUrlParser: true
}).then(() => console.log("Database connected!"));

const port = 8000;
app.listen(port, () => {
    console.log("App is listening on", port, "port..");
});