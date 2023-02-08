const mongoose = require("mongoose");
const componenteSchema = new mongoose.Schema({
    nombre                          :       {
                                                type: String,
                                                required:true    
                                            },
    marca                           :       {
                                                type: String,
                                                required: false
                                            },
    area                            :       {
                                                type: String,
                                                required: true
                                            },
    num_serie                       :       {
                                                type: String,
                                                required: true
                                            },  
    fecha_adquirido                 :       {
                                                type : Date,
                                                required : true
                                            },
    año_componente                  :       {
                                                type : Date,
                                                required : true
                                            },
    prioridad_componente             :       {
                                                type : String,
                                                required : true
                                            },
    estado_componente                :       {
                                                type : Boolean,
                                                required : false,
                                                default : true
                                            },
    tipo                            :       {
                                                type : String,
                                                required : true
                                            },
    equipo                          :       {
                                                ref : 'Equipo',
                                                type : mongoose.Schema.Types.ObjectId,
                                                required : true
                                            },
});
module.exports = mongoose.model('Componente',componenteSchema);