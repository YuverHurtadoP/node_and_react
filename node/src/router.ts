import { Router } from "express";
import { createUser } from "./handlers";

const router = Router();
 
 router.post('/auth/register', createUser )
 
 
 export default router;