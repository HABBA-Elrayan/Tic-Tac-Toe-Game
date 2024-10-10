let i = 0; 
let board = Array(9).fill(null); 
let vx = 0; 
let vo = 0; 
let eg = 0; 


document.querySelectorAll('.case').forEach((div, index) => {
    div.addEventListener('click', () => {
        jouer(index);
    });
});

let choixduJoueur = JSON.parse(localStorage.getItem('choix')) || 0; 

function jouer(index) {
    if (board[index] === null) { 
        
        board[index] = choixduJoueur === 1 ? 'X' : 'O'; 
        
        document.querySelector(`.case-${index}`).innerHTML = choixduJoueur === 1
            ? `<img src="images/X.png" alt="">` 
            : `<img src="images/O.png" alt="">`; 
        
       
        if (checkWinner()) {
            setTimeout(() => {
                if (choixduJoueur === 1) {
                    vx++; 
                } else {
                    vo++; 
                }
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

      
        choixduJoueur = 1 - choixduJoueur; 
        localStorage.setItem('choix', JSON.stringify(choixduJoueur)); 
    }
    
    document.querySelector(`.case-${index}`).style.pointerEvents = 'none';
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
}

function refreshScore() {
    document.querySelector(`.resultats`).innerHTML = 
        `<span>Victoires pour X : ${vx}</span> 
         <span>Victoires pour O : ${vo}</span> 
         <span>Égalités : ${eg}</span>`;
}
