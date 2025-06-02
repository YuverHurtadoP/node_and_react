//const express = require('express'); //CjS Common js
 
import express from 'express';//EMS Ecmascript module
import router from './router';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';
import 'dotenv/config';
import cors from 'cors';
// import { connectDB } from './config/db'; // Assuming you have a connectDB function to connect to your database
connectDB()

 const app = express();

 // cors config
 app.use(cors(corsConfig))
 

 app.use(express.json())
 app.use('/',router)


 
 export default app;