const mongoose = require("mongoose");
const mantenimientoSchema = new mongoose.Schema({
    nombre                          :       {
                                                type: String,
                                                required:true    
                                            },
    actividad                       :       {
                                                type: String,
                                                required:true    
                                            },
    componente                      :       {
                                                ref : 'Componente',
                                                type: mongoose.Schema.Types.ObjectId,
                                                required: false
                                            },
    frecuencia                      :       {
                                                type: String,
                                                required: true
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
    duracion                        :       {
                                                type : Number,
                                            },
    estado                          :       {
                                                type : Boolean, 
                                                default : true
                                            }
});
module.exports = mongoose.model('Mantenimiento',mantenimientoSchema);