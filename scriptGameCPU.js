let board = Array(9).fill(null); 
let vx = 0; // Victoires pour X
let vo = 0; // Victoires pour O
let eg = 0; // Égalités


document.querySelectorAll('.case').forEach((div, index) => {
    div.addEventListener('click', () => {
        jouer(index);
    });
});


let choixduJoueur = JSON.parse(localStorage.getItem('choix')) || 0; 
let joueurChar = choixduJoueur === 1 ? 'X' : 'O'; 
let cpuChar = choixduJoueur === 1 ? 'O' : 'X'; //  Le contraire du joueur 

function jouer(index) {
    if (board[index] === null) { 
        
        board[index] = joueurChar; 
        document.querySelector(`.case-${index}`).innerHTML = `<img src="images/${joueurChar}.png" alt="">`; 
        
        
        if (checkWinner()) {
            setTimeout(() => {
                vx += joueurChar === 'X' ? 1 : 0; 
                vo += joueurChar === 'O' ? 1 : 0; 
                refreshScore(); 
            }, 100);
            resetGame();
            return; 
        } else if (board.every(cell => cell !== null)) { 
            setTimeout(() => {
                eg++; 
                refreshScore(); 
            }, 100);
            resetGame();
            return; 
        }

        
        cpuJouer();
    }
}

function cpuJouer() {
    const bestMove = minimax(board, cpuChar); 
    board[bestMove.index] = cpuChar; 
    document.querySelector(`.case-${bestMove.index}`).innerHTML = `<img src="images/${cpuChar}.png" alt="">`; 

    
    if (checkWinner()) {
        setTimeout(() => {
            vo++; 
            refreshScore(); 
        }, 100);
        resetGame();
        return; 
    } else if (board.every(cell => cell !== null)) { 
        setTimeout(() => {
            eg++; 
            refreshScore(); 
        }, 100);
        resetGame();
        return; 
    }
}

function minimax(newBoard, player) {
    const winner = checkWinner(); 
    if (winner === 'X') return { score: -10 }; 
    if (winner === 'O') return { score: 10 }; 
    if (newBoard.every(cell => cell !== null)) return { score: 0 }; 

    const moves = [];

    newBoard.forEach((cell, index) => {
        if (cell === null) {
            const simulatedBoard = [...newBoard];
            simulatedBoard[index] = player;
            const result = minimax(simulatedBoard, player === cpuChar ? joueurChar : cpuChar);
            moves.push({ index, score: result.score });
        }
    });

   
    if (player === cpuChar) {
        return moves.reduce((best, move) => move.score > best.score ? move : best, { score: -Infinity });
    } else {
        return moves.reduce((best, move) => move.score < best.score ? move : best, { score: Infinity });
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}


function resetGame() {
    board = Array(9).fill(null); 
    document.querySelectorAll('.case').forEach((div) => {
        div.innerHTML = ''; 
        div.style.pointerEvents = 'auto'; 
    });
    choixduJoueur = JSON.parse(localStorage.getItem('choix')) || 0; 
    joueurChar = choixduJoueur === 1 ? 'X' : 'O'; 
    cpuChar = choixduJoueur === 1 ? 'O' : 'X'; 
}

function refreshScore() {
    document.querySelector(`.resultats`).innerHTML = 
        `<span>Victoires pour X : ${vx}</span> 
         <span>Victoires pour O : ${vo}</span> 
         <span>Égalités : ${eg}</span>`;
}
