let roleSelectionne = null;

function choisirRole(bouton) {
  document.querySelectorAll('.bttn[data-role]').forEach(b => {
    b.classList.remove('role-actif');
  });
  bouton.classList.add('role-actif');
  roleSelectionne = bouton.dataset.role;
}

async function addStudent() {
  if (!roleSelectionne) {
    alert("Veuillez sélectionner un rôle !");
    return;
  }

  const nom = document.getElementById('name').value;
  const prenom = document.getElementById('surname').value;
  const email = document.getElementById('mail').value;
  const classe = document.getElementById('cls').value;
  const password = document.getElementById('mtd').value;

  if (nom === "" || prenom === "" || email === "" || classe === "" || password === "") {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  try {
    const response = await fetch("https://backend-presence-qp94.onrender.com/utilisateurs", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: roleSelectionne,
        nom, prenom, email, classe, password
      })
    });

    if (!response.ok) {
      throw new Error(`Réponse du serveur : ${response.status}`);
    }

    alert("Utilisateur ajouté avec succès !");
    window.location.href = "dashboard-admin.html";

  } catch (error) {
    console.error(error);
    alert("Impossible d'ajouter l'utilisateur. Réessaie.");
  }
}