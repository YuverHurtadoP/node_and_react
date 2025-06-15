import jwt from "jsonwebtoken";

export const generateJwt = (infoLogeado: any ): string => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };            
  const payload = {
    name: infoLogeado.name,
    email: infoLogeado.email,
    _id: infoLogeado._id,
  };
  const token = jwt.sign({ ...header, ...payload }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};      