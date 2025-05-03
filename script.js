const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restarBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

// Initialize the game
initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); // Add click event to each cell
    restarBtn.addEventListener("click", restartGame); // Add click event to restart button
    statusText.textContent = `Turno de ${currentPlayer}`; // Set initial status text
    running = true; // Set game state to running
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running) { // Cell already clicked or game not running
        return;
    }

    updateCell(this, cellIndex) // Update the clicked cell
    checkWinner(); // Check for a winner
}

function updateCell(cell, index){
    options[index] = currentPlayer; // Update the options array with the current player's symbol
    cell.textContent = currentPlayer; // Update the cell's text content

}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X"; // Switch players
    statusText.textContent = `Turno de ${currentPlayer}`; // Update status text
}

function checkWinner(){
    let roundWon = false; // Initialize roundWon to false
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} Gana!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Empata!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X"; // Reset current player to X
    options = ["", "", "", "", "", "", "", "", ""]; // Reset options array
    statusText.textContent = `Turno de ${currentPlayer}`; // Update status text
    cells.forEach(cell => cell.textContent = ""); // Clear all cells
    running = true; // Set game state to running
}