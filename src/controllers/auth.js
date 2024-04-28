const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const User = require('@/models/users');
const AppError = require('@/utils/error');
const log = require('@/utils/logger');
const { generateToken } = require('@/utils/utils');

exports.register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        log.info(
            'username: ',
            username,
            'password: ',
            password,
            'email: ',
            email,
        );
        let user = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }],
            },
        });
        if (user) {
            log.error('username or email already exists');
            return next(new AppError(400, 'Username or email already exists'));
        }

        user = await User.create({
            username,
            password,
            email,
        });

        const userJSON = user.toJSON();
        delete userJSON.password;
        const token = generateToken(userJSON);
        log.info('user created: ', userJSON);
        return res.status(201).json({
            message: 'User Registered Successfully',
            token,
            data: {
                user: userJSON,
            },
        });
    } catch (error) {
        log.error('error while creating user: ', error);
        next(new AppError(500, error));
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        log.info('username: ', username, 'password: ', password);
        const user = await User.findOne({ where: { username } });
        if (!user) {
            log.error('user is not found');
            return next(new AppError(401, 'Invalid username or password'));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            log.error('invalid password');
            return next(new AppError(401, 'Invalid username or password'));
        }
        const userJSON = user.toJSON();
        delete userJSON.password;
        const token = generateToken(userJSON);
        log.info('user is found', userJSON.username);
        return res.status(200).json({
            message: 'User LoggedIn Successfully',
            token,
            data: {
                user: userJSON,
            },
        });
    } catch (error) {
        log.error('error while fetching user: ', error);
        next(new AppError(500, error));
    }
};
