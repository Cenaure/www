const ApiError = require('../error/api-error')

module.exports = function(e, req, res, next){
    if(e instanceof ApiError) {
        res.status(e.status).json({message: e.message})
    }
    return res.status(500).json({message: "Непередбачена помилка!"})
}