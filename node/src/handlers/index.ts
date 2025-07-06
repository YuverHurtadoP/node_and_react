import User from "../models/User";
import { Request, Response } from "express";
import { checkPassword, hashPassword } from "../utils/auth";
import slugify from 'slugify';
import { generateJwt } from "../utils/jwt";
import Jwt, { decode } from "jsonwebtoken";
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {


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

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {

  const { email, password } = req.body;
  const existUser = await User.findOne({ email });

  if (!existUser) {
    res.status(404).json({ error: "El usuario no existe" });
    return;
  }

  const isPasswordCorrect = await checkPassword(password, existUser.password);
  console.log("repuesta", isPasswordCorrect);
  if (!isPasswordCorrect) {
    res.status(401).json({ error: "Credenciales incorrecta" });
    return;
  }
  const token = generateJwt(existUser);
  res.send(token)

}
export const getUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.send(req.user);

};

export const updatedUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {description} = req.body

    const handle = slugify(req.body.handle, {
      lower: true,
      strict: true, // elimina caracteres especiales
    });

    const existHandle = await User.findOne({ handle });

    if (existHandle && existHandle.email !== req.user.email) {
      res.status(409).json({ error: "El nombre de usuario no esta disponible" });
      return;
    }
    req.user.handle = handle;
    req.user.description = description;
    await req.user.save();
   res.status(201).send("usuario actualizado con exito.");


  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "no se pudo actualizar el usuario" });
  }

};

