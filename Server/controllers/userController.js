const userService = require("../service/userService");
const {validationResult} = require('express-validator');
const ApiError = require('../error/api-error');

class UserController{
    async registration(req, res, next){
        try {
            const {firstName, secondName, email, password} = req.body;

            if(!email || !password){
                return next(ApiError.BadRequest('Не вказаний email або пароль'));
            }

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Помилка при валідації', errors.array()));
            }

            const userData = await userService.registration(firstName, secondName, email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*100, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    } 

    async login(req, res, next){
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*100, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    } 

    async alternateLogin(req, res, next){
        try {
            const{firstName, secondName, password} = req.body;
            const userData = await userService.alternateLogin(firstName, secondName, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*100, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    } 

    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (error) {
            next(error);
        }
    } 

    async activate(req, res, next){
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        } catch (error) {
            next(error);
        }
    } 

    async refresh(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*100, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error);        
        }
    } 

    async getUsers(req, res, next){
        try {
            const users = await userService.getAllUsers();
            return res.json(users)
        } catch (error) {
            next(error);
        }
    } 
}

module.exports = new UserController();