import { Router } from "express";
import { creteUser } from "./handlers";

const router = Router();
 
 router.post('/auth/register', creteUser )
 
 
 export default router;