const nom=localStorage.getItem('nomEtudiant')
const prenom=localStorage.getItem('prenomEtudiant')
const classe=localStorage.getItem('classe')
const module=localStorage.getItem('module')
const matricule=localStorage.getItem('matricule')
const identite=prenom+" "+nom

const scanResult=document.getElementById('scanResult')

document.getElementById('fullname').textContent=identite
document.getElementById('classe').textContent=classe
document.getElementById('module').textContent=module
document.getElementById('nom').textContent=prenom



 async function scanReussi(qrToken){
    await code.stop();
    scanResult.textContent="Qr code détecté.Enregistrement de la présence..."
 try{  const response=await fetch("https://backend-presence-qp94.onrender.com/presence",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(
            { matricule: matricule,

            qrToken: qrToken,

            classe: classe,

            name: nom,

            surname: prenom
          }        )

            }
        )
    
    if(!response.ok){
        throw new Error("Présence refusée");
        
    }
    const message=await response.text()
    scanResult.textContent=message
  }
  catch(error){
    console.error(error)
    scanResult.textContent= "Impossible d'enregistrer la présence.";

  }
  
    
}

const code=new Html5Qrcode("reader");
code.start(

    { facingMode: "environment" },

    {
        fps: 10,
        qrbox: 250
    },

    scanReussi

)
.catch(function(error){
    console.error(error)
    scanResult.textContent="Impossible de démarrer la caméra"
})




