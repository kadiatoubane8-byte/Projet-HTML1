
const scanResult = document.getElementById("scanResult");

function scanReussi(message){

    scanResult.textContent = "QR détecté : " + message;
    fetch("https://backend-presence-l1z5.onrender.com/presence/scan", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        matricule: localStorage.getItem("matricule"),
        session: message
    })
})
.then(r => r.json())
.then(data => {
    scanResult.textContent = data.message;
});

}

const html5QrCode = new Html5Qrcode("reader");

html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    scanReussi
)
.catch(function(err){
    console.log(err);
    scanResult.textContent = "Impossible d'accéder à la caméra";
})