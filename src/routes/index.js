const AppError = require('@/utils/error');
const authRoutes = require('./auth');
const userRoutes = require('./user');

module.exports = (app) => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/user', userRoutes);
    app.all('*', (req, res, next) => {
        return next(new AppError(404, `${req.originalUrl} not found`));
    });
    app.use((error, req, res, next) => {
        console.log(error, 'error');
        return res.status(error.statusCode || 500).json({
            status: ('' + error.statusCode).startsWith('5') ? 'Error' : 'Fail',
            message: error.message,
        });
    });
};
