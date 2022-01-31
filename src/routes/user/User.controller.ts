import {RequestHandler} from 'express';
import { pokemonApi } from '../../external-api/pokemonApi';
import User from './User';
const { generarJWT } = require("../../helpers/jwt");
const bcrypt = require("bcryptjs");
;

const getPokemons = async()=>{
  const pokemons = await pokemonApi.get(
    `https://pokeapi.co/api/v2/pokemon/`,
    );
    return pokemons.data
}
export const getUsers: RequestHandler=async(req,res) =>{
  try {
    console.log('req',req);
    const poke =await  getPokemons();
    res.status(200).json({
      ok:true,
      data:poke
    })
    // return res.json({
      // ok: true,
      // data:resp.data.results[1]
    // })
  } catch (error) {
    console.log(error);
  }
}
export const createUser: RequestHandler=async (req,res) =>{
  const { user, password } = req.body;

  try {
    const usuarioExiste = await User.findOne({ user });
    if (usuarioExiste) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }
    const usuario = new User(req.body);
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    //generar Token
    const token = await generarJWT(usuario.id,usuario.nickName,usuario.team);

    await usuario.save();
    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error inesperado",
    });
  }
}
export const authUser: RequestHandler=async (req,res) =>{
  const { user, password } = req.body;
  try {
    //Verificar Email
    const usuarioDb = await User.findOne({ user });
    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }
    //Verificar Contraseña
    const validatePassword = bcrypt.compareSync(password, usuarioDb.password);
    if (!validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no válida",
      });
    }
    //Generar el TOKEN JWT
    const token = await generarJWT(usuarioDb.id,usuarioDb.nickName,usuarioDb.team);
    usuarioDb.lastConnection = new Date();
    usuarioDb.save();
    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
}