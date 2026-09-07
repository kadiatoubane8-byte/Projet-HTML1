function submition() {


    let matricule = document.getElementById("matri").value;
    let password = document.getElementById("mtd").value;
    if(matricule === "" || password === ""){
        alert("Veuillez remplir tous les champs");
        return;
    }
    

   /* if (matricule === "irt1-prof1" && password === "password123!") {

        localStorage.setItem("nomProf", "Mansour");
        localStorage.setItem("matricule", matricule);

        window.location.href = "dashboard-prof.html";

    } else {
        alert("Identifiants incorrects");
    }*/

fetch("https://backend-presence-l1z5.onrender.com/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            matricule:matricule,
            password:password
        })
    }
    
)
.then(reponse=>{
    if (!response.ok) {
            throw new Error("Connexion refusée");
    }
})

.then(data=>{

    /*if(data.success){

        localStorage.setItem("nomProf",data.prof.nom);
        window.location.href="dashboard-prof.html";
    }else{
        alert("Identifiants incorrects");
    }
});*/
   console.log("Réponse du backend :", data);

        localStorage.setItem("nomProf", data.name + " " + data.surname);
        localStorage.setItem("matricule", data.matricule);

        window.location.href = "dashboard-prof.html";

  
})
  .catch(error => {
        console.error(error);
        alert("Erreur de connexion");
    })
}
   