const Componente = require('../models/Componente');

export const createComponente = (req, res) =>{
        let body = req.body;
        const resultado = crearComponente(body);
        //Toda async function retorna una Promise
        resultado.then( componente => {
            res.status(201).json({
                valor: componente
            });
        }).catch( err =>{
            res.status(400).json({
                error: err
            })
        })
        console.log(resultado);
    
}
export const getComponentes = (req, res) =>{
      //res.send("Welcome to user ");
      let componentes = obtenerComponentes();
      componentes.then((accesoComponentes)=>{
          res.json(accesoComponentes)
      })
      .catch((error)=>{
          console.log(error);
      })
}
export const getComponenteByUserId = (req, res) =>{
    //res.send("Welcome to user ");
    let componenteById = obtenerComponenteByUserId(req.params.id);
    componenteById.then((accesoComponenteById)=>{
        res.json(accesoComponenteById)
    })
    .catch((error)=>{
        console.log(error);
    })
}
export const getComponenteById = async (req, res) =>{
        const componente = await Componente.findById(req.params.id);
        res.status(200).json(componente);
}
export const updateComponenteById = async (req, res) =>{
        //Para obtener datos actualizados el tercer param
        const componenteActualizada = await Componente.findByIdAndUpdate(req.params.id, req.body ,{
            new :true
        });
        res.status(200).json(componenteActualizada);
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
export const deleteComponenteById = async (req, res)=>{
        await Componente.findByIdAndDelete(req.params.id);
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

const obtenerComponentes =async  ()=>{
    const componentes = await Componente.find({});
    return componentes;
}
const obtenerComponenteByUserId =async  (id_usuario)=>{
    const componentesById = await Componente.find({id_usuario});
    return componentesById;
}

//Function crearUsuario

const crearComponente= async (body) =>{     
    const { 
        nombre,    
        marca,          
        area,                 
        num_serie,                
        fecha_adquirido,         
        año_componente,     
        prioridadComponente, 
        estadoComponente,       
        equipo,             
     } = body;
    const componente  = new Componente({
                                    nombre,    
                                    marca,              
                                    area,                 
                                    num_serie,                
                                    fecha_adquirido,         
                                    año_componente,     
                                    prioridadComponente, 
                                    estadoComponente,       
                                    equipo,                       
                                })
    return await componente.save(); 
}