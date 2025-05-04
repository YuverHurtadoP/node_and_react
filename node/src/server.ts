//const express = require('express'); //CjS Common js
import express from 'express';//EMS Ecmascript module
import router from './router';
 const app = express();
 app.use('/',router)


 
 export default app;