
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