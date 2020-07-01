var mongoose = require('mongoose');
var { RendezVous } = require('./RendezVous');
var moment = require('moment');


var RendezVous = mongoose.model('RendezVous', {

  idTalent: {
    type: String,
  }, 
  responsable: {
    type: String
  },

  status: {
    type: String,
    default: "disapproved"
  },
  type: {
    type: String,
  },
  remarque: {
    type: String,
  },

  dateDeCreation: {
    type: String,
    default: moment().format('llll')

  },
  dateDeRendezVous: {
    type: String
  },
  sortedDate: {
    type: Date
  },
  dateFinDeRendezVous: {
    type: String
  },
  Action: {
    type:String,
    default:"up"
  },
  color: {
    type: String
  },

});

module.exports = { RendezVous }