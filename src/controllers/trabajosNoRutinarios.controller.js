const TrabajoNoRutinario = require('../models/TrabajoNoRutinario');

export const createTrabajoNoRutinario =async (req, res) =>{
        let body = req.body;
        const resultado = await crearTrabajoNoRutinario(body);
        console.log(resultado._id)
        //Toda async function retorna una Promise
        const resultadoPopulate = obtenerTrabajosNoRutinariosById(resultado._id);
        console.log(resultadoPopulate);
        resultadoPopulate.then( trabajoNoRutinario => {
            res.status(201).json({
                trabajoNoRutinario
            });
        }).catch( err =>{
            res.status(400).json({
                error: err
            })
        })
        console.log(resultado);
    
}
export const getTrabajosNoRutinarios = (req, res) =>{
      //res.send("Welcome to user ");
      let trabajosNoRutinarios = obtenerTrabajosNoRutinarios();
      trabajosNoRutinarios.then((accesoTrabajosNoRutinarios)=>{
          res.json(accesoTrabajosNoRutinarios)
      })
      .catch((error)=>{
          console.log(error);
      })
}
export const getTrabajoNoRutinarioByUserId = (req, res) =>{
    //res.send("Welcome to user ");
    let trabajoNoRutinarioById = obtenerTrabajoNoRutinarioByUserId(req.params.id);
    trabajoNoRutinarioById.then((accesoTrabajoNoRutinarioById)=>{
        res.json(accesoTrabajoNoRutinarioById)
    })
    .catch((error)=>{
        console.log(error);
    })
}
export const getTrabajoNoRutinarioById = async (req, res) =>{
        const trabajoNoRutinario = await TrabajoNoRutinario.findById(req.params.id);
        res.status(200).json(trabajoNoRutinario);
}
export const updateTrabajoNoRutinarioById = async (req, res) =>{
        //Para obtener datos actualizados el tercer param
        const trabajoNoRutinarioActualizada = await TrabajoNoRutinario.findByIdAndUpdate(req.params.id, req.body ,{
            new :true
        }).populate({
            path : 'equipo'
        });
        res.status(200).json(trabajoNoRutinarioActualizada);
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
export const deleteTrabajoNoRutinarioById = async (req, res)=>{
        await TrabajoNoRutinario.findByIdAndDelete(req.params.id);
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

const obtenerTrabajosNoRutinarios =async  ()=>{
    const trabajosNoRutinarios = await TrabajoNoRutinario.find({}).populate({
        path : 'equipo',
    });
    return trabajosNoRutinarios;
}
const obtenerTrabajoNoRutinarioByUserId =async  (id_usuario)=>{
    const trabajosNoRutinariosById = await TrabajoNoRutinario.find({id_usuario}).populate({
        path : 'equipo'
    });
    return trabajosNoRutinariosById;
}
const obtenerTrabajosNoRutinariosById =async  (_id)=>{
    console.log(_id);
    return await TrabajoNoRutinario.findById(_id).populate({
        path : 'equipo'
    });
}
//Function crearUsuario

const crearTrabajoNoRutinario= async (body) =>{     
    const { 
        nombre,    
        actividad,       
        partes,
        frecuencia,    
        prioridad,  
        responsable,
        procedimiento,
        dias_paro,      
        duracion,
        equipo,
        area,
        tipo,
        fecha
     } = body;
    const trabajoNoRutinario  = new TrabajoNoRutinario({
                                    nombre,    
                                    actividad,       
                                    partes,
                                    frecuencia,    
                                    prioridad,  
                                    responsable,
                                    procedimiento,
                                    dias_paro,    
                                    duracion,
                                    equipo,
                                    area,
                                    tipo,
                                    fecha            
                                })
    return await trabajoNoRutinario.save(); 
}