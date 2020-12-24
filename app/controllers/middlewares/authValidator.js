const jwt = require('jsonwebtoken');

module.exports.validateAPIUser = function(req, res, next){
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.status(401).send({ "message": "not authenticated", "reason": "authorization header not present" });
    }
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer") {
        res.status(400).send({ "message": "not authenticated", "reason": "authorization header is not Bearer" });
    }
    jwt.verify(token, envs.NODE_KEY, function (err, data) {
        if (err) {
            res.status(400).send({ "message": "not authenticated", "reason": "invalid JWT token" });
        }
        else {
            next();
        }
    });
}