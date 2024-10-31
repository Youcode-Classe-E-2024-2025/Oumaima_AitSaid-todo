//declaration de constante
const modalTache = document.getElementById("modalTache");
const ajouterTacheButton = document.getElementById("ajouterTache");
const fermerModalButton = document.getElementById("fermerModal");
const listeAFaire = document.getElementById("listeAFaire");
const listeEnCours = document.getElementById("listeEnCours");
const listeTermine = document.getElementById("listeTermine");

//le button de Ajouter Tache

ajouterTacheButton.addEventListener("click", () => {
    resetModalTache();
    modalTache.classList.remove("hidden");
});

// le button de fermer modal

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
}

//fonction de ajouter une tache

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
          <button class="delete-button bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
        </div>
      `;
    if (statut === "todo") {
        listeAFaire.appendChild(tacheElement);
    } else if (statut === "doing") {
        listeEnCours.appendChild(tacheElement);
    } else {
        listeTermine.appendChild(tacheElement);
    }
}

//faire un submit à modal

modalTache.addEventListener("submit", (event) => {
    event.preventDefault();
    const titre = document.getElementById("titre").value;
    const description = document.getElementById("description").value;
    const echeance = document.getElementById("echeance").value;
    const statut = document.getElementById("statut").value;
    const priorite = document.getElementById("priorite").value;
    ajouterTache(titre, description, echeance, statut, priorite);
    modalTache.classList.add("hidden");
});

