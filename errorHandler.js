const sendErrorMessage = (err, req, res, next) => {
    return res.status(err.statusCode).json({
        status: false,
        error: err,
        message: err.message,
    });
}

module.exports = (err, req, res, next) => {
    if (err.statusCode == undefined) {
        err.statusCode = 500;
    }
    if (err.status == undefined) {
        err.status = "error";
    }

    sendErrorMessage(err, req, res, next);
}