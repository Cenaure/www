const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {body} = require('express-validator')

router.post(
    '/registration', 
    body('email').isEmail(), 
    body('password').isLength({min: 5, max: 20}), 
    body('firstName').isAlpha(), 
    body('secondName').isAlpha(),
    userController.registration
);
router.post('/login', userController.login)
router.post('/alternateLogin', userController.alternateLogin)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)
router.get('/auth', userController.check)

module.exports = router