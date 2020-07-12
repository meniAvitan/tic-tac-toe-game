let turn = "x";
let lock = false;
let filledTiles = 0;
let won_x = 0 , lost_x = 0;
let won_o = 0 , lost_o = 0;

const winningCombos = [
    [0, 4, 8],
    [2, 4, 6],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

function init() {
    const grid = document.getElementById("grid");
}

// returns an array of indexes of ocupied tiles that contain the symbol
function getGridArray(symbol) {
    const arr = [];
    const tiles = grid.getElementsByClassName("tile");
    
    for (let i =0; i < tiles.length; i++) {
        if (tiles[i].innerHTML == symbol) {
            arr.push(i);
        }
    }
    
    return arr;
}

// checks if the player won
function hasWon(gridArray) {
    for (let combo of winningCombos) {
        let correct = 0;
        
        for (let i of gridArray) {
            if (combo.includes(i))
                correct++;
        }
        if (correct == 3)
            return true;
    }

    return false;
}

// clears grid
function clearGrid() {
    const tiles = grid.getElementsByClassName("tile");
    for (let i = 0; i < tiles.length; i++)
        tiles[i].innerHTML = "";
}

// restarts game
function restart() {
    clearGrid();
    document.getElementById("winner").innerHTML = "";
    document.getElementById("restart").style.display = "none";
    lock = false;
}

// triggers when it's a draw or someone wins
function finish(text) {
    winner.innerHTML = text;
    document.getElementById("restart").style.display = "block";
    document.getElementById("player-turn").innerHTML = " ";
    lock = !lock;
    filledTiles = 0;
}
function Update_X_score()
{
    document.getElementById("score_x").innerHTML="X score <br/> WON- "+won_x+" : " +lost_x+" -LOST";
}
function Update_O_score()
{
    document.getElementById("score_o").innerHTML="O score <br/> WON- "+won_o+" : " +lost_o+" -LOST";
}

// updates the tiles and checks if either players won
function update(tileIndex) {
    const tile = grid.getElementsByClassName("tile")[tileIndex];
    
    // lock system
    if (!lock) {
        // prevents ocupied tiles from being changed
        if (tile.innerHTML === "") {
            tile.innerHTML = turn.toUpperCase();

            const draw_ = document.getElementById("draw");
            const winner = document.getElementById("winner");
            if (hasWon(getGridArray("X"))) {
                finish("PLAYER -X- WON!");
                won_x++;
                lost_o++;
                Update_X_score();
                Update_O_score();

            }
            else if (hasWon(getGridArray("O"))) {
                finish("PLAYER -O- WON!");
                won_o++;
                lost_x++;
                Update_X_score();
                Update_O_score();
            }
            else if (filledTiles == 9) {
                finish("DRAW!");
            }
            
            filledTiles++;
            
            // switches turns
            turn = turn == "x" ? "o" : "x";
            document.getElementById("player-turn").innerHTML = `Player ${turn.toUpperCase()} turn`;
        }
    }
}