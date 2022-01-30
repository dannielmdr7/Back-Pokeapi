import {RequestHandler} from 'express';
import User from './User';
const { generarJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
;


export const getUsers: RequestHandler=async(req,res) =>{
  try {
    res.json('Usuarios')
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
    const token = await generarJWT(usuario.id);

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
    const token = await generarJWT(usuarioDb.id);
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