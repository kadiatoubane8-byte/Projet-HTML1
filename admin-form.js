async function inscriptionAdmin() {
  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  const email = document.getElementById('email').value;
  const tel = document.getElementById('tel').value;
  const nomEtablissement = document.getElementById('nomEtablissement').value;

  if (nom === "" || prenom === "" || email === "" || tel === "" || nomEtablissement === "") {
    alert("Veuillez remplir tous les champs");
    return;
  }

  try {
    const response = await fetch("https://backend-presence-qp94.onrender.com/admin/registers", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, prenom, email, telephone: tel, nomEtablissement })
    });

    if (!response.ok) {
      throw new Error(`Réponse du serveur : ${response.status}`);
    }

    const data = await response.json();

    localStorage.setItem("matricule", data.matricule);
    localStorage.setItem("nomAdmin", data.name);
    localStorage.setItem("prenomAdmin", data.surname);

    alert("Inscription réussie ! Tes identifiants de connexion arrivent par email/SMS, garde-les pour la prochaine fois.");
    window.location.href = "dashboard-admin.html";

  } catch (error) {
    console.error(error);
    alert("Inscription impossible, réessaie.");
  }
}