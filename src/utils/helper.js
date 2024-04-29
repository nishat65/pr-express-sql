const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');

const cloudinary = require('./cloudinary');

exports.upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../../public/uploads'));
        },
        filename: function (req, file, cb) {
            const ext = file.originalname.substring(
                file.originalname.lastIndexOf('.'),
            );
            cb(null, file.fieldname + '-' + Date.now() + ext);
        },
    }),
    fileFilter: function (req, file, cb) {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
});

exports.cloudUpload = async (file, folder) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
    const result = await cloudinary.uploader.upload(
        file,
        { folder, ...options },
        function (error, result) {
            if (error) return error;
            return result;
        },
    );
    await fs.unlink(file);
    return result;
};

exports.generateToken = (user) => {
    const { id, username, email } = user;
    const token = jwt.sign({ id, username, email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    return token;
};

exports.verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
};

exports.generateRefreshToken = (user) => {
    const { id, username, email } = user;
    const refreshToken = jwt.sign(
        { id, username, email },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '1d',
        },
    );
    return refreshToken;
};
