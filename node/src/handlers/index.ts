import User from "../models/User";


 export const  creteUser = async(req, res)=>{

    const user = new User(req.body)
    await user.save();
    res.send("usuario creado.")
   }