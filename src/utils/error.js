class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        Object.assign(this, { statusCode, message });
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
