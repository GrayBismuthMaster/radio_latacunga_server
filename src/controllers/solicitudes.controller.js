import Solicitud from '../models/Solicitud';


export const createSolicitud =async (req, res) =>{
        let body = req.body;
        const resultado = await crearSolicitud(body);
        //Toda async function retorna una Promise
        
        console.log(resultado);
        const solicitud = await Solicitud.findById(resultado._id).populate({
            path: 'usuario',
            // select: ['nombre']
        }).populate({
            path: 'equipo',
            // select: ['nombre']
        }).populate({
            path : 'mantenimiento'
        });
        console.log(solicitud);
        try {
            res.status(201).json(solicitud);
            
            
        } catch (error) {
            res.status(400).json({
                error
            })   
        }
    
}
export const getSolicitudes = (req, res) =>{
      //res.send("Welcome to user ");
      let solicitudes = obtenerSolicitudes();
      solicitudes.then((accesoSolicitudes)=>{
          res.json(accesoSolicitudes)
      })
      .catch((error)=>{
          console.log(error);
      })
}
export const getSolicitudesByType = (req, res) =>{
    //res.send("Welcome to user ");
    console.log('type recibido', req.params.type)
    let solicitudes = obtenerSolicitudesByType(req.params.type);
    solicitudes.then((accesoSolicitudes)=>{
        res.json(accesoSolicitudes)
    })
    .catch((error)=>{
        console.log(error);
    })
}
export const getSolicitudByUserId = (req, res) =>{
    //res.send("Welcome to user ");
    let solicitudById = obtenerSolicitudesByUserId(req.params.id);
    solicitudById.then((accesoSolicitudById)=>{
        res.json(accesoSolicitudById)
    })
    .catch((error)=>{
        console.log(error);
    })
}
export const getSolicitudById = async (req, res) =>{
        const solicitud = await Solicitud.findById(req.params.id);
        res.status(200).json(solicitud);
}
export const updateSolicitudById = async (req, res) =>{
        //Para obtener datos actualizados el tercer param
        const solicitudActualizada = await Solicitud.findByIdAndUpdate(req.params.id, req.body ,{
            new :true
        }).populate({
            path: 'usuario',
            // select: ['nombre']
        }).populate({
            path: 'equipo',
            // select: ['nombre']
        }).populate({
            path : 'mantenimiento'
        }).populate({
            path : 'componente'
        })

        res.status(200).json(solicitudActualizada);
}
export const deleteSolicitudById = async (req, res)=>{
        await Solicitud.findByIdAndDelete(req.params.id);
        res.status(204).json();
    
}

//FUNCIONES DE LOS CONTROLLERS-------------------------------------------------------------------------------------------------------------

const obtenerSolicitudes =async  ()=>{
    const solicitudes = await Solicitud.find({}).populate({
        path: 'usuario',
        // select: ['nombre']
    }).populate({
        path: 'equipo',
        // select: ['nombre']
    }).populate({
        path : 'componente'
    }).populate({
        path : 'mantenimiento'
    })
    return solicitudes;
}
const obtenerSolicitudesByType =async  (type)=>{
    const solicitudes = await Solicitud.find({tipo_solicitud : type}).populate({
        path: 'usuario',
    }).populate({
        path: 'equipo',
    }).populate({
        path : 'componente'
    }).populate({
        path : 'mantenimiento'
    })
    console.log('solicitudes recibidas', solicitudes);
    return solicitudes;
}
const obtenerSolicitudesByUserId =async  (id_usuario)=>{
    const solicitudesById = await Solicitud.find({id_usuario});
    return solicitudesById;
}

//Function crearUsuario

const crearSolicitud= async (body) =>{
    const {
        fecha_hora_solicitud,
        area_mantenimiento,    
        motivo_mantenimiento,   
        observaciones_mantenimiento,  
        // tiempo_duracion,
        hora_salida,
        hora_regreso,
        tipo_solicitud,
        estado_solicitud,
        equipo,
        usuario,
        mantenimiento,
        componente                 
    } = body;
    const solicitud = new Solicitud({
        fecha_hora_solicitud,
        area_mantenimiento,    
        motivo_mantenimiento,   
        observaciones_mantenimiento,  
        // tiempo_duracion,
        hora_salida,
        hora_regreso,
        tipo_solicitud,
        estado_solicitud,
        equipo,
        usuario,
        mantenimiento,
        componente            
    });
    
    return await solicitud.save(); 
}