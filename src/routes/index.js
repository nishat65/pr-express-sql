const AppError = require('@/utils/error');
const logs = require('@/utils/logger');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const menuItemRoutes = require('./menuitems');

module.exports = (app) => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/user', userRoutes);
    app.use('/api/v1/menuitems', menuItemRoutes);
    app.all('*', (req, res, next) => {
        logs.info(`${req.originalUrl} not found`);
        return next(new AppError(404, `${req.originalUrl} not found`));
    });
    app.use((error, req, res, next) => {
        console.log(error, 'error');
        logs.error(error);
        return res.status(error.statusCode || 500).json({
            status: ('' + error.statusCode).startsWith('5') ? 'Error' : 'Fail',
            message: error.message,
        });
    });
};
