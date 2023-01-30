
//Depuración
const debug = require('debug')('app:inicio');
//Debug de DB
import express from 'express'
//import config from './config'
const app = express();
//Cookie 
const cookieParser = require('cookie-parser')
//Middleware cookieParser
app.use(cookieParser())
import logger from './logger'
import morgan from 'morgan'
//Cors
var cors = require('cors');
//Middleware de express para manejar post
app.use(express.json());//Recibe peticiones del body en formato json
//Y envia a la ruta body var1 = valor&var2=valor
//Rutas ROLES
import {createRoles} from './libs/initialSetup'
createRoles();
//Utilizar las rutas
import usuarios from './routes/usuarios.routes';
import auth from './routes/auth.routes'
import profile from './routes/profile.routes' ;
// import tratamientos from './routes/tratamientos.routes'
import solicitudes from './routes/solicitudes.routes'
import componentes from './routes/componentes.routes'
import uploads from './routes/uploads.routes'
import equipos from './routes/equipos.routes';
import mantenimientos from './routes/mantenimientos.routes'
import trabajosNoRutinarios from './routes/trabajosNoRutinarios.routes'
//Url encoded permite trabajar con query strings 
//Permite el envío por formularios
app.use(express.urlencoded({extended:true}));
//recursos static
app.use('/public',express.static(`${__dirname}/public`));
//Middleware para el login
//app.use(logger);

//Config de entornos 
//console.log('Aplication: '+config.get('nombre'));
//console.log('BD server: '+config.get('configDB.host'));


//Morgan es un middleware de terceros para el registro de las peticiones http
if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    //console.log('morgan habilitado');
    
    debug('Morgan está habilitado');
    app.use(cors({origin:'*', credentials:true}));
}
if(app.get('env')==='production'){
    //app.use(cors({origin:'http://dermatologiaBettyGarzon:3000', credentials:true}))
    app.use(cors({origin:'*'}))
}
//Trabajos con la base de datos
debug('Conectando con la base de datos');

//Middleware cuando uso la api de usuarios
app.use('/api/usuarios',usuarios);
app.use('/api/auth',auth);
app.use('/api/profile', profile );
app.use('/api/equipos', equipos);
app.use('/api/solicitudes',solicitudes);
app.use('/api/componentes',componentes);
app.use('/api/mantenimientos',mantenimientos);
app.use('/api/trabajosNoRutinarios',trabajosNoRutinarios);
app.use('/api/uploads', uploads)
//Nuevo para recuperar app
module.exports=app;
