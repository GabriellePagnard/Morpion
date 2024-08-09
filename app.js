let currentPlayer = 'X';
let player1Name = '';
let player2Name = '';

function startGame() {
    player1Name = document.getElementById('player1').value;
    player2Name = document.getElementById('player2').value;

    if (player1Name === "" || player2Name === "") {
        alert("Veuillez entrer les noms des deux joueurs.");
        return;
    }

    alert("Le jeu commence entre " + player1Name + " et " + player2Name + " !");

    document.getElementById('players').style.display = 'none';
    document.getElementById('gameGrid').style.display = 'grid';

    updateCurrentPlayerDisplay();

    const cases = document.querySelectorAll('.case');
    cases.forEach(cell => {
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}

function updateCurrentPlayerDisplay() {
    const currentPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
    document.getElementById('currentPlayerDisplay').textContent = "C'est au tour de " + currentPlayerName + " de jouer";
}

function handleCellClick(event) {
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        const winnerName = currentPlayer === 'X' ? player1Name : player2Name;
        highlightWinningCells();
        setTimeout(() => {
            alert(winnerName + " a gagné !");
            showReplayButton();
        }, 100);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateCurrentPlayerDisplay();
}

function checkWin() {
    const cases = document.querySelectorAll('.case');
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cases[a].textContent && cases[a].textContent === cases[b].textContent && cases[a].textContent === cases[c].textContent) {
            return combination; // Retourne la combinaison gagnante
        }
    }
    return null;
}

function highlightWinningCells() {
    const winningCombination = checkWin();
    if (winningCombination) {
        winningCombination.forEach(index => {
            document.querySelectorAll('.case')[index].style.backgroundColor = 'lightgreen'; // Change la couleur des cases gagnantes
        });
    }
}

function showReplayButton() {
    const playerDisplay = document.getElementById('currentPlayerDisplay');
    playerDisplay.innerHTML = ''; // Vide le contenu actuel

    // Crée un bouton "Rejouer"
    const replayButton = document.createElement('button');
    replayButton.textContent = 'Rejouer';
    replayButton.onclick = resetGame; // Associe la fonction de réinitialisation au bouton

    playerDisplay.appendChild(replayButton); // Ajoute le bouton au DOM
}

function resetGame() {
    // Réinitialise la grille
    document.querySelectorAll('.case').forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#f0f0f0';
    });

    // Réinitialise les noms des joueurs et réaffiche les inputs
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
    document.getElementById('players').style.display = 'block';

    // Cache la grille et le bouton "Rejouer"
    document.getElementById('gameGrid').style.display = 'none';
    document.getElementById('currentPlayerDisplay').innerHTML = '';

    // Réinitialise le joueur actuel
    currentPlayer = 'X';
}
