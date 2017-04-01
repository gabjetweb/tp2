
function modifier_adresse(elm){

        //appel de la fonction à partir de l'élément cliqué

        var elmLigne = elm.parentNode.parentNode; //association à son élément parent : <tr>

        //envoie des informations HTML de l'élément vers le formulaire d'ajout
          document.getElementById("nom").value = elmLigne.children[0].innerHTML;
          document.getElementById("prenom").value = elmLigne.children[1].innerHTML;
          document.getElementById("telephone").value = elmLigne.children[2].innerHTML;
          document.getElementById("ville").value = elmLigne.children[3].innerHTML;
          document.getElementById("codePostal").value = elmLigne.children[4].innerHTML;
          document.getElementById("_id").value = elmLigne.children[5].innerHTML;

        //Soumission et envoie
        var elmForm = document.getElementById("formulaire");
        elmForm.submit();

}

function modifier_AJAX(elm){
//Test AJAX - Ne fonctionne pas
//Le problème est probablement au niveau du serveur...
        //console.log('J'entre !);
        var elmLigne = elm.parentNode.parentNode;

          var nom = elmLigne.children[0].innerHTML;
          var prenom = elmLigne.children[1].innerHTML;
          var telephone = elmLigne.children[2].innerHTML;
          var ville = elmLigne.children[3].innerHTML;
          var codePostal = elmLigne.children[4].innerHTML;
          var id = elmLigne.children[5].innerHTML;

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", event => {

          if(xhr.readyState == 4 && xhr.status == 200) {
            elm.style.color = "#2ecc71";
          }
        });

        xhr.open('GET', "/", true);
        var data = { 
          "modif":{
            "nom" : nom,
            "prenom" : prenom,
            "telephone" : telephone,
            "ville" : ville,
            "codePostal" : codePostal
          },
          "_id" : id 
        };

        //console.log(data);
        var sData = JSON.stringify(data);
        //console.log(sData);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(sData);
}