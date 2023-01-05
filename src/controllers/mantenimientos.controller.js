const Mantenimiento = require('../models/Mantenimiento');

export const createMantenimiento = (req, res) =>{
        let body = req.body;
        const resultado = crearMantenimiento(body);
        //Toda async function retorna una Promise
        resultado.then( mantenimiento => {
            res.status(201).json({
                valor: mantenimiento
            });
        }).catch( err =>{
            res.status(400).json({
                error: err
            })
        })
        console.log(resultado);
    
}
export const getMantenimientos = (req, res) =>{
      //res.send("Welcome to user ");
      let mantenimientos = obtenerMantenimientos();
      mantenimientos.then((accesoMantenimientos)=>{
          res.json(accesoMantenimientos)
      })
      .catch((error)=>{
          console.log(error);
      })
}
export const getMantenimientoByUserId = (req, res) =>{
    //res.send("Welcome to user ");
    let mantenimientoById = obtenerMantenimientoByUserId(req.params.id);
    mantenimientoById.then((accesoMantenimientoById)=>{
        res.json(accesoMantenimientoById)
    })
    .catch((error)=>{
        console.log(error);
    })
}
export const getMantenimientoById = async (req, res) =>{
        const mantenimiento = await Mantenimiento.findById(req.params.id);
        res.status(200).json(mantenimiento);
}
export const updateMantenimientoById = async (req, res) =>{
        //Para obtener datos actualizados el tercer param
        const mantenimientoActualizada = await Mantenimiento.findByIdAndUpdate(req.params.id, req.body ,{
            new :true
        });
        res.status(200).json(mantenimientoActualizada);
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
export const deleteMantenimientoById = async (req, res)=>{
        await Mantenimiento.findByIdAndDelete(req.params.id);
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

const obtenerMantenimientos =async  ()=>{
    const mantenimientos = await Mantenimiento.find({});
    return mantenimientos;
}
const obtenerMantenimientoByUserId =async  (id_usuario)=>{
    const mantenimientosById = await Mantenimiento.find({id_usuario});
    return mantenimientosById;
}

//Function crearUsuario

const crearMantenimiento= async (body) =>{     
    const { 
        nombre,    
        actividad,       
        partes,
        frecuencia,    
        prioridad,  
        responsable,
        procedimiento,
        diasParo,      
        equipos,   
        descripcion           
     } = body;
    const mantenimiento  = new Mantenimiento({
                                    nombre,    
                                    actividad,       
                                    partes,
                                    frecuencia,    
                                    prioridad,  
                                    responsable,
                                    procedimiento,
                                    diasParo,      
                                    equipos,   
                                    descripcion                         
                                })
    return await mantenimiento.save(); 
}