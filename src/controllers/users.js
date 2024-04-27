const User = require('@/models/users');
const AppError = require('@/utils/error');

exports.profile = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const userJson = user.toJSON();
        delete userJson.password;
        if (!user) {
            return next(new AppError(404, 'User not found'));
        }
        return res.status(200).json({
            status: 'success',
            data: {
                user: userJson,
            },
        });
    } catch (error) {
        next(new AppError(500, error));
    }
};
