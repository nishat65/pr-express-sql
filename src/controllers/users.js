const User = require('@/models/users');
const AppError = require('@/utils/error');

exports.getProfile = async (req, res, next) => {
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

exports.updateProfile = async (req, res, next) => {
    try {
        const { username, email, phone } = req.body;
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return next(new AppError(404, 'User not found'));
        }
        user.username = username;
        user.email = email;
        user.phone = phone;
        await user.save();
        const userJson = user.toJSON();
        delete userJson.password;
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

exports.updatePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return next(new AppError(404, 'User not found'));
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return next(new AppError(401, 'Invalid old password'));
        }
        user.password = newPassword;
        await user.save();
        const userJson = user.toJSON();
        delete userJson.password;
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

exports.deleteProfile = async (req, res, next) => {
    try {
        const user = await User.update(
            {
                isDeleted: false,
            },
            { where: { id: req.user.id } },
        );
        if (!user) {
            return next(new AppError(404, 'User not found'));
        }
        return res.status(204).json({
            status: 'success',
        });
    } catch (error) {
        next(new AppError(500, error));
    }
};
