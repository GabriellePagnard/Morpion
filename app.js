let currentPlayer = 'X'; // Initialisation du joueur qui commence

function startGame() {
    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;

    if (player1Name === "" || player2Name === "") {
        alert("Veuillez entrer les noms des deux joueurs.");
        return;
    }

    alert("Le jeu commence entre " + player1Name + " et " + player2Name + " !");

    document.getElementById('players').style.display = 'none';
    document.getElementById('gameGrid').style.display = 'grid';

    const cases = document.querySelectorAll('.case');
    cases.forEach(cell => {
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}

function handleCellClick(event) {
    // Afficher le symbole du joueur actuel dans la case cliquée
    event.target.textContent = currentPlayer;

    // Alterner le joueur pour le prochain clic
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}
