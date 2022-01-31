import {Router} from 'express';
import * as UserController from './User.controller';
const { validarJWT } = require("../../middlewares/validar-jwt");
;

const router = Router();

router.get('/usuarios',[validarJWT],UserController.getUsers)
router.post('/createUser',UserController.createUser)
router.post('/authUser',UserController.authUser)



export default router;
