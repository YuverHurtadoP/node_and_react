//const express = require('express'); //CjS Common js
 
import express from 'express';//EMS Ecmascript module
import router from './router';
import { connectDB } from './config/db';
import 'dotenv/config';


 const app = express();

 
 
connectDB()

 app.use(express.json())
 app.use('/',router)


 
 export default app;