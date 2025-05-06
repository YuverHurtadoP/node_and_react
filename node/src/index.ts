import server from './server'
import 'colors';


 const port = process.env.PORT||4000;
 server.listen(port ,()=>{
    console.log("run server".yellow);
 })
 