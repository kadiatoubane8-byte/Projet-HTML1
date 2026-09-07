
function submition() {
// Récupérer les valeurs saisies
 let matricule = document.getElementById("matri").value;
  let password = document.getElementById("mtd").value;
   // Vérifier que les champs sont remplis 
   if (matricule === "" || password === "") 
    { alert("Veuillez remplir tous les champs"); return; } 
   // Envoyer les informations au backend
    fetch("https://backend-presence-l1z5.onrender.com/login", 
        { method: 'POST',
             headers: { 'Content-Type': 'application/json' }, 
             body: JSON.stringify({ 
                matricule: matricule, 
                email: 'alice.prof@test.local', 
                password:password ,
                 duree:15
         }) }) 
                 // Vérifier la réponse HTTP
                  .then(async response => { 
                    console.log("STATUT HTTP :", response.status);
                     const texte = await response.text(); 
                     console.log("RÉPONSE DU SERVEUR :", texte); 
                     if (!response.ok) { 
                     throw new Error("Erreur HTTP " + response.status); }
                      return JSON.parse(texte); }) 
                      // Récupérer les informations du professeur 
                      .then(data => { console.log("Réponse du backend :", data); 
                        // Stocker uniquement les informations utiles 
                        localStorage.setItem( "nomProf", data.name + " " + data.surname );
                         localStorage.setItem("matricule", data.matricule); 
                         // On peut également garder classe et module 
                         localStorage.setItem("classe", data.classes[0].name); 
                         localStorage.setItem("module", data.modules[0].name); 
                         // Aller au dashboard
                          window.location.href = "dashboard-prof.html"; })
                           // Gérer les erreurs 
                      .catch(error => { 
                        console.error(error)
                        alert("Identifiants incorrects ou erreur de connexion.") }); 
}