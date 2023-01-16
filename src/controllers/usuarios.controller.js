const Usuario = require('../models/Usuario');
const Rol = require ('../models/Rol');
import jwt from 'jsonwebtoken';
require('dotenv').config({path: 'variables.env'});

export const createUser = async (req, res) =>{
        let body = req.body;
        const usuario  = new Usuario({
            nombre           : body.nombre,
            estado           : body.estado,
            area             : body.area,
            imagen           : body.imagen,
            username         : body.username,
            email            : body.email,
            password         : await Usuario.encryptPassword(body.password)
        })
        console.log("Pdazo"+usuario)
        if(body.roles){
            console.log(body.roles)
        const foundRol = await Rol.find({nombreRol :{$in: body.roles}})
        usuario.roles = foundRol.map(rol => rol._id);
        } else{
        //Si no ingresa nada busca el rol usuario y lo crea
        const rol = await Rol.findOne({nombreRol : "user"});
        //Obtiene el id del rol usuario
        usuario.roles = [rol._id];
        }
        const savedUser = await usuario.save();
        //Token para 24 horas
        const accessToken = jwt.sign({id: savedUser._id},process.env.ACCESSTOKEN,{
        expiresIn: 86400
        })
        const refreshToken = jwt.sign({id: savedUser._id},process.env.REFRESHTOKEN,{
            expiresIn: 86400
        })
        //LocalStorage
       // res.status(200).json({accessToken})
       //Cookies
       // En el date la cookie esta para 300 seconds

       //GET CON POPULATE DE ROLES
       const usuarioPopulate = await Usuario.findById(savedUser._id).populate('roles');
     
       res.status(202)
        .cookie('accessToken', accessToken, 
        {
            expires: new Date( new Date().getTime() + 300 * 100), 
            sameSite: 'strict',
             httpOnly: true
        })
        .cookie('refreshToken',refreshToken,{
            expires: new Date( new Date().getTime() + 300 * 100), 
            sameSite: 'strict',
            httpOnly: true
        })
        .send({
            message:"Creación completa",
            datosUsuarioCreado : usuarioPopulate,
        })
}
export const getUsers = (req, res) =>{
      //res.send("Welcome to user ");
      let usuarios = obtenerUsuarios();
      usuarios.then((accesoUsuarios)=>{
          res.json(accesoUsuarios)
      })
      .catch((error)=>{
          console.log(error);
      })
}
export const getUserById = async (req, res) =>{
        const usuario = await Usuario.findById(req.params.id);
        res.status(200).json(usuario);
}
export const updateUserById = async (req, res) =>{
        //Para obtener datos actualizados el tercer param
        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body ,{
            new :true
        }).populate('roles');
        res.status(200).json(usuarioActualizado);
        //Encontrar si existe el objeto
        //Buscando usuario pero como es int entonces parseamos
        //let usuario = existeUsuario();
        //let usuario = existeUsuario(req.params.id);
        //Revisando que exista caso contrario enviamos un cod 404
        //if(!usuario) res.status(404).send('El usuario no fue encontrado');
        
        /*
        const {error, value} = validarUsuario(req.body.nombre);
        if(error){
            res.status(400).send(error.details[0].message);
            return;
        }
        usuario.nombre = value.nombre;
        res.send(usuario);
        */
}
export const deleteUserById = async (req, res)=>{
        await Usuario.findByIdAndDelete(req.params.id);
        res.status(204).json();
        //let usuario = existeUsuario(req.params.id);
        //Revisando que exista caso contrario enviamos un cod 404
        //if(!usuario) {
           // res.status(404).send('El usuario no fue encontrado');
           // return;
        //}
        //const index = usuarios.indexOf(usuario);
        //usuarios.splice(index,1);
    
}

//FUNCIONES DE LOS CONTROLLERS-------------------------------------------------------------------------------------------------------------

const obtenerUsuarios =async  ()=>{
    const usuarios = await Usuario.find({}).populate('roles');
    return usuarios;
}

//Obtener usuario por ID
const validarUsuario = (nom)=>{
    //Agregando JOI para validaciones
    const schema = Joi.object({
        nombre: Joi.string().min(3).required()
    });
    return (schema.validate({ nombre:nom}))
}