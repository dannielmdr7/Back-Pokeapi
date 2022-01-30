import mongoose from 'mongoose';
import config from './config';

(async function conectDatabase(){
  try {
  const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`);
  console.log('Database is conected to ', db.connection.name);

  } catch (error) {
    console.log(error);
  }
})();

