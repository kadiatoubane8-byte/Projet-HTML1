/*const classes=[
        {nom:"irt1",
          module:"Algo",
          eleves:[
            {id:"1",nom:"BANE",prenom:"Kadiatou",statut:"Absent"},
            {id:"2",nom:"CISSE",prenom:"Idrissa Ahmadou",statut:"Absent"},
            {id:"3",nom:"DIARISSO",prenom:"Assa Mady",statut:"Absent"},
            {id:"4",nom:"DIARRA",prenom:"Kadidiatou",statut:"Absent"},
          ]
        },
        {nom:"irt2",
          module:"Analyse I",
          eleves:[
            {id:"5",nom:"DIALLO",prenom:"Mariam",statut:"Absent"},
            {id:"6",nom:"CISSE",prenom:"Moussa Ahmadou",statut:"Absent"},
            {id:"7",nom:"DIARISSO",prenom:"Awa Mady",statut:"Absent"},
            {id:"8",nom:"DIARRA",prenom:"Safiatou",statut:"Absent"},
          ]
        },
        {nom:"Prepa1",
          module:"Arduino",
          eleves:[
            {id:"9",nom:"BANE",prenom:"Bintou",statut:"Absent"},
            {id:"10",nom:"CISSE",prenom:"Alima",statut:"Absent"},
            {id:"11",nom:"DIAWARA",prenom:"Adiaratou",statut:"Absent"},
            {id:"12",nom:"DIARRA",prenom:"Kadidiatou",statut:"Absent"},
          ]
        }
    ]
        */
       // Affichage du nom du professeur
let nom = localStorage.getItem("nomProf");

if (nom) {
    document.getElementById("iden").textContent = nom;
}

// Récupération du select
const selectClasse = document.getElementById("choixCls");

// Quand le prof choisit une classe
selectClasse.addEventListener("change", function () {
  selectClasse.dispatchEvent(new Event("change"));

    // Valeur choisie
    const choix = selectClasse.value;

    // Envoi au backend
    fetch("http://adresse_ip:3000/classe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            classe: choix
        })
    })

    // Transformation de la réponse
    .then(reponse => reponse.json())

    // Utilisation des données
    .then(data => {

        // Affichage des informations
        document.getElementById("cls").textContent = data.classe.nom;
        document.getElementById("mod").textContent = data.classe.module;
        document.getElementById("prof").textContent = data.classe.prof.nom;

        // Tableau
        const tbody = document.getElementById("tab");
        tbody.innerHTML = "";

        data.classe.eleves.forEach(function (eleve, index) {

            let ligne = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${eleve.nom}</td>
                    <td>${eleve.prenom}</td>
                    <td>${eleve.statut}</td>
                </tr>
            `;

            tbody.innerHTML += ligne;
        });

        // Comptage
        let presents = data.classe.eleves.filter(function (eleve) {
            return eleve.statut === "Présent";
        });

        let absents = data.classe.eleves.filter(function (eleve) {
            return eleve.statut === "Absent";
        });

        document.getElementById("nbPresent").textContent = presents.length;
        document.getElementById("nbAbsent").textContent = absents.length;

    })
    .catch(error => {
    console.error(error);
    alert("Erreur de communication avec le serveur");
});
let timerInterval;
function startSession(){
    const donnee = { username: 'exampleUser', id: 12 };
    fetch(" https://backend-presence-l1z5.onrender.com/session",{
            method :"POST",
             headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(donnee)
        })

        .then(res=>res.json())
        .then(data=>{
            console.log("reponse backend:",data);
            let sessionID=data.token;
       
    
    let dataa = "Token=" + sessionID;

    document.getElementById("qrcode").innerHTML = "";

    new QRCode(document.getElementById("qrcode"), dataa);

    let timeLeft = 15 * 60;

    timerInterval = setInterval(() => {

        let min = Math.floor(timeLeft / 60);
        let sec = timeLeft % 60;

        document.getElementById("timer").textContent =
            min + ":" + (sec < 10 ? "0" : "") + sec;

        timeLeft--;

        if(timeLeft < 0){
            clearInterval(timerInterval);
            alert("Session terminée");
        }

    }, 1000);
})
.catch(err=>{
    console.error("Erreur:",err);
});
}

});
    