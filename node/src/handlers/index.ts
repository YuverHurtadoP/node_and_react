import User from "../models/User";
import { Request, Response } from "express";
import { checkPassword, hashPassword } from "../utils/auth";
import slugify from 'slugify';
import { generateJwt } from "../utils/jwt";
import Jwt, { decode } from "jsonwebtoken";
import formidable from "formidable";
import cloudinary from "../config/cloudinary";
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
    // Si la petición contiene archivos, procesar la imagen
    if (req.headers['content-type']?.includes('multipart/form-data')) {
      const form = formidable({ multiples: false });
      form.parse(req, async (err, fields, files) => {
        if (err) {
          res.status(400).json({ error: "Error al procesar la imagen" });
          return;
        }
        // Procesar campos de texto
        const { handle: handleRaw, description } = fields;
        const handleValue = Array.isArray(handleRaw) ? handleRaw[0] : handleRaw;
        const handle = slugify(handleValue, {
          lower: true,
          strict: true,
        });

        const existHandle = await User.findOne({ handle });
        if (existHandle && existHandle.email !== req.user.email) {
          res.status(409).json({ error: "El nombre de usuario no esta disponible" });
          return;
        }

        req.user.handle = handle;
        req.user.description = Array.isArray(description) ? description[0] : description;

        // Procesar imagen si existe
        const imageFile = files.file || files.imagen;
        if (imageFile) {
          cloudinary.uploader.upload(
            (Array.isArray(imageFile) ? imageFile[0] : imageFile).filepath,
            {folder: 'devtree'},
            async (error, result) => {
              if (error) {
                res.status(500).json({ error: "Error al procesar la imagen" });
                return;
              }
               
              req.user.imagen = result.secure_url;
              await req.user.save();
              res.status(200).json({ message: "Usuario actualizado con éxito", image: result.secure_url });
            }
          );
        } else {
          await req.user.save();
          res.status(200).json({ message: "Usuario actualizado con éxito" });
        }
      });
    } else {
      // Si no hay archivos, actualizar solo los campos de texto
      const { handle: handleRaw, description } = req.body;
      const handle = slugify(handleRaw, {
        lower: true,
        strict: true,
      });

      const existHandle = await User.findOne({ handle });
      if (existHandle && existHandle.email !== req.user.email) {
        res.status(409).json({ error: "El nombre de usuario no esta disponible" });
        return;
      }
      req.user.handle = handle;
      req.user.description = description;
      await req.user.save();
      res.status(200).json({ message: "Usuario actualizado con éxito" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo actualizar el usuario" });
  }
};

 