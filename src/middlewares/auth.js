const jwt = require('jsonwebtoken');
const AppError = require('@/utils/error');
exports.authMiddelware = (req, res, next) => {
    if (!req.headers.authorization) {
        return next(new AppError(401, 'Unauthorized to view this resource'));
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
        return next(new AppError(401, 'Unauthorized to view this resource'));
    }
    req.user = decodedToken;
    next();
};
