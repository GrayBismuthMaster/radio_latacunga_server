const mongoose = require("mongoose");
const equipoSchema = new mongoose.Schema({
    nombre                          :       {
                                                type: String,
                                                required:true    
                                            },
    procesador                      :       {
                                                type: String,
                                                required:true    
                                            },
    marca                           :       {
                                                type: String,
                                                required: false
                                            },
    tarjeta_grafica                 :       {
                                                type: String,
                                                required: true
                                            },
    modelo                          :       {
                                                type: String,
                                                required: true
                                            },  
    antivirus                       :       {
                                                type: String,
                                                required: true
                                            },     
    sistema_operativo               :       {
                                                type: String,
                                                required: true
                                            },                                    
    espacio_disco                   :       {
                                                type: String,
                                                required: false
                                            },      
    memoria_ram                     :       {
                                                type : String,
                                                required : false
                                            },      
    area                            :       {
                                                type : String,
                                                required : false
                                            },      
    estado                          :       {
                                                type : Boolean,
                                                required : false,
                                                default : true
                                            },
    fecha_adquirido                 :       {
                                                type : Date,
                                                required : true
                                            },
    año_equipo                      :       {
                                                type : Date,
                                                required : true
                                            },
    prioridad_cpu                   :       {
                                                type : String,
                                                required : true
                                            }
});
module.exports = mongoose.model('Equipo',equipoSchema);