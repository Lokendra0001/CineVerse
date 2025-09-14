const jwt = require('jsonwebtoken');

const secret = "asdfhashd234f@fdfas34324";

const generateTokenAndSendCookie = (user, res) => {
    const { _id, email } = user;
    const payload = {
        _id,
        email,
    };

    const token = jwt.sign(payload, secret);
    res.cookie('jwtToken', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}

const getPayloadByToken = (token) => {
    return jwt.verify(token, secret);
}

module.exports = {
    generateTokenAndSendCookie,
    getPayloadByToken
}