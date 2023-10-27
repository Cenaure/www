const jwt = require('jsonwebtoken');

module.exports = function(role){
    return function(req, res, next){
        if(req.method === "OPTIONS"){
            next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token){
                return res.status(401).json({message: "Користувач не авторизован"});
            }
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            if(decoded.role != role){
                return res.status(403).json({message: "Користувач не має доступу"})
            }
            res.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({message: "Користувач не авторизован"});
        }
    }
}