import User from "../models/User";
import { Request, Response } from "express";
import { hashPassword } from "../utils/auth";
import slugify from 'slugify';
import { validationResult } from "express-validator";

export const createUser = async (
   req: Request,
   res: Response
 ): Promise<void> => {

  let error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(400).json({ error: error.array() });
    return;
  }
  
   const { email, password } = req.body;
   const existUser = await User.findOne({ email });
 
   if (existUser) {
     res.status(409).json({ error: "El usuario ya existe" });
     return;
   }

   const handle = slugify(req.body.handle, {
    lower: true,
    strict: true, // elimina caracteres especiales
  });

   const existHandle = await User.findOne({ handle });
 
   if (existHandle) {
     res.status(409).json({ error: "El nombre de usuario no esta disponible" });
     return;
   }


 
   const user = new User(req.body);
   user.password = await hashPassword(password);
   user.handle = handle;
   await user.save();
   res.status(201).send("usuario creado.");
 };