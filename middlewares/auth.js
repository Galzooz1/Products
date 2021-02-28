const jwt = require("jsonwebtoken");
const { config } = require("../config/secretData");


exports.authToken = (req, res, next) => {
    let token = req.header("auth-token");
    if (!token) {
        return res.status(400).json({ msg: "You must send token to get data!" });
    }
    try {
        let decodeToken = jwt.verify(token, config.jwtSecret);
        req.userData = decodeToken;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Token is invalid or expired" });
    }
}