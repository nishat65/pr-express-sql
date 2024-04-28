const jwt = require('jsonwebtoken');

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
