const jwt = require('jsonwebtoken');
const AppError = require('@/utils/error');
const log = require('@/utils/logger');
exports.authMiddelware = (req, res, next) => {
    if (!req.headers.authorization) {
        log.error('no authorization header is provided');
        return next(new AppError(401, 'Unauthorized to view this resource'));
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
        log.error('Unauthorized to view this resource');
        return next(new AppError(401, 'Unauthorized to view this resource'));
    }
    log.info('user is authenticated');
    req.user = decodedToken;
    next();
};
