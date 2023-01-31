import Solicitud from '../models/Solicitud';


export const createSolicitud = (req, res) =>{
        let body = req.body;
        const resultado = crearSolicitud(body);
        //Toda async function retorna una Promise
        resultado.then( solicitud => {
            res.status(201).json(solicitud);
        }).catch( err =>{
            res.status(400).json({
                error: err
            })
        })
        console.log(resultado);
    
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
            path: 'mantenimiento',
            // select: ['nombre']
        }).populate({
            path: 'componente',
            // select: ['nombre']
        });

        res.status(200).json(solicitudActualizada);
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
export const deleteSolicitudById = async (req, res)=>{
        await Solicitud.findByIdAndDelete(req.params.id);
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

const obtenerSolicitudes =async  ()=>{
    const solicitudes = await Solicitud.find({}).populate({
        path: 'usuario',
        // select: ['nombre']
    }).populate({
        path: 'equipo',
        // select: ['nombre']
    })

    // .populate({
    //     path: 'mantenimiento',
    //     // select: ['nombre']
    // }).populate({
    //     path: 'componente',
    //     // select: ['nombre']
    // });
    // const solicitudFormateado = await solicitudes.map(solicitud =>{
    //     const reservaObjeto = {
    //         motivo_reserva : reservaCita.motivo_reserva,
    //         id:reservaCita.id,
    //        fecha_hora_inicio_reserva: new Date(reservaCita.fecha_hora_inicio_reserva),
    //         fecha_hora_fin_reserva: new Date(reservaCita.fecha_hora_fin_reserva),
    //         estado_reserva:reservaCita.estado_reserva,
    //         id_usuario:reservaCita.id_usuario,
    //         id_profesional : reservaCita.id_profesional,
    //         id_especialidad : reservaCita.id_especialidad,
    //         id_consultorio : reservaCita.id_consultorio,
    //     }
    //     return reservaObjeto
    // })
    /*
    const formateado = new Date(reservasCitas[3].fecha_hora_inicio_reserva);
    
    console.log(formateado.toLocaleString());
    */
    return solicitudes;
}
const obtenerSolicitudesByUserId =async  (id_usuario)=>{
    const solicitudesById = await Solicitud.find({id_usuario});
    return solicitudesById;
}

//Function crearUsuario

const crearSolicitud= async (body) =>{
    const {
        fecha_mantenimiento,
        hora_mantenimiento,
        area_mantenimiento,    
        motivo_mantenimiento,   
        observaciones_mantenimiento,  
        tiempo_duracion,
        hora_salida,
        hora_regreso,
        tipo_solicitud,
        estado_solicitud,
        partes,
        equipo,
        usuario,
        mantenimiento,
        componente                 
    } = body;
    const solicitud = new Solicitud({
        fecha_mantenimiento,
        hora_mantenimiento,
        area_mantenimiento,    
        motivo_mantenimiento,   
        observaciones_mantenimiento,  
        tiempo_duracion,
        hora_salida,
        hora_regreso,
        tipo_solicitud,
        estado_solicitud,
        partes,
        equipo,
        usuario,
        mantenimiento,
        componente            
    });
    
    return await solicitud.save(); 
}