const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const usuarioSchema = new mongoose.Schema({
    nombre              :   { 
                                type: String,
                                required:true
                            },
    fecha_actual        :   {
                                type: Date, 
                                default:Date.now()
                            },
    estado              :   {
                                type: Boolean,
                                default: true
                            },
    area                :   {
                                type : String,
                                required : true
                            },
    imagen              :   {
                                type:String,
                                default : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                            },
    username            :   {
                                type:String, 
                                unique:true,
                            },
    email               :   {
                                type: String,
                                required: true
                            },
    password            :   {
                                type: String,
                                required:true
                            },
    roles               :   [{                                
                                ref: "Rol",
                                type: mongoose.Schema.Types.ObjectId      
                            }]

},{
    timestamps:true,
    versionKey: false
});
usuarioSchema.statics.encryptPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
usuarioSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}
// usuarioSchema.statics.setImagen = function setImagen (filename) { 
//     const host = process.env.HOST;
//     const port = process.env.PORT;
//     this.imagen = `${host}:${port}/public/img/profile/${filename}`;
// }
//Clase -> objetos 
//Model creation
//Schema -> clase, modelo
/*

.find()
.select({autor:1,nombre:1})
.sort({autor:-1})
operadores de mongo
eq = (equal)
ne = (not equal)
gt = (mayor que)
gte = (greater than or equal to, mayor o igual que)
lt = (less than, menor que)
lte = (less than or equal, menor o igual que)
in = (si hay valores dentro de una consulta)
nin = (not in, )

Precios mayores a 10
Curso.find({precio:{$gte:10, lte:30}})
Precios de cursos especificos
.find({precio:{$in : [10,15,25]}})

->OPERADORES LOGICOS Y EXPRESIONES REGULARES
or
and
.find()
.or([{autor:'Grover'},{publicado:true}])

REGEXP
Empiece con la palabra gro  
.find({autor:/^Gro/})
Cuando termine con 
.find({autor:/ver$/})
Cuando un campo tiene un contenido especificio LIKE
.find({autor:/.*ro.*/  
//})

/*
PAGINACION
const numeroPage = 2;
const sizePage = 10;
api/cursos?numeroPage=1&sizePage=10

.find({})
.skip((numeroPage-1) * sizePage)
.limit(sizePage)

ACTUALIZAR CUROSS
const actualizarCursos = async (id)=>{
    const curso = await Curso.findById(id);
    if(!curso){
        console.log('No eciste el curso);
        return;
    }
    curso.publicado = false;
    curso.autor='Nuevo autor';
    curso.set({
        publicado : false,
        autor     : 'nuevo Autor'
    })
    const resultado = await curso.save();
    console.log(resultado);
    //Curso actualizar nuevo
    //UPDATE OPERATORS
    const resultado = await Curso.update({_id: id}, {
        $set:{
            autor:'Grover',
            publicado:true
        }
    })
    console.log(resultado);
    //Tercera manera de actualizar

}
actualizarCursos('121a2sd1as2d');

ELIMINAR CURSOS

const eliminarDocumento = async (id)=>{
    const result = await Curso.deleteOne({_id:id});
    console.log(result);
}
eliminarDocumento('656232as2d3as2d3')

*/

module.exports = mongoose.model('Usuario',usuarioSchema);