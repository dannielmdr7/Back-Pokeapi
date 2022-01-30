import app from './app';
import './database'

app.listen(process.env.PORT || 3001,()=>{
  console.log('App runing in port', process.env.PORT);
});


