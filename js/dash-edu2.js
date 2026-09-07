// ======================================================
// 1. ZONE DE RÉSULTAT
// ======================================================

const scanResult = document.getElementById("scanResult");


// ======================================================
// 2. INFORMATIONS DE L'ÉTUDIANT
// ======================================================

const matricule = localStorage.getItem("matricule");
const classe = localStorage.getItem("classe");
const nom = localStorage.getItem("nom");
const prenom = localStorage.getItem("prenom");


// ======================================================
// 3. QUAND UN QR CODE EST DÉTECTÉ
// ======================================================

function scanReussi(qrToken) {

    scanResult.textContent =
        "QR détecté. Enregistrement de la présence...";


    // Envoyer la présence au backend
    fetch("https://backend-presence-l1z5.onrender.com/presence/scan", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            matricule: matricule,

            qrToken: qrToken,

            classe: classe,

            name: nom,

            surname: prenom
        })
    })

    // Vérifier la réponse
    .then(response => {

        if (!response.ok) {
            throw new Error("Présence refusée");
        }

        return response.text();
    })

    // Afficher le message du backend
    .then(message => {

        scanResult.textContent = message;

    })

    // Gérer les erreurs
    .catch(error => {

        console.error(error);

        scanResult.textContent =
            "Impossible d'enregistrer la présence.";
    });
}


// ======================================================
// 4. CRÉER LE SCANNER
// ======================================================

const html5QrCode = new Html5Qrcode("reader");


// ======================================================
// 5. DÉMARRER LA CAMÉRA
// ======================================================

html5QrCode.start(

    { facingMode: "environment" },

    {
        fps: 10,
        qrbox: 250
    },

    scanReussi

)

.catch(function (error) {

    console.error(error);

    scanResult.textContent =
        "Impossible d'accéder à la caméra.";
});