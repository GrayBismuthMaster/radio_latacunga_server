import {Router} from 'express'
const router= Router();
const Joi = require('@hapi/joi');
import * as solicitudesController from '../controllers/solicitudes.controller'
//Al tener la raiz ya con la ruta solo manejo la raiz
//Petición Get que obtiene todos las historias clinicas
router.get('/',solicitudesController.getSolicitudes)

//Petición Get que obtiene todos las historias clinicas
router.get('/type/:type',solicitudesController.getSolicitudesByType)
//Petición POST que crea una historia clinica
router.post('/',solicitudesController.createSolicitud)
//Petición GET para obtener historias clinicas por id de usuario
router.get('/user/:id',solicitudesController.getSolicitudByUserId)
//Petición GET para obtener historias clinicas por id de historia clinica
router.get('/solicitud/:id',solicitudesController.getSolicitudById)
//Petición PUT para modificar una historia clinica por id 
router.put('/:id',solicitudesController.updateSolicitudById)
//Petición Delete para borrar una historia clinica por id
router.delete('/:id',solicitudesController.deleteSolicitudById)

//Petición get para el error 404
router.get('*',(req,res)=>{
    res
    .status(404)
    .send(`<h1>No existe la pagina :c</h1>`);
})

module.exports = router;