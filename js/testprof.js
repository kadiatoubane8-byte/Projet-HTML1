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