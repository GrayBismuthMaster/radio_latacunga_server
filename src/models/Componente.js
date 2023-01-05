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
    prioridadComponente             :       {
                                                type : String,
                                                required : true
                                            },
    estadoComponente                :       {
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