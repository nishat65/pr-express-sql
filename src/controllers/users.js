const User = require('@/models/users');
const AppError = require('@/utils/error');
const log = require('@/utils/logger');
const { cloudUpload } = require('@/utils/helper');

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const userJson = user.toJSON();
        delete userJson.password;
        if (!user) {
            log.error('user is not found');
            return next(new AppError(404, 'User not found'));
        }
        log.info('user is found: ', user.username);
        return res.status(200).json({
            status: 'success',
            data: {
                user: userJson,
            },
        });
    } catch (error) {
        log.error('error while fetching user: ', error);
        next(new AppError(500, error));
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const { username, email, phone } = req.body;
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            log.error('user is not found');
            return next(new AppError(404, 'User not found'));
        }
        user.username = username;
        user.email = email;
        user.phone = phone;
        await user.save();
        const userJson = user.toJSON();
        delete userJson.password;
        log.info('user exists: ', userJson.username);
        return res.status(200).json({
            status: 'success',
            data: {
                user: userJson,
            },
        });
    } catch (error) {
        log.error('error while fetching user: ', error);
        next(new AppError(500, error));
    }
};

exports.updatePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            log.error('user is not found');
            return next(new AppError(404, 'User not found'));
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            log.error('invalid old password');
            return next(new AppError(401, 'Invalid old password'));
        }
        user.password = newPassword;
        await user.save();
        const userJson = user.toJSON();
        delete userJson.password;
        log.info('user exists: ', userJson.username);
        return res.status(200).json({
            status: 'success',
            data: {
                user: userJson,
            },
        });
    } catch (error) {
        log.error('error while fetching user: ', error);
        next(new AppError(500, error));
    }
};

exports.uploadImage = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            log.error('user is not found');
            return next(new AppError(404, 'User not found'));
        }
        if (!req.file) {
            log.error('image is not found');
            return next(new AppError(404, 'Please upload an image'));
        }

        const result = await cloudUpload(req.file.path, 'profile');
        user.image = result.url;
        await user.save();
        const userJson = user.toJSON();
        delete userJson.password;
        log.info('user exists', userJson.username);
        return res.status(200).json({
            status: 'success',
            data: {
                user: userJson,
            },
        });
    } catch (error) {
        log.error('error while fetching user: ', error);
        next(new AppError(500, error));
    }
};

exports.deleteProfile = async (req, res, next) => {
    try {
        const user = await User.update(
            {
                isDeleted: true,
            },
            { where: { id: req.user.id } },
        );
        if (!user) {
            log.error('user is not found');
            return next(new AppError(404, 'User not found'));
        }
        log.info('user is deleted');
        return res.status(204).json({
            status: 'success',
        });
    } catch (error) {
        log.error('error while fetching user: ', error);
        next(new AppError(500, error));
    }
};
