import {Router} from 'express'
const router= Router();
const Joi = require('@hapi/joi');
import * as mantenimientosController from '../controllers/mantenimientos.controller'
//Al tener la raiz ya con la ruta solo manejo la raiz
//Petición Get que obtiene todos las historias clinicas
router.get('/',mantenimientosController.getMantenimientos)
//Petición POST que crea una historia clinica
router.post('/',mantenimientosController.createMantenimiento)
//Petición GET para obtener historias clinicas por id de usuario
router.get('/user/:id',mantenimientosController.getMantenimientoByUserId)
//Petición GET para obtener historias clinicas por id de historia clinica
router.get('/mantenimiento/:id',mantenimientosController.getMantenimientoById)
//Petición PUT para modificar una historia clinica por id 
router.put('/:id',mantenimientosController.updateMantenimientoById)
//Petición Delete para borrar una historia clinica por id
router.delete('/:id',mantenimientosController.deleteMantenimientoById)

//Petición get para el error 404
router.get('*',(req,res)=>{
    res
    .status(404)
    .send(`<h1>No existe la pagina :c</h1>`);
})

module.exports = router;