const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const Talent = require('../models/talents');
var Offre = require('../models/offre');
var Postulation = require('../models/postulation');
var Group = require('../models/groupe');



// nbr Talent
router.get("/talents", (req, res, next) => {
    Talent.find({ statut : 'Activé'}).then(documents => {
      res.status(200).json({
        message: "Talents récupérés avec succès!!",
        NombreTalents: documents.length
      });
    });
  });

// nbr Offre 
router.get("/offres", (req, res, next) => {
    Offre.find({ statut : 'Active'}).countDocuments().then(documents => {
      res.status(200).json({
        message: "Offres récupérées avec succès!!",
        NombreOffres: documents
      });
    });
  });

//nbr postulation 
router.get("/postulations", (req, res, next) => {
    Postulation.find({ }).countDocuments().then(documents => {
      res.status(200).json({
        message: "Postulations récupérées avec succès!!",
        NombrePostulations: documents
      });
    });
  });

  //nbr Group

  router.get("/groups", (req, res, next) => {
    Group.find({ }).countDocuments().then(documents => {
      res.status(200).json({
        message: "Groupes récupérés avec succès!!",
        NombreGroups: documents
      });
    });
  });

  // nbr de talents Activé par domaine 

  router.get("/talentDomaine/Active", (req, res, next) => {
    Talent.aggregate([ {$match : { statut : 'Activé'}},
        { $group : { _id : { domaine: "$domaine" }, Total : { $sum : 1 }  }}
        ]).then(documents => {
      res.status(200).json({
        message: "stats recupérées avec succès!!",
        stats : documents
      });
    });
  });


  // nbr de talents par domaine 
  router.get("/talentDomaine", (req, res, next) => {
    Talent.aggregate([ 
        { $group : { _id : { domaine: "$domaine" }, Total : { $sum : 1 }  }}
        ]).then(documents => {
      res.status(200).json({
        message: "stats recupérées avec succès!!",
        stats : documents
      });
    });
  });

// nbr d'offres par domaine
router.get("/offreDomaine", (req, res, next) => {
    Offre.aggregate([ {$match : { statut : 'Active'}},
        { $group : { _id : { domaine: "$domaine" }, Total : { $sum : 1 }  }}
        ]).then(documents => {
      res.status(200).json({
        message: "stats recupérées avec succès!!",
        stats : documents
      });
    });
  });
 

  // nbr de postulation par talent
  router.get("/postTalent", async function (req, res, next)  {
    Postulation.aggregate([ 
        { $group : { _id : { talent: "$idTalent" }, Total : { $sum : 1 }} }

        ]).then( async function (documents) {
            
            for(var i=0; i< documents.length ; i++) 
            {
                var user = await Talent.findById({_id:documents[i]['_id']['talent']}).exec();
                documents[i]['_id']['talent'] = user['username'];
            }            
      res.status(200).json({
          
        message: "stats recupérées avec succès!!",
        stats : documents
      });
    });
  });


  module.exports = router;
