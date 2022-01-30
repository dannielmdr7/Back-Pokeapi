import express from 'express';
import UserRoutes from './routes/User.routes';
import morgan from 'morgan';
import cors from 'cors';
;

const app = express();
app.set('port',process.env.PORT || 3000);
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(UserRoutes)
export default app;