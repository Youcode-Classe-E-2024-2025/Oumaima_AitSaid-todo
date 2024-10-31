const ajouter = document.getElementById('ajouterTache');
const fermer = document.getElementById('fermerForm');
const openForm = document.getElementById("FormTache");
ajouter.addEventListener("click", ()=> {
    
    openForm.classList.remove("hidden");
});

fermer.addEventListener("click",() => {openForm.classList.add("hidden");
    
}
 )
function ajouterTache(
    
){

}