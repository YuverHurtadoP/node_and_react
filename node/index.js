//const express = require('express'); //CjS Common js
import express from 'express';//EMS Ecmascript module
 const app = express();


 app.get('/',(req, res)=>{
    res.send('hello from node js');
 })
 app.get('/farewell',(req, res)=>{
    res.send('bye, thanks you');
 })
 const port = process.env.PORT||4000;
 app.listen(port ,()=>{
    console.log("run server");
 })