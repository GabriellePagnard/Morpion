// Variables globales pour le jeu
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

    // Définir aléatoirement qui commence
    currentPlayer = Math.random() > 0.5 ? 'X' : 'O';

    alert("Le jeu commence entre " + player1Name + " et " + player2Name + " !");

    document.getElementById('popup').style.display = 'none';
    document.getElementById('gameGrid').classList.remove('blur');

    updateCurrentPlayerDisplay();

    const cases = document.querySelectorAll('.case');
    cases.forEach(cell => {
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}

function updateCurrentPlayerDisplay() {
    const currentPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
    document.getElementById('currentPlayerDisplay').innerHTML = `C'est au tour de <br>${currentPlayerName} de jouer`;
}

function handleCellClick(event) {
    if (currentPlayer === 'X') {
        event.target.classList.add('emoji-x');
    } else {
        event.target.classList.add('emoji-o');
    }

    const winningCombination = checkWin();
    if (winningCombination) {
        const winnerName = currentPlayer === 'X' ? player1Name : player2Name;
        highlightWinningCells(winningCombination);
        setTimeout(() => {
            alert(winnerName + " a gagné !");
            showReplayPopup();
        }, 100);
        return;
    }

    if (isGridFull()) {
        setTimeout(() => {
            alert("C'est un match nul !");
            showReplayPopup();
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
        if (cases[a].classList.contains('emoji-x') && cases[b].classList.contains('emoji-x') && cases[c].classList.contains('emoji-x') ||
            cases[a].classList.contains('emoji-o') && cases[b].classList.contains('emoji-o') && cases[c].classList.contains('emoji-o')) {
            return combination; // Retourne la combinaison gagnante
        }
    }
    return null;
}

function highlightWinningCells(winningCombination) {
    winningCombination.forEach(index => {
        document.querySelectorAll('.case')[index].style.backgroundColor = 'lightgreen'; // Change la couleur des cases gagnantes
    });
}

function isGridFull() {
    const cases = document.querySelectorAll('.case');
    return Array.from(cases).every(cell => cell.classList.contains('emoji-x') || cell.classList.contains('emoji-o'));
}

function showReplayPopup() {
    document.getElementById('replayPopup').style.display = 'block';
    document.getElementById('gameGrid').classList.add('blur');
}

function resetGame() {
    // Réinitialise la grille
    document.querySelectorAll('.case').forEach(cell => {
        cell.classList.remove('emoji-x', 'emoji-o');
        cell.style.backgroundColor = 'transparent'; // Assure que le fond reste transparent
    });

    // Cache le texte du joueur actuel
    document.getElementById('currentPlayerDisplay').textContent = '';

    // Réaffiche la pop-up pour les noms et réinitialise les champs de texte
    document.getElementById('popup').style.display = 'block';
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';

    // Réinitialise la grille
    document.getElementById('gameGrid').classList.add('blur');
    document.getElementById('replayPopup').style.display = 'none';

    // Réinitialise le joueur actuel
    currentPlayer = 'X';
}
