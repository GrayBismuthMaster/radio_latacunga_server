import {Router} from 'express'
const router= Router();
const Joi = require('@hapi/joi');
import * as pdfsController from '../controllers/pdfs.controller'
//Al tener la raiz ya con la ruta solo manejo la raiz
//Petición Get que obtiene todos las historias clinicas
router.get('/',pdfsController.getPdf)
//Petición POST que crea una historia clinica
router.post('/',pdfsController.createPdf)
//Petición get para el error 404
router.get('*',(req,res)=>{
    res
    .status(404)
    .send(`<h1>No existe la pagina :c</h1>`);
})

module.exports = router;