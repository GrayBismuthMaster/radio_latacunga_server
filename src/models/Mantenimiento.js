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
    partes                          :       {
                                                type: Array,
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
    
    diasParo                        :       {
                                                type: Number,
                                                required: false
                                            },    
    equipos                         :       [{
                                                ref : 'Equipo',
                                                type : mongoose.Schema.Types.ObjectId,
                                                required : true   
                                            }],
    descripcion                     :       {
                                                type : String, 
                                                required : false
                                            }
});
module.exports = mongoose.model('Mantenimiento',mantenimientoSchema);