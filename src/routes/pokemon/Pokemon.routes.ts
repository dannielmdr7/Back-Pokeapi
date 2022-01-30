import {Router} from 'express';
const { validarJWT } = require("../../middlewares/validar-jwt");
import * as PokemonController from './Pokemon.Controller';
;

const router = Router();

router.get('/pokemon',[validarJWT],PokemonController.getPokemon)



export default router;
