import { NextFunction, } from "express";
import { Request, Response } from "express";
import Jwt, { decode }   from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
export const authMidleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    res.status(401).json({ error: "No se ha encontrado el token" });
    return;
  }

  const token = bearerToken?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "No se ha encontrado el token" });
    return;
  }

  try {
    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET as string);

    console.log("decodedToken", decodedToken);

    if (typeof decodedToken === "object") {
      const user = await User.findById(decodedToken._id).select("-password");

      if (!user) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }
      req.user = user;

      // res.send(user);
      next();
      return;
    }

    res.status(401).json({ error: "Token inválido" });
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};