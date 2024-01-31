var rows = 3;
var columns = 3;

var currTile;
var otherTile; 

var turns = 0;
var minimumMoves = 20;

var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = function() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".png";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);

        }
    }
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (!otherTile.src.includes("3.png")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;
    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;

        if (turns >= minimumMoves) {
            checkPuzzleCompletion();
        }
    }
}

// ... (Your existing code)

// ... (Your existing code)

function checkPuzzleCompletion() {
    let completed = true;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r + "-" + c);
            let order = tile.src.charAt(tile.src.length - 5);

            if (parseInt(order) !== r * columns + c + 1) {
                completed = false;
                break; // Break out of the inner loop if one tile is not in the correct position
            }
        }

        if (!completed) {
            break; // Break out of the outer loop if one tile is not in the correct position
        }
    }

    if (completed && turns <= minimumMoves) {
        document.getElementById("message").innerText = "Congratulations! You cracked the puzzle in " + turns + " moves!";
        
        // Show and enable the download link for the audio file
        let downloadLink = document.getElementById("downloadAudioLink");
        downloadLink.style.display = "block";
        downloadLink.href = document.getElementById("Audio").src;
        
        // Play the audio when the puzzle is completed
        let congratsAudio = document.getElementById("Audio");
    } else {
        document.getElementById("message").innerText = "The puzzle is not completed yet. Keep trying!";
    }
}



