import path from 'path';

// const HistoriaClinica = require('../models/HistoriaClinica');
const pdfTemplate = require('../docs/Templates/historiaClinicaTemplate')
const pdf = require('html-pdf');
export const createPdf = (req, res) =>{
        const body = req.body;
        // let indexPath = path.join(__dirname, '../docs/Reportes/reporte.pdf');
        // console.log('path desde create')
        // console.log(indexPath)        
        pdf.create(pdfTemplate(body), {}).toFile(`${__dirname}/reporte.pdf`, (err) => {
            if(err){
                console.log(err)
                res.send(Promise.reject());
            }
            res.send(Promise.resolve());
        })
    
}
export const getPdf = (req, res) =>{
    // let indexPath = path.join(__dirname, '../docs/Reportes/reporte.pdf');
       
    console.log('desde getPdf')
    res.sendFile(`${__dirname}/reporte.pdf`)
    
    // res.sendFile('./docs/Reportes/reporte.pdf', { root: __dirname });
}
// export const getHistoriasClinicasByUserId = (req, res) =>{
//     //res.send("Welcome to user ");
//     let historiasClinicasById = obtenerHistoriasClinicasByUserId(req.params.id);
//     historiasClinicasById.then((accesoHistoriasClinicasById)=>{
//         res.json(accesoHistoriasClinicasById)
//     })
//     .catch((error)=>{
//         console.log(error);
//     })
// }
// export const getHistoriaClinicaById = async (req, res) =>{
//         const historiaClinica = await HistoriaClinica.findById(req.params.id);
//         res.status(200).json(historiaClinica);
// }
// export const updateHistoriaClinicaById = async (req, res) =>{
//         //Para obtener datos actualizados el tercer param
//         const historiaClinicaActualizada = await HistoriaClinica.findByIdAndUpdate(req.params.id, req.body ,{
//             new :true
//         });
//         res.status(200).json(historiaClinicaActualizada);
//         //Encontrar si existe el objeto
//         //Buscando usuario pero como es int entonces parseamos
//         //let usuario = existeUsuario();
//         //let usuario = existeUsuario(req.params.id);
//         //Revisando que exista caso contrario enviamos un cod 404
//         //if(!usuario) res.status(404).send('El usuario no fue encontrado');
        
//         /*
//         const {error, value} = validarUsuario(req.body.nombre);
//         if(error){
//             res.status(400).send(error.details[0].message);
//             return;
//         }
//         usuario.nombre = value.nombre;
//         res.send(usuario);
//         */
// }
// export const deleteHistoriaClinicaById = async (req, res)=>{
//         await HistoriaClinica.findByIdAndDelete(req.params.id);
//         res.status(204).json();
//         //let usuario = existeUsuario(req.params.id);
//         //Revisando que exista caso contrario enviamos un cod 404
//         //if(!usuario) {
//            // res.status(404).send('El usuario no fue encontrado');
//            // return;
//         //}
//         //const index = usuarios.indexOf(usuario);
//         //usuarios.splice(index,1);
    
// }

//FUNCIONES DE LOS CONTROLLERS-------------------------------------------------------------------------------------------------------------

// const obtenerHistoriasClinicasByUserId =async  (id_usuario)=>{
//     const historiasClinicasById = await HistoriaClinica.find({id_usuario});
//     return historiasClinicasById;
// }

//Function crearUsuario
