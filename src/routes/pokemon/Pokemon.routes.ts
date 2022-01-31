import {Router} from 'express';
const { validarJWT } = require("../../middlewares/validar-jwt");
import * as PokemonController from './Pokemon.Controller';
;

const router = Router();

router.get('/pokemon/:id',[validarJWT],PokemonController.getPokemon);
router.get('/pokemons',[validarJWT],PokemonController.getAllPokemon);
router.get('/pokemonsPage/:limit',[validarJWT],PokemonController.getPokemonsPerPage);





export default router;
