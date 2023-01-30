const mongoose = require("mongoose");
const trabajoNoRutinarioSchema = new mongoose.Schema({
    
    tipo                            :       {
                                                type : String,
                                                required : true
                                            },
    fecha                           :       {
                                                type : Date, 
                                                required : true
                                            },
    nombre                          :       {
                                                type: String,
                                                required:true    
                                            },
    duracion                        :       {
                                                type : String,
                                                required : true
                                            },
    actividad                       :       {
                                                type: String,
                                                required:true    
                                            },
    equipo                          :       {
                                                ref : 'Equipo',
                                                type: mongoose.Schema.Types.ObjectId,
                                                required: true
                                            },
    partes                          :       {
                                                type: Array,
                                                required: false
                                            },
    area                            :       {
                                                type : String,
                                                required : true
                                            },
    prioridad                       :       {
                                                type: String,
                                                required: true
                                            },  
    responsable                     :       {
                                                type: String,
                                                required: true
                                            },     
    procedimiento                   :       {
                                                type: String,
                                                required: true
                                            },                                    
    dias_paro                       :       {
                                                type: String,
                                                required: false
                                            }, 
    estado                          :       {
                                                type : Boolean, 
                                                default : true
                                            },

                            
});
module.exports = mongoose.model('TrabajoNoRutinario',trabajoNoRutinarioSchema);