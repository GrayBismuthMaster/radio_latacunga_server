import {Router} from 'express'
const router= Router();
const Joi = require('@hapi/joi');
import * as componentesController from '../controllers/componentes.controller'
//Al tener la raiz ya con la ruta solo manejo la raiz
//Petición Get que obtiene todos las historias clinicas
router.get('/',componentesController.getComponentes)
//Petición POST que crea una historia clinica
router.post('/',componentesController.createComponente)
//Petición GET para obtener historias clinicas por id de usuario
router.get('/user/:id',componentesController.getComponenteByUserId)
//Petición GET para obtener historias clinicas por id de historia clinica
router.get('/componente/:id',componentesController.getComponenteById)
//Petición PUT para modificar una historia clinica por id 
router.put('/:id',componentesController.updateComponenteById)
//Petición Delete para borrar una historia clinica por id
router.delete('/:id',componentesController.deleteComponenteById)

//Petición get para el error 404
router.get('*',(req,res)=>{
    res
    .status(404)
    .send(`<h1>No existe la pagina :c</h1>`);
})

module.exports = router;