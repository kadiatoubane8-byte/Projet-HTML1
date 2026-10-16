 function addStudent(){
    window.location.href="addStudent.html"

}
async function chargerDashboard() {
  try {
    //Les trois cartes de stats
    const repStats = await fetch("https://backend-presence-qp94.onrender.com/stats");
    if (!repStats.ok) throw new Error(`Stats : ${repStats.status}`);
    const stats = await repStats.json();

    document.getElementById('nbrEtu').textContent = stats.nbEtudiants;
    document.getElementById('nbrProf').textContent = stats.nbProfs;
    document.getElementById('nbrClasse').textContent = stats.nbClasses;

    //  Le tableau des étudiants
    const repEtu = await fetch("https://backend-presence-qp94.onrender.com/utilisateurs?role=etudiant");
    if (!repEtu.ok) throw new Error(`Utilisateurs : ${repEtu.status}`);
    const etudiants = await repEtu.json();

    const corps = document.getElementById('corpsTableau');
    corps.innerHTML = etudiants.map(e => `
      <tr>
        <td>${e.nom}</td>
        <td>${e.prenom}</td>
        <td>${e.classe}</td>
        <td class="statut-${e.statut}">${e.statut === 'present' ? 'Présent(e)' : 'Absent(e)'}</td>
        <td>Modifier</td>
      </tr>
    `).join('');

  } catch (error) {
    console.error(error);
  }
}

chargerDashboard();