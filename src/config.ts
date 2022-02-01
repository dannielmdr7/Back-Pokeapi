import dotenv from 'dotenv';
dotenv.config()


export default{
  MONGO_DATABASE:process.env.MONGO_DATABASE || 'usuarios',
  MONGO_USER:process.env.ADMIN ||'admin',
  MONGO_PASSWORD:process.env.PASSWORD || 'admin',
  MONGO_HOST:process.env.MONGO_URI || 'localhost',
  PORT:process.env.PORT || 3000
}