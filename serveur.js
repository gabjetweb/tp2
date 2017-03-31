const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const app = express();
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public

var db // variable qui contiendra le lien sur la BD

//Connexion à la base de donnée
MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081')
  })
})

//Affichage et rendu du index.ejs
app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url)
   //Ajout de la fonctionnalité de tri (dans ce cas-ci - par le nom de famille)
    var cursor = db.collection('adresse').find().sort({nom: 1 }).toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('index.ejs', {adresse: resultat})

    }) 
})

//Fonction d'ajout et de modification
app.post('/adresse',  (req, res) => {

     var ajoutAdresse={}; //Object JSON pour stockage

    if(req.body._id !="")//Si le ID est existant
    {
      ajoutAdresse['_id']=ObjectID(req.body._id); //On l'attribue à l'objet JSON
    }

    //Attribution du reste des valeurs
    ajoutAdresse["nom"] = req.body.nom;
    ajoutAdresse["prenom"] = req.body.prenom;
    ajoutAdresse["telephone"] = req.body.telephone;
    ajoutAdresse["ville"] = req.body.ville;
    ajoutAdresse["codePostal"] = req.body.codePostal;

        //Sauvegarde de l'objet JSON dans la collection de la BD
        db.collection('adresse').save(ajoutAdresse, (err, result) => {
        if (err) return console.log(err)
        console.log('sauvegarder dans la BD')
        res.redirect('/')
      })
})

//Fonction de destruction d'objet
app.get('/detruire/:id', (req, res) => {
 var id = req.params.id //Récupération de l'id
 //Destruction de l'objet par son ID
 db.collection('adresse').findOneAndDelete({"_id": ObjectID(req.params.id)}, (err, resultat) => {
 if (err) return console.log(err)
 res.redirect('/')  // redirige vers la route qui affiche la collection
 })
})


