import User from "../models/User";
import { Request, Response } from "express";



export const createUser = async (
   req: Request,
   res: Response
 ): Promise<void> => {
   const { email } = req.body;
   const existUser = await User.findOne({ email });
 
   if (existUser) {
     res.status(409).json({ error: "El usuario ya existe" });
     return;
   }
 
   const user = new User(req.body);
   await user.save();
   res.send("usuario creado.");
 };