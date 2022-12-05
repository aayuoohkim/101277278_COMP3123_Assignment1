const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

// Middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: "*"}))

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

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("App is listening on", port, "port..");
});