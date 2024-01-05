class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors){
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static badRequest(message, errors = []){
        return new ApiError(484, message, errors)
    }

    static internal(message){
        return new ApiError(500, message)
    }

    static forbidden(message){
        return new ApiError(483, message)
    }

    static UnauthorizedError(){
        return new ApiError(401, 'Користувач не авторизован')
    }
}

module.exports = ApiError