class CustomError extends Error {
    constructor(errorMessage, statusCode) {
        super(errorMessage);
        this.statusCode = statusCode;
        if (`${statusCode}`.startsWith('4')) {
            this.status = false;
        } else {
            this.status = true;
        }
    }
}

exports.CustomError = CustomError;

exports.catchPromise = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}