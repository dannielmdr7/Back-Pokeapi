import {Schema,model} from 'mongoose';


const UserSchema = new Schema({
  user:{
    type:String,
    required:true,
    trim:true
  },
  password:{
    type:String,
    required:true,
    trim:true
  },
  nickName:{
    type:String,
    required:true,
    trim:true
  },
  team:{
    type:String,
    required:true,
    trim:true
  },
  lastConnection:{
    type:String,
  }

},{
  versionKey:false,
  timestamps:true
});
export default model('User',UserSchema)
