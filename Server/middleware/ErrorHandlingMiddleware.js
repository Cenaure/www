const ApiError = require('../error/api-error')

module.exports = function(e, req, res, next){
    console.log(e)
    if(e instanceof ApiError) {
        res.status(e.status).json({message: e.message, errors: e.errors})
    }
    return res.status(500).json({message: "Непередбачена помилка!", e})
}