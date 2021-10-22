const router                =   require("express").Router()
const controller            =   require('../../controller')
const joiMiddleWare         =   require('../../middlewares/validate')
const validateSchema        =   require('../../validations/')
const { JWTmiddleware } = require("../../middlewares/jwt/index")

router.get('/',JWTmiddleware,
    controller.authController.getUserStatus

);

router.post('/register',
    joiMiddleWare(validateSchema.authValidation.registerValidation),
    controller.authController.registerController
);

router.post('/login', 
    joiMiddleWare(validateSchema.authValidation.loginValidation),
    controller.authController.loginController
);
router.patch('/:uid',
    controller.authController.updateuser
)
router.delete('/:uid',
    controller.authController.deleteuser
)


module.exports=router;