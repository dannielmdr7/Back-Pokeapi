import express from 'express';
import UserRoutes from './routes/user/User.routes';
import PokemonRoutes from './routes/pokemon/Pokemon.routes'
import morgan from 'morgan';
import cors from 'cors';
;

const app = express();
app.set('port',process.env.PORT || 3000);
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(UserRoutes)
app.use(PokemonRoutes)
export default app;