import {Router} from 'express'
const router= Router();
const Joi = require('@hapi/joi');
import * as equiposController from '../controllers/equipos.controller'
//Al tener la raiz ya con la ruta solo manejo la raiz
//Petición Get que obtiene todos las historias clinicas
router.get('/',equiposController.getEquipos)
//Petición POST que crea una historia clinica
router.post('/',equiposController.createEquipo)
router.get('/area/:id',equiposController.getEquiposByAreaId);
//Petición GET para obtener historias clinicas por id de usuario
router.get('/user/:id',equiposController.getEquipoByUserId)
//Petición GET para obtener historias clinicas por id de historia clinica
router.get('/componente/:id',equiposController.getEquipoById)
//Petición PUT para modificar una historia clinica por id 
router.put('/:id',equiposController.updateEquipoById)
//Petición Delete para borrar una historia clinica por id
router.delete('/:id',equiposController.deleteEquipoById)
router.get('/componentes/:id', equiposController.getComponentesByEquipoId);
//Petición get para el error 404
router.get('*',(req,res)=>{
    res
    .status(404)
    .send(`<h1>No existe la pagina :c</h1>`);
})

module.exports = router;