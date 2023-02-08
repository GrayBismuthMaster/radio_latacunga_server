const mongoose = require("mongoose");
const solicitudSchema = new mongoose.Schema({
    fecha_hora_solicitud                 :       {
                                                type: Date,
                                                default : Date.now()
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
                                                required: false
                                            },  
    // tiempo_duracion                 :       {
    //                                             type: Number,
    //                                             required: false
    //                                         },    
    fecha_salida                    :       {
                                                type : Date,
                                                required : false
                                            },
    hora_salida                     :       {
                                                type: String,
                                                required: false
                                            },     
    fecha_entrega                   :       {
                                                type : Date,
                                                required : false
                                            },
    hora_entrega                    :       {
                                                type : String,
                                                required : false
                                            },
    fecha_regreso                   :       {
                                                type : Date, 
                                                required : false
                                            },
    hora_regreso                    :       {
                                                type: Date,
                                                required: false
                                            },      
    estado_solicitud                :       {
                                                type: String,
                                                required: true
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
                                            },
    mantenimiento                   :       {
                                                ref: 'Mantenimiento',
                                                type: mongoose.Schema.Types.ObjectId,
                                                required: false
                                            },
    componente                      :       {
                                                ref: 'Componente',
                                                type: mongoose.Schema.Types.ObjectId,
                                                required: true
                                            },
});
module.exports = mongoose.model('Solicitud',solicitudSchema);