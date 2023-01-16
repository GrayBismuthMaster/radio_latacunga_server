import {Router} from 'express'
const router= Router();
const Joi = require('@hapi/joi');
const multer = require('multer');
import {authJwt, verifySignup} from '../middlewares'
//PARA MANEJAR MULTIFORM PART DATA
const upload = require('../libs/storage');

import * as uploadsController from '../controllers/uploads.controller'
//Al tener la raiz ya con la ruta solo manejo la raiz
//Petición Get que obtiene todos los usuarios
router.post('/profile', upload.single('avatar'), uploadsController.uploadProfile )
router.post('/signS3', uploadsController.signS3 )
//Petición get para el error 404
router.get('*',(req,res)=>{
    res
    .status(404)
    .send(`<h1>No existe la pagina :c</h1>`);
})

module.exports = router;
