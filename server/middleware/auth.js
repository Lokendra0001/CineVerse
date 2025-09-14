const { getPayloadByToken } = require("../libs/auth");

const checkAuthentication = (req, res, next) => {
    try {
        req.user = null;
        const token = req.cookies?.jwtToken;
        if (!token) return res.status(404).json({ message: "Please Login First!" });

        const userPayload = getPayloadByToken(token);
        if (!userPayload) return res.status(404).json({ message: "Invalid or expired token!" });
        req.user = userPayload;
        next();
    } catch (err) {
        res.status(500).json({ message: `Authentication Failed : ${err.message} ` })
    }

}

module.exports = checkAuthentication;