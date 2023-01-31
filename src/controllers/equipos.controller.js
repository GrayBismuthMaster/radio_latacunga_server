const Equipo = require('../models/Equipo');

export const createEquipo = (req, res) =>{
        let body = req.body;
        const resultado = crearEquipo(body);
        //Toda async function retorna una Promise
        resultado.then( equipo => {
            res.status(201).json({
                equipo
            });
        }).catch( err =>{
            res.status(400).json({
                error: err
            })
        })
        console.log(resultado);
    
}
export const getEquipos = (req, res) =>{
      //res.send("Welcome to user ");
      let equipos = obtenerEquipos();
      equipos.then((accesoEquipos)=>{
          res.json(accesoEquipos)
      })
      .catch((error)=>{
          console.log(error);
      })
}
export const getEquipoByUserId = (req, res) =>{
    //res.send("Welcome to user ");
    let equipoById = obtenerEquipoByUserId(req.params.id);
    equipoById.then((accesoEquipoById)=>{
        res.json(accesoEquipoById)
    })
    .catch((error)=>{
        console.log(error);
    })
}
export const getEquipoById = async (req, res) =>{
        const equipo = await Equipo.findById(req.params.id);
        res.status(200).json(equipo);
}

export const getEquiposByAreaId = async (req,res)=>{
    let equiposArea = await Equipo.find({area: req.params.id});
    res.status(200).json(equiposArea);
}

export const updateEquipoById = async (req, res) =>{
        //Para obtener datos actualizados el tercer param
        const equipoActualizada = await Equipo.findByIdAndUpdate(req.params.id, req.body ,{
            new :true
        });
        res.status(200).json(equipoActualizada);
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
export const deleteEquipoById = async (req, res)=>{
        await Equipo.findByIdAndDelete(req.params.id);
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

const obtenerEquipos =async  ()=>{
    const equipos = await Equipo.find({});
    return equipos;
}
const obtenerEquipoByUserId =async  (id_usuario)=>{
    const equiposById = await Equipo.find({id_usuario});
    return equiposById;
}

//Function crearUsuario

const crearEquipo= async (body) =>{     
    const { 
        nombre,      
        procesador,           
        marca, 
        tarjeta_grafica,          
        modelo,       
        antivirus,
        sistema_operativo,   
        espacio_disco,     
        memoria_ram,            
        area,          
        estado, 
        fecha_adquirido,      
        año_equipo,    
        prioridad_cpu,           
     } = body;
    const equipo  = new Equipo({
                                nombre,                                  
                                procesador,       
                                marca, 
                                tarjeta_grafica,  
                                modelo,
                                antivirus,
                                sistema_operativo,
                                espacio_disco,    
                                memoria_ram,      
                                area,     
                                estado, 
                                fecha_adquirido,  
                                año_equipo,
                                prioridad_cpu,                         
                                })
    return await equipo.save(); 
}