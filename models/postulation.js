const mongoose = require('mongoose');
const postulationSchema = mongoose.Schema({

    idTalent: {
        type: String
    },
    idOffre: {
        type:String,
      
    },
    
    dateDePostulation: {
        type:Date, 
        default: Date.now 
    },
    dateDeCreation: {
        type:Date, 
        default: Date.now 
    },
    
   
});

module.exports = mongoose.model("Postulation", postulationSchema);


