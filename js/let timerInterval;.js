let timerInterval;

function startSession(){

    let sessionID = 12345;

    let dataa = "session=" + sessionID;

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
}