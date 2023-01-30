import {Router} from 'express'
const router= Router();
const Joi = require('@hapi/joi');
import * as trabajosNoRutinariosController from '../controllers/trabajosNoRutinarios.controller'
//Al tener la raiz ya con la ruta solo manejo la raiz
//Petición Get que obtiene todos las historias clinicas
router.get('/',trabajosNoRutinariosController.getTrabajosNoRutinarios)
//Petición POST que crea una historia clinica
router.post('/',trabajosNoRutinariosController.createTrabajoNoRutinario)
//Petición GET para obtener historias clinicas por id de usuario
router.get('/user/:id',trabajosNoRutinariosController.getTrabajoNoRutinarioByUserId)
//Petición GET para obtener historias clinicas por id de historia clinica
router.get('/trabajoNoRutinario/:id',trabajosNoRutinariosController.getTrabajoNoRutinarioById)
//Petición PUT para modificar una historia clinica por id 
router.put('/:id',trabajosNoRutinariosController.updateTrabajoNoRutinarioById)
//Petición Delete para borrar una historia clinica por id
router.delete('/:id',trabajosNoRutinariosController.deleteTrabajoNoRutinarioById)

//Petición get para el error 404
router.get('*',(req,res)=>{
    res
    .status(404)
    .send(`<h1>No existe la pagina :c</h1>`);
})

module.exports = router;