const mongoose = require("mongoose");
const solicitudSchema = new mongoose.Schema({
    fecha_mantenimiento             :       {
                                                type: Date,
                                                required: true
                                            },

    hora_mantenimiento              :       {
                                                type: String,
                                                required: true
                                            },
    area_mantenimiento              :       {
                                                type: String,
                                                required: true
                                            },
    motivo_mantenimiento            :       {
                                                type: String,
                                                required: true
                                            }, 
    observaciones_mantenimiento     :       {
                                                type: String,
                                                required: true
                                            },  
    // tiempo_duracion                 :       {
    //                                             type: Number,
    //                                             required: true
    //                                         },    
    hora_salida                     :       {
                                                type: Date,
                                                required: false
                                            },     
    hora_regreso                    :       {
                                                type: Date,
                                                required: false
                                            },      
    estado_solicitud                :       {
                                                type: String,
                                                required: true
                                            },               
    partes                           :       {
                                                type : Array, 
                                                required : true
                                            },                 

    equipo                          :       {
                                                ref: 'Equipo',
                                                type: mongoose.Schema.Types.ObjectId,
                                                required: true
                                            },
    usuario                         :       {
                                                ref: 'Usuario',
                                                type: mongoose.Schema.Types.ObjectId,
                                                required: true
                                            },
    tipo_solicitud                  :       {
                                                type : String,
                                                required : true
                                            }
    // mantenimiento                   :       {
    //                                             ref: 'Mantenimiento',
    //                                             type: mongoose.Schema.Types.ObjectId,
    //                                             required: true
    //                                         },
    // componente                      :       {
    //                                             ref: 'Componente',
    //                                             type: mongoose.Schema.Types.ObjectId,
    //                                             required: true
    //                                         },
});
module.exports = mongoose.model('Solicitud',solicitudSchema);