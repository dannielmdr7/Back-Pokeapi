const jwt = require("jsonwebtoken");

const generarJWT = (uid:string,nickName:string,team:string) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
      nickName,
      team
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
      (error:any, token:string) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};
module.exports = { generarJWT };
