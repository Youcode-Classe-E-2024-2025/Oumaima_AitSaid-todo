// Déclaration de constantes
const modalTache = document.getElementById("modalTache");
const ajouterTacheButton = document.getElementById("ajouterTache");
const fermerModalButton = document.getElementById("fermerModal");
const modalDetailTache = document.getElementById("modalDetailTache");
const fermerModalDetailButton = document.getElementById("fermerModalDetail");

const listeAFaire = document.getElementById("listeAFaire");
const listeEnCours = document.getElementById("listeEnCours");
const listeTermine = document.getElementById("listeTermine");

const compteurTotal = document.getElementById("compteurTotal");
const compteurAFaire = document.getElementById("compteurAFaire");
const compteurEnCours = document.getElementById("compteurEnCours");
const compteurTermine = document.getElementById("compteurTermine");

// Variable pour stocker la tâche actuelle 
let tacheActuel = null;


ajouterTacheButton.addEventListener("click", () => {
    resetModalTache();
    modalTache.classList.remove("hidden");
});

// Ferme le modal 
fermerModalButton.addEventListener("click", () => {
    modalTache.classList.add("hidden");
});


fermerModalDetailButton.addEventListener("click", () => {
    modalDetailTache.classList.add("hidden");
});


function resetModalTache() {
    document.getElementById("titre").value = "";
    document.getElementById("description").value = "";
    document.getElementById("echeance").value = "";
    document.getElementById("statut").value = "todo";
    document.getElementById("priorite").value = "P1";
    tacheActuel = null; 
}


function afficherDetailsTache(titre, description, echeance, statut, priorite) {
    document.getElementById("detailTitre").textContent = titre;
    document.getElementById("detailDescription").textContent = description;
    document.getElementById("detailEcheance").textContent = echeance;
    document.getElementById("detailStatut").textContent = statut;
    document.getElementById("detailPriorite").textContent = priorite;
    modalDetailTache.classList.remove("hidden");
}

// Ajoute tache
function ajouterTache(titre, description, echeance, statut, priorite) {
    const tacheElement = document.createElement("div");
    tacheElement.classList.add("border-t-4", "p-4", "mb-4", "rounded-lg");
    tacheElement.classList.add(priorite === "P1" ? "border-red-500" : priorite === "P2" ? "border-yellow-500" : "border-green-500");
    tacheElement.innerHTML = `
        <h3 class="font-bold">${titre}</h3>
        <p class="text-sm">Échéance : ${echeance}</p>
        <p class="text-xs">Priorité : ${priorite}</p>
        
        <div class="flex gap-2 mt-2">
          <button class="edit-button bg-yellow-500 text-white px-2 py-1 rounded">Modifier</button>
          <button class="supprimer-button bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
        </div><select class="statut-select border p-1 rounded">
            <option value="todo" ${statut === "todo" ? "selected" : ""}>À Faire</option>
            <option value="doing" ${statut === "doing" ? "selected" : ""}>En Cours</option>
            <option value="done" ${statut === "done" ? "selected" : ""}>Terminé</option>
        </select>
    `;

    //select statut
    tacheElement.querySelector(".statut-select").addEventListener("change", (event) => {
        const nouveauStatut = event.target.value;
        changerStatutTache(tacheElement, statut, nouveauStatut);
        statut = nouveauStatut; 
        afficherDetailsTache(titre, description, echeance, nouveauStatut, priorite); 
    });

    // supprimer
    tacheElement.querySelector(".supprimer-button").addEventListener("click", (e) => {
        e.stopPropagation(); 
        tacheElement.remove();
        mettreAJourCompteurTache(statut, -1); n
        mettreAJourCompteurTotal();
    });

    // modifier
    tacheElement.querySelector(".edit-button").addEventListener("click", (e) => {
        e.stopPropagation(); 
        if (tacheActuel !== tacheElement) { 
            tacheActuel = tacheElement; 
            document.getElementById("titre").value = titre;
            document.getElementById("description").value = description;
            document.getElementById("echeance").value = echeance;
            document.getElementById("statut").value = statut;
            document.getElementById("priorite").value = priorite;

            modalTache.classList.remove("hidden");
            modalDetailTache.classList.add("hidden");
        } else { 
            afficherDetailsTache(titre, description, echeance, statut, priorite);
        }
    });

    
    tacheElement.addEventListener("click", () => {
        afficherDetailsTache(titre, description, echeance, statut, priorite);
    });

   
    ajouterDansSection(tacheElement, statut);
    mettreAJourCompteurTache(statut, 1);
    mettreAJourCompteurTotal();   
}


function changerStatutTache(tacheElement, ancienStatut, nouveauStatut) {
    mettreAJourCompteurTache(ancienStatut, -1); 
    ajouterDansSection(tacheElement, nouveauStatut);
    mettreAJourCompteurTache(nouveauStatut, 1); 
    mettreAJourCompteurTotal();
}


function ajouterDansSection(tacheElement, statut) {
    if (statut === "todo") {
        listeAFaire.appendChild(tacheElement);
    } else if (statut === "doing") {
        listeEnCours.appendChild(tacheElement);
    } else {
        listeTermine.appendChild(tacheElement);
    }
}

modalTache.addEventListener("submit", (event) => {
    event.preventDefault();

    const titre = document.getElementById("titre").value;
    const description = document.getElementById("description").value;
    const echeance = document.getElementById("echeance").value;
    const statut = document.getElementById("statut").value;
    const priorite = document.getElementById("priorite").value;

    if (tacheActuel) {
        const oldStatus = tacheActuel.querySelector(".statut-select").value;
        tacheActuel.querySelector("h3").textContent = titre;
        tacheActuel.querySelector("p.text-sm").textContent = `Échéance : ${echeance}`;
        tacheActuel.querySelector("p.text-xs").textContent = `Priorité : ${priorite}`;

        if (oldStatus !== statut) {
            changerStatutTache(tacheActuel, oldStatus, statut);
        }

        tacheActuel = null; 
    } else {
        ajouterTache(titre, description, echeance, statut, priorite);
    }

    modalTache.classList.add("hidden");
    resetModalTache();
});

function mettreAJourCompteurTache(statut, increment) {
    const compteurElement = document.getElementById(
      statut === "todo" ? "compteurAFaire" : statut === "doing" ? "compteurEnCours" : "compteurTermine"
    );
    let count = parseInt(compteurElement.textContent.split("|")[1]) + increment;
    compteurElement.textContent = `|${count}`;
}

function mettreAJourCompteurTotal() {
    const total = document.querySelectorAll(".border-t-4").length;
    compteurTotal.textContent = `Total des Tâches : ${total}`;
}      
