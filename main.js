    // Déclaration de constantes
    const modalTache = document.getElementById("modalTache");
    const modalDetailTache = document.getElementById("modalDetailTache");
    const ajouterTacheButton = document.getElementById("ajouterTache");
    const fermerModalButton = document.getElementById("fermerModal");
    const fermerModalDetailButton = document.getElementById("fermerModalDetail");

    const listeAFaire = document.getElementById("listeAFaire");
    const listeEnCours = document.getElementById("listeEnCours");
    const listeTermine = document.getElementById("listeTermine");
    
// Variable pour stocker la tâche actuelle 
    let tacheCourante = null;

    // Total task counter
    const compteurTotal = document.getElementById("compteurTotal");


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

   // Ajoute tache
    function ajouterTache(titre, description, echeance, statut, priorite) {
        const tacheElement = document.createElement("div");
        tacheElement.classList.add("border-l-4", "p-4", "mb-4", "rounded-lg");
        tacheElement.classList.add(
            priorite === "P1" ? "border-red-600" : priorite === "P2" ? "border-orange-500" : "border-green-500"
        );
        tacheElement.innerHTML = `
            <h3 class="font-bold text-gray-800">${titre}</h3>
            <p class="text-sm text-gray-600">Échéance : ${echeance}</p>
            <p class="text-xs text-gray-500">Priorité : ${priorite}</p>
            <div class="flex gap-2 mt-2">
                <button class="edit-button bg-yellow-500 text-white px-2 py-1 rounded">Modifier</button>
                <button class="delete-button bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
            </div>
        `;

         // supprimer
        tacheElement.querySelector(".delete-button").addEventListener("click", (e) => {
            e.stopPropagation();
            const statutAAjouter = statut === "todo" ? "todo" : statut === "doing" ? "doing" : "done";
            tacheElement.remove();
            mettreAJourCompteurTache(statutAAjouter);
            mettreAJourCompteurTotal();
        });

         // modifier
        tacheElement.querySelector(".edit-button").addEventListener("click", (e) => {
            e.stopPropagation();
            tacheCourante = tacheElement;
            document.getElementById("titre").value = titre;
            document.getElementById("description").value = description;
            document.getElementById("echeance").value = echeance;
            document.getElementById("statut").value = statut;
            document.getElementById("priorite").value = priorite;
            modalTache.classList.remove("hidden");
            modalDetailTache.classList.add("hidden");
        });

      
        tacheElement.addEventListener("click", () => {
            afficherDetailsTache(titre, description, echeance, statut, priorite);
        });

        if (statut === "todo") {
            listeAFaire.appendChild(tacheElement);
        } else if (statut === "doing") {
            listeEnCours.appendChild(tacheElement);
        } else {
            listeTermine.appendChild(tacheElement);
        }

        mettreAJourCompteurTache(statut);
        mettreAJourCompteurTotal();
    }

    
    function mettreAJourCompteurTache(statut) {
        const compteur = document.querySelectorAll(
            `#${statut === "todo" ? "listeAFaire" : statut === "doing" ? "listeEnCours" : "listeTermine"} .border-l-4`
        ).length;
        document.getElementById(statut === "todo" ? "compteurAFaire" : statut === "doing" ? "compteurEnCours" : "compteurTermine").textContent = `|${compteur}`;
    }

    
    function mettreAJourCompteurTotal() {
        const total = document.querySelectorAll(".border-l-4").length;
        compteurTotal.textContent = `Total des Tâches : ${total}`;
    }

    // details
    function afficherDetailsTache(titre, description, echeance, statut, priorite) {
        document.getElementById("detailTitre").textContent = titre;
        document.getElementById("detailDescription").textContent = description;
        document.getElementById("detailEcheance").textContent = echeance;
        document.getElementById("detailStatut").textContent = statut;
        document.getElementById("detailPriorite").textContent = priorite;
        modalDetailTache.classList.remove("hidden");
    }

   
    document.getElementById("filtrerInput").addEventListener("input", (e) => {
        const valeurFiltre = e.target.value.toUpperCase();

        document.querySelectorAll("section > div > div").forEach(tache => {
            const textePriorite = tache.querySelector("p.text-xs").textContent.toUpperCase();

            const isPriorityMatch = textePriorite.includes(valeurFiltre);
            tache.style.display = isPriorityMatch  ? "block" : "none";
        });
    });

    //vider le modal
    function resetModalTache() {
        document.getElementById("titre").value = "";
        document.getElementById("description").value = "";
        document.getElementById("echeance").value = "";
        document.getElementById("statut").value = "todo";
        document.getElementById("priorite").value = "P1";
        tacheCourante = null;
    }

    
    modalTache.addEventListener("submit", (event) => {
        event.preventDefault();
        const titre = document.getElementById("titre").value;
        const description = document.getElementById("description").value;
        const echeance = document.getElementById("echeance").value;
        const statut = document.getElementById("statut").value;
        const priorite = document.getElementById("priorite").value;
// regex
        const titreRegex = /^[a-zA-Z0-9 ]{10,}$/;
        const descriptionRegex = /^.{5,200}$/;
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        
        if (!titreRegex.test(titre)) {
            alert("Le titre doit contenir au moins 10 caractères alphanumeriques");
            return;
        }
        if (description && !descriptionRegex.test(description)) {
            alert("La description doit contenir entre 5 et 200 caracteres");
            return;
        }
        if (!dateRegex.test(echeance)) {
            alert("La date doit être au format AAAA-MM-JJ");
            return;
        }

        if (tacheCourante) {
            
            tacheCourante.querySelector("h3").textContent = titre;
            tacheCourante.querySelector("p.text-sm").textContent = `Échéance : ${echeance}`;
            tacheCourante.querySelector("p.text-xs").textContent = `Priorité : ${priorite}`;
            tacheCourante = null;
        } else {
            
            ajouterTache(titre, description, echeance, statut, priorite);
        }

        modalTache.classList.add("hidden");
    });
    

