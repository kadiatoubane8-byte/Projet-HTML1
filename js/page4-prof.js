let timerInterval;
function startSession(){
    fetch(" https://backend-presence-l1z5.onrender.com/session",{
     method :"POST"
            
        })

        .then(res=>res.json())
        .then(data=>{
            console.log("reponse backend:",data);
            let sessionID=data.id || data.sessionId;
       
    
    let now=new Date();
    let heure=now.toLocaleTimeString();
    //let sessionID=Date.now();
    let dataa="session="+sesssionID;
    document.getElementById("qrcode").innerHTML="";
    new QRCode(document.getElementById("qrcode"),dataa);
    let timeLeft=15*60;
    timerInterval=setInterval(()=>{
        let min=Math.floor(timeLeft/60);
        let sec=timeLeft % 60;
        document.getElementById("timer").textContent=min+":"+(sec < 10 ? "0" : "")+sec;
        timeLeft--;
        if (timeLeft < 0){
            clearInterval(timerInterval);
            alert("Session terminée");
        }
    },1000);
})
.catch(err=>{
    console.error("Erreur:",err);
});
}