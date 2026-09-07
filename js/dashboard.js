// ======================================================
// 1. AFFICHER LE NOM DU PROFESSEUR
// ======================================================

let nom = localStorage.getItem("nomProf");

if (nom) {
    document.getElementById("iden").textContent = nom;
}


// ======================================================
// 2. INITIALISER LE BOUTON "DÉMARRER SESSION"
// ======================================================

document.getElementById("icone").innerHTML =
    "<i class='bi bi-play-fill'></i> Démarrer session";


// ======================================================
// 3. CHOIX DE LA CLASSE
// ======================================================

const selectClasse = document.getElementById("choixCls");

selectClasse.addEventListener("change", function () {

    // Récupérer la classe choisie
    const choix = selectClasse.value;

    // Envoyer la classe au backend
    fetch("https://backend-presence-l1z5.onrender.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            classe: choix
        })
    })

    // Transformer la réponse JSON en objet JavaScript
    .then(reponse => reponse.json())

    // Utiliser les données reçues
    .then(data => {

        // ------------------------------
        // Afficher les informations
        // ------------------------------

        document.getElementById("cls").textContent =
            data.classe.nom;

        document.getElementById("mod").textContent =
            data.classe.module;

        document.getElementById("prof").textContent =
            data.classe.prof.nom;


        // ------------------------------
        // Afficher la liste des élèves
        // ------------------------------

        const tbody = document.getElementById("tab");

        // Vider l'ancien tableau
        tbody.innerHTML = "";

        // Parcourir tous les élèves
        data.classe.eleves.forEach(function (eleve, index) {

            let ligne = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${eleve.nom}</td>
                    <td>${eleve.prenom}</td>
                    <td>${eleve.statut}</td>
                </tr>
            `;

            // Ajouter la ligne au tableau
            tbody.innerHTML += ligne;
        });


        // ------------------------------
        // Compter les présents
        // ------------------------------

        let presents = data.classe.eleves.filter(function (eleve) {
            return eleve.statut === "Présent";
        });


        // ------------------------------
        // Compter les absents
        // ------------------------------

        let absents = data.classe.eleves.filter(function (eleve) {
            return eleve.statut === "Absent";
        });


        // ------------------------------
        // Afficher les compteurs
        // ------------------------------

        document.getElementById("nbPresent").textContent =
            presents.length;

        document.getElementById("nbAbsent").textContent =
            absents.length;

    })

    // Gérer les erreurs de communication
    .catch(error => {

        console.error(error);

        alert("Erreur de communication avec le serveur");

    });

});


// ======================================================
// 4. VARIABLES DE SESSION
// ======================================================

let timerInterval;
let timeLeft = 15 * 60;


// ======================================================
// 5. DÉMARRER LA SESSION
// ======================================================

function startSession() {

    // Données envoyées au backend
    const donnee = {
        username: "exampleUser",
        id: 12
    };


    // Demander au backend de créer une session
    fetch("https://backend-presence-l1z5.onrender.com/session", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(donnee) 

    })

    // Transformer la réponse en objet JavaScript
    .then(response => response.json())

    // Utiliser les informations reçues
    .then(data => {

        console.log("Réponse backend :", data);


        // Récupérer le token de session
        let sessionID = data.token;


        // -----------------------------------
        // Créer le contenu du QR code
        // -----------------------------------

        let dataQR = "Token=" + sessionID;


        // Vider l'ancien QR code
        document.getElementById("qrcode").innerHTML = "";


        // Générer le QR code
        new QRCode(
            document.getElementById("qrcode"),
            dataQR
        );


        // -----------------------------------
        // Réinitialiser le temps
        // -----------------------------------

        timeLeft = 15 * 60;


        // Arrêter un éventuel ancien chrono
        clearInterval(timerInterval);


        // Changer le bouton
        document.getElementById("icone").innerHTML =
            "<i class='bi bi-pause-fill'></i> Pause";


        document.getElementById("end").textContent = "";


        // -----------------------------------
        // Démarrer le chrono
        // -----------------------------------

        timerInterval = setInterval(function () {

            let min = Math.floor(timeLeft / 60);
            let sec = timeLeft % 60;


            // Ajouter un 0 devant les secondes
            if (sec < 10) {
                sec = "0" + sec;
            }


            // Ajouter un 0 devant les minutes
            if (min < 10) {
                min = "0" + min;
            }


            // Afficher le temps
            document.getElementById("time").textContent =
                min + ":" + sec;


            // Diminuer le temps
            timeLeft--;


            // Quand le temps est terminé
            if (timeLeft < 0) {

                clearInterval(timerInterval);

                document.getElementById("qrcode").innerHTML = "";

                document.getElementById("time").textContent =
                    "00:00";

                document.getElementById("icone").innerHTML =
                    "<i class='bi bi-play-fill'></i> Démarrer session";

                document.getElementById("end").textContent =
                    "Session terminée !";
            }

        }, 1000);

    })

    // Erreur de communication avec le backend
    .catch(error => {

        console.error("Erreur :", error);

        alert("Impossible de démarrer la session.");

    });
}


// ======================================================
// 6. ARRÊTER LA SESSION MANUELLEMENT
// ======================================================

function stop() {

    // Arrêter le chrono
    clearInterval(timerInterval);


    // Remettre le temps à 15 minutes
    timeLeft = 15 * 60;

    document.getElementById("time").textContent =
        "15:00";


    // Effacer le QR code
    document.getElementById("qrcode").innerHTML = "";


    // Remettre le bouton
    document.getElementById("icone").innerHTML =
        "<i class='bi bi-play-fill'></i> Démarrer session";


    // Afficher le message
    document.getElementById("end").textContent =
        "Session terminée !";
}