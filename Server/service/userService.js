const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mailService');
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDto');
const ApiError = require('../error/api-error');
const Basket = require('../models/cart-model')

class UserService {
    async generateAndSaveTokens(user) {
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }

    async registration(firstName, secondName, email, password, role) {
        const candidate = await UserModel.findOne({email});
        if(candidate) throw ApiError.BadRequest(`Користувач з поштою ${email} вже існує`);
        
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await UserModel.create({firstName, secondName, email, password: hashPassword, role, activationLink})
        //const basket = await Basket.create({userId: user.id})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);

        return this.generateAndSaveTokens(user);
    }

    async activate(activationLink){
        const user = await UserModel.findOne({activationLink})
        if(!user) throw ApiError.BadRequest('Неккоректне посилання активації')
        
        user.isActivated = true;
        await user.save();
    }

    async login(email, password){
        const user = await UserModel.findOne({email})
        if(!user) throw ApiError.internal('Користувача з такою поштою не існує')
        
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) throw ApiError.BadRequest('Неправильний пароль');
        
        return this.generateAndSaveTokens(user);
    }

    async alternateLogin(firstName, secondName, password){
        const user = await UserModel.findOne({firstName, secondName})
        if(!user) throw ApiError.BadRequest('Користувача з такими даними не існує')
        
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) throw ApiError.BadRequest('Неправильний пароль');
    
        return this.generateAndSaveTokens(user);
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken) throw ApiError.UnauthorizedError();

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb) throw ApiError.UnauthorizedError();
        
        const user = await UserModel.findById(userData.id);

        return this.generateAndSaveTokens(user);
    }

    async getAllUsers(){
        const users = await UserModel.find(); 
        return users;
    }
}

module.exports = new UserService(); 