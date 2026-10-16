
async function submition() {
 const matricule=document.getElementById('matri').value;
const password=document.getElementById('mtd').value;

if(matricule===""|| password===""){
    window.alert('Veuillez remplir tous les champs');
    return;
}


try{
const response= await fetch("https://backend-presence-qp94.onrender.com/login",
    
    { 
        method:'POST',
        headers:{
       
       'Content-Type':'application/json'
    },
    body:JSON.stringify({
        matricule:matricule,
        password:password
    })

    });
    
if(!response.ok){
    throw new Error(`REPONSE DU SERVEUR ${response.status}`)
  }
const data =await response.json ()
  console.log(response)
  const role=data.role;
  if(role==="prof"){
    
                        localStorage.setItem( "nomProf", profData.name + " " + profData.surname );
                      
                         localStorage.setItem("matricule", profData.matricule); 
                       
                         localStorage.setItem("classe", profData.classes[0].name); 
                         localStorage.setItem("module", profData.modules[0].name); 
                        
                       
                          window.location.href = "dashboard-prof.html"; 
                
                       
}else if (role === "admin") {
  localStorage.setItem("matricule", data.matricule);
  localStorage.setItem("nomAdmin", data.name);
  localStorage.setItem("prenomAdmin", data.surname);
  window.location.href = "dashboard-admin.html";

}else{
 
    localStorage.setItem("matricule",data.matricule)
    localStorage.setItem("nomEtudiant",data.name);
    localStorage.setItem("prenomEtudiant",data.surname);

    localStorage.setItem("classe",data.classe);
    localStorage.setItem("module",data.module);
    

    window.location.href="dashboard-etu.html";


    




}
}catch(error){
    console.error(error);
    alert("connexion impossible! Réessaie")
}
}
