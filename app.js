function startGame() {
    // Récupérer les noms des joueurs
    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;

     // Vérifier si les champs sont remplis
     if (player1Name === "" || player2Name === "") {
        alert("Veuillez entrer les noms des deux joueurs.");
        return;
    }

    // Afficher les noms des joueurs (tu peux personnaliser l'affichage)
    alert("Le jeu commence entre " + player1Name + " et " + player2Name + " !");

    // Masquer les inputs et le bouton, et afficher la grille
    document.getElementById('players').style.display = 'none';
    document.getElementById('gameGrid').style.display = 'grid';
}