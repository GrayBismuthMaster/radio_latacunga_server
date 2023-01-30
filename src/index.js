
//const http = require('http')
import app from './app'

require('dotenv').config({path: 'variables.env'})
import dbConexion from './config/db'

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
    console.log('Esta en desarrollo');
    const mongoEnvDev = process.env.DB_MONGO_DEV;
    dbConexion(mongoEnvDev);    
    //const server = http.createServer(app);
    app.listen({port:process.env.DEV_PORT||5001},()=>{
        console.log(`Servidor Levantado en el puerto ${process.env.DEV_PORT}`);
    }); 

}else{
    console.log("production");
    const mongoEnvPro = process.env.DB_MONGO_PRO;
    dbConexion(mongoEnvPro) 
    //const server = http.createServer(app);
    app.listen({port:process.env.PROD_PORT||5001},()=>{
        console.log(`Servidor Levantado en el puerto ${process.env.PROD_PORT}`);
    }); 
}

