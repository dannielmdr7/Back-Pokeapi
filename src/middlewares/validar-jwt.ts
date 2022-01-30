const { response } = require("express");
import {RequestHandler} from 'express';
const jwt = require("jsonwebtoken");

const validarJWT  = (req:any, res = response, next:any) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token incorrecto",
    });
  }
};

module.exports = { validarJWT };
