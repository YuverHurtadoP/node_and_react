const express = require('express');
 const app = express();


 app.get('/',(req, res)=>{
    res.send('hello from node js');
 })
 app.get('/farewell',(req, res)=>{
    res.send('bye, thanks you');
 })
 app.listen(4000 ,()=>{
    console.log("run server");
 })