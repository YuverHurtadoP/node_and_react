import { Router } from "express";
import { createUser, login } from "./handlers";
import {body}from "express-validator";
import { handleInputError } from "./middlewere/validation";


const router = Router();
 
 router.post('/auth/register', 
    body('handle').notEmpty().withMessage("El handle no puede ir vacio"),
    body('name').notEmpty().withMessage("El name no puede ir vacio"),
    body('email').isEmail().withMessage("El email no es valido"),
    body('password').isLength({min:4}).withMessage("El password debe contener 4 caracteres minimos"),
    handleInputError,
    createUser )

router.post('/auth/login',
    body('email').isEmail().withMessage("El email no es valido"),
    body('password').notEmpty().withMessage("El password  es obligatorio"),
   handleInputError,
   login)
 
 
 export default router;