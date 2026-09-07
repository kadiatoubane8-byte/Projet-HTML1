// ======================================================
// 1. RÉCUPÉRER LES INFORMATIONS DU PROFESSEUR
// ======================================================

let nomProf = localStorage.getItem("nomProf");
let matriculeProf = localStorage.getItem("matricule");
let classeProf = localStorage.getItem("classe");
let moduleProf = localStorage.getItem("module");


// ======================================================
// 2. AFFICHER LES INFORMATIONS
// ======================================================

if (nomProf) {
    document.getElementById("iden").textContent = nomProf;
}

if (classeProf) {
    document.getElementById("cls").textContent = classeProf;
}

if (moduleProf) {
    document.getElementById("mod").textContent = moduleProf;
}

if (nomProf) {
    document.getElementById("prof").textContent = nomProf;
}


// ======================================================
// 3. BOUTON DE SESSION
// ======================================================

document.getElementById("icone").innerHTML =
    "<i class='bi bi-play-fill'></i> Démarrer session";


// ======================================================
// 4. VARIABLES DU CHRONOMÈTRE
// ======================================================

let timerInterval;
let timeLeft = 15 * 60;


// ======================================================
// 5. DÉMARRER UNE SESSION
// ======================================================

function startSession() {

    // Vérifier qu'on connaît la classe et le module
    if (!classeProf || !moduleProf || !nomProf) {
        alert("Informations du professeur manquantes.");
        return;
    }

    // Informations envoyées au backend
    const donnees = {

        classe: classeProf,

        matricule: matriculeProf,

        matiere: moduleProf,

        duree: 20
    };


    // Envoyer la demande de création de session
    fetch("https://backend-presence-l1z5.onrender.com/session", {

        method: 'POST' ,

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(donnees)
    })
    
    // Transformer la réponse JSON
    .then(response => {

        if (!response.ok) {
            throw new Error("Impossible de créer la session");
        }

        return response.json();
    })

    // Utiliser la réponse
    .then(data => {

        console.log("Session reçue :", data);

        // Le backend nous donne le QR Token
        let qrToken = data.qrToken;

        // Sauvegarder l'id de la session
        localStorage.setItem("sessionId", data.id);

        // ==================================================
        // CRÉER LE QR CODE
        // ==================================================

        document.getElementById("qrcode").innerHTML = "";

        new QRCode(
            document.getElementById("qrcode"),
            qrToken
        );


        // ==================================================
        // CHRONOMÈTRE
        // ==================================================

        timeLeft = 15 * 60;

        clearInterval(timerInterval);

        document.getElementById("end").textContent = "";

        document.getElementById("icone").innerHTML =
            "<i class='bi bi-pause-fill'></i> Session en cours";


        timerInterval = setInterval(function () {

            let min = Math.floor(timeLeft / 60);

            let sec = timeLeft % 60;


            if (min < 10) {
                min = "0" + min;
            }

            if (sec < 10) {
                sec = "0" + sec;
            }


            document.getElementById("time").textContent =
                min + ":" + sec;


            timeLeft--;


            // Session terminée
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

    // ==================================================
    // ERREUR
    // ==================================================

    .catch(error => {

        console.error("Erreur :", error);

        alert("Impossible de démarrer la session.");
    });
}


// ======================================================
// 6. ARRÊTER LA SESSION
// ======================================================

function stop() {

    clearInterval(timerInterval);

    let sessionId = localStorage.getItem("sessionId");


    // S'il n'y a pas de session
    if (!sessionId) {

        document.getElementById("qrcode").innerHTML = "";

        document.getElementById("time").textContent = "15:00";

        document.getElementById("icone").innerHTML =
            "<i class='bi bi-play-fill'></i> Démarrer session";

        return;
    }


    // Demander au backend de clôturer la session
    fetch("https://backend-presence-l1z5.onrender.com/session/stop", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id: sessionId
        })
    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Impossible de clôturer la session");
        }

        return response.json();
    })

    .then(data => {

        console.log("Session clôturée :", data);

        document.getElementById("qrcode").innerHTML = "";

        document.getElementById("time").textContent = "15:00";

        document.getElementById("icone").innerHTML =
            "<i class='bi bi-play-fill'></i> Démarrer session";

        document.getElementById("end").textContent =
            "Session terminée !";

        localStorage.removeItem("sessionId");
    })

    .catch(error => {

        console.error(error);

        alert("Impossible de clôturer la session.");
    });
}