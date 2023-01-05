//Pruebas DB
import mongoose from 'mongoose'
require('dotenv').config({path: 'variables.env'})
const conectarDB = async (devEnv)=>{
    try{
        await mongoose.connect(devEnv,
            {
                useUnifiedTopology:true, 
                useNewUrlParser:true,
                //useFindAndModify:false,
                //useCreateIndex: true,
                keepAlive: true, 
                serverSelectionTimeoutMS: 10000
            })
            .then(
                ()=>{
                console.log('Conectado a mongoDB');
            },
            err =>{
                console.log(err);
            })
    }
    catch(error){
        console.log('No se pudo conectar con MongoDB', error);
        console.log(error)
        process.exit(1)
    }
    
}


module.exports = conectarDB