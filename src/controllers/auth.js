const bcrypt = require('bcryptjs');
const User = require('@/models/users');
const AppError = require('@/utils/error');
const { generateToken } = require('@/utils/utils');

exports.register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const user = await User.create({
            username,
            password,
            email,
        });
        const userJSON = user.toJSON();
        delete userJSON.password;
        const token = generateToken(userJSON);
        return res.status(201).json({
            message: 'User Registered Successfully',
            token,
            data: {
                user: userJSON,
            },
        });
    } catch (error) {
        next(new AppError(500, error));
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return next(new AppError(401, 'Invalid username or password'));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new AppError(401, 'Invalid username or password'));
        }
        const userJSON = user.toJSON();
        delete userJSON.password;
        const token = generateToken(userJSON);
        return res.status(200).json({
            message: 'User LoggedIn Successfully',
            token,
            data: {
                user: userJSON,
            },
        });
    } catch (error) {
        next(new AppError(500, error));
    }
};
