import User from '../models/Usuario';
import jwt from 'jsonwebtoken';
import Rol from '../models/Rol';
require('dotenv').config({path: 'variables.env'})
let refreshTokens = [];
export const signIn = async (req, res) =>{
    //Populate regresa objeto entero no solo id aparece el nombre del rol también je je
    const userFound = await User.findOne({email : req.body.email}).populate("roles");
    if(!userFound){ return res.status(400).json({message: "User not found"});
    }else{
        console.log(userFound)
        const matchPassword = await User.comparePassword(req.body.password, userFound.password)
    
    if(!matchPassword){
        return res.status(401).json({token: null, message: 'Invalid Password'});
    }else{
        console.log("usuario desde server")
        console.log(userFound);
        //Probar que existe contrasenia
        //Token creation local Storage
        /*
        const token = jwt.sign({id: userFound._id}, process.env.SECRET,{
            expiresIn: 86400
        });
        res.json({token});
        */
       //Refresh Tokens
       refreshTokens.push(refreshToken)
       //Token con cookies httpOnly
       const accessToken = jwt.sign({id: userFound._id},process.env.ACCESSTOKEN,{
        expiresIn: 86400
        })
        const refreshToken = jwt.sign({id: userFound._id},process.env.REFRESHTOKEN,{
            expiresIn: 86400
        })
        //LocalStorage
       // res.status(200).json({accessToken})
       //Cookies
       // En el date la cookie esta para 300 seconds
       res.status(202)
        .cookie('accessToken', accessToken, 
        {
            expires: new Date( new Date().getTime() + 300 * 100), 
            sameSite: 'strict',
             httpOnly: true
        })
        .cookie('authSession', true ,{
            expires: new Date( new Date().getTime() + 300 * 100)
        })
        .cookie('refreshToken',refreshToken,{
            expires: new Date( new Date().getTime() + 300 * 100), 
            sameSite: 'strict',
            httpOnly: true
        })
        .cookie('refreshTokenID',true,{
            expires: new Date( new Date().getTime() + 300 * 100), 
        })
        .send({
            message:"Login successful",
            datosUsuario : userFound,
            token: accessToken,
        })
    
    }
    }
}
export const signup = async(req, res) =>{
    const {nombre, cedula, fecha_nacimiento, sexo, estado_civil, religion, ocupacion, lugar_nacimiento, residencia, domicilio, telefono, estado, imagen, username, email, password, roles}=req.body;
    console.log(req.body);
    const newUser = new User({
        nombre, 
        cedula,
        fecha_nacimiento:  new Date(`${fecha_nacimiento.substring(0,4)}/${fecha_nacimiento.substring(5,7)}/${fecha_nacimiento.substring(8,10)}`),
        sexo,
        estado_civil,
        religion, 
        ocupacion, 
        lugar_nacimiento, 
        residencia, 
        domicilio, 
        telefono, 
        estado, 
        imagen, 
        username, 
        email, 
        password : await User.encryptPassword(password)
    })
    if(roles){
        const foundRol = await Rol.find({nombreRol :{$in: roles}})
        newUser.roles = foundRol.map(rol => rol._id);
    } else{
        //Si no ingresa nada busca el rol usuario y lo crea
        const rol = await Rol.findOne({nombreRol : "user"});
        //Obtiene el id del rol usuario
        newUser.roles = [rol._id];
    }
    const savedUser = await newUser.save();
    console.log(savedUser);
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
       res.status(202)
        .cookie('accessToken', accessToken, 
        {
            expires: new Date( new Date().getTime() + 300 * 100), 
            sameSite: 'strict',
             httpOnly: true
        })
        .cookie('authSession', true ,{
            expires: new Date( new Date().getTime() + 300 * 100)
        })
        .cookie('refreshToken',refreshToken,{
            expires: new Date( new Date().getTime() + 300 * 100), 
            sameSite: 'strict',
            httpOnly: true
        })
        .cookie('refreshTokenID',true,{
            expires: new Date( new Date().getTime() + 300 * 100), 
        })
        .send({
            message:"Creación completa",
            token: accessToken,
            datosUsuario : savedUser
        })
    
}
export const refreshToken = async(req,res,next) =>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken ) return res.status(403).send({message:"Token regenerado no encontado, por favor logeese de nuevo"}); 
    if(!refreshTokens.includes(refreshToken)) return res.status(403).send({message: "Token regenerado bloqueado, por favor logeese de nuevo"});
    jwt.verify(refreshToken,process.env.REFRESHTOKEN,(err,id)=>{
        if(!err){
            const accessToken = jwt.sign({id: id},process.env.ACCESSTOKEN,{
                expiresIn: 86400
            })

            res.status(202)
        .cookie('accessToken', accessToken, 
        {
            expires: new Date( new Date().getTime() + 300 * 100), 
            sameSite: 'strict',
             httpOnly: true
        })
        .cookie('authSession', true ,{
            expires: new Date( new Date().getTime() + 300 * 100)
        })
        .send({
            previousSessionExpire: true,
            success: true
        })
        }else{
            return res.status(403).send({success: false, message: "Token regenerado inválido"});
        }
    })
    
}
export const logOut = (req, res)=>{
    res.clearCookie('refreshToken').clearCookie('accessToken').clearCookie('authSession').clearCookie('refreshTokenID').send('User logged out');
}