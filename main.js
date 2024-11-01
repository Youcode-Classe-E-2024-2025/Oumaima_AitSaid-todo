// déclaration de constante
const modalTache = document.getElementById("modalTache");
const ajouterTacheButton = document.getElementById("ajouterTache");
const fermerModalButton = document.getElementById("fermerModal");
const listeAFaire = document.getElementById("listeAFaire");
const listeEnCours = document.getElementById("listeEnCours");
const listeTermine = document.getElementById("listeTermine");

// variable pour la tâche actuelle
let tacheActuel = null;

// le bouton Ajouter Tâche
ajouterTacheButton.addEventListener("click", () => {
    resetModalTache();
    modalTache.classList.remove("hidden");
});

// le bouton de fermer modal
fermerModalButton.addEventListener("click", () => {
    modalTache.classList.add("hidden");
});

// fonction de vider le modal
function resetModalTache() {
    document.getElementById("titre").value = "";
    document.getElementById("description").value = "";
    document.getElementById("echeance").value = "";
    document.getElementById("statut").value = "todo";
    document.getElementById("priorite").value = "P1";
    tacheActuel = null; 
}

// fonction pour ajouter une tâche
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
        </div>
    `;
    
   
    if (statut === "todo") {
        listeAFaire.appendChild(tacheElement);
    } else if (statut === "doing") {
        listeEnCours.appendChild(tacheElement);
    } else {
        listeTermine.appendChild(tacheElement);
    }

    // bouton de suppression
    tacheElement.querySelector(".supprimer-button").addEventListener("click", () => {
        tacheElement.remove();
    });

    // bouton de modification
    tacheElement.querySelector(".edit-button").addEventListener("click", () => {
        tacheActuel = tacheElement; 
        document.getElementById("titre").value = titre;
        document.getElementById("description").value = description;
        document.getElementById("echeance").value = echeance;
        document.getElementById("statut").value = statut; 
        document.getElementById("priorite").value = priorite;

        modalTache.classList.remove("hidden");
    });
}

modalTache.addEventListener("submit", (event) => {
    event.preventDefault();

   
    const titre = document.getElementById("titre").value;
    const description = document.getElementById("description").value;
    const echeance = document.getElementById("echeance").value;
    const statut = document.getElementById("statut").value;
    const priorite = document.getElementById("priorite").value;

    if (tacheActuel) {
        tacheActuel.querySelector("h3").textContent = titre;
        tacheActuel.querySelector("p.text-sm").textContent = `Échéance : ${echeance}`;
        tacheActuel.querySelector("p.text-xs").textContent = `Priorité : ${priorite}`;

        if (statut === "todo") {
            listeAFaire.appendChild(tacheActuel);
        } else if (statut === "doing") {
            listeEnCours.appendChild(tacheActuel);
        } else {
            listeTermine.appendChild(tacheActuel);
        }

        tacheActuel = null; 
    } else {
        ajouterTache(titre, description, echeance, statut, priorite);
    }

    modalTache.classList.add("hidden");

    resetModalTache();
});
