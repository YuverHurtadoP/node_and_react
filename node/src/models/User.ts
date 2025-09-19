import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  handle: String;
  name: String;
  email: String;
  password: String;
  description: String;
  imagen:String
}
const userSchema = new Schema({

    handle:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    
    name:{
        type:String,
        require:true,
        trim:true
    },
    
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    
    password:{
        type:String,
        require:true,
        trim:true
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    imagen: {
        type: String,
        trim: true,
        default: ""
    }
});
const User = mongoose.model<IUser>('User',userSchema);
export default User;