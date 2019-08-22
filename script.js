/**
 * Made by: TEAM SUDOKU ZONE
 * SV-College Front-End course
 * Sudoku project script
 */

let board; // The sudoku board to be filled
let level; //indicate the level the user chose
let hints; // number of hints user has left
let startTime; //use for display the timer
let filledMatrix; //the matrix we get from the user
let interval; //set interval of time
let dict = {}; //create dictionary for all users with their passwords
dict["abcd"] = "1234"; //initialize a user in thr dictionary
let name = ""; //name of the user


/** 
 * Check if the user name and password are correct.
 */
function LogincheckUserAndPassword() {
    //get username and password the user entered
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    //initialize all the errors in none
    document.getElementById('nameEmpty').style.display = 'none';
    document.getElementById('passEmpty').style.display = 'none';
    document.getElementById('nameError').style.display = 'none';
    document.getElementById('passError').style.display = 'none';

    if (username == "" || password == "") { //case username or password are empty
        if (username == "") {
            document.getElementById('nameEmpty').style.display = 'inline';
        }
        if (password == "") {
            document.getElementById('passEmpty').style.display = 'inline';
        }
    }
    else {
        if (username in dict) { //case the username is exist in the dictionary
            if (dict[username] == password) {
                name = username;
                alert("You signin succefully!");
                openChooseLevel();
            }
            else { //case password does not match to the username
                document.getElementById('passError').style.display = 'inline';
            }
        }
        else { //case the username isn't exist in the dictionary
            document.getElementById('nameError').style.display = 'inline';
        }
    }
}


/** 
 * Create a new user in the system.
 */
function sendRegistreationForm() {
    //get username and password the user entered
    let username = document.getElementById("usernameR").value;
    let password = document.getElementById("pwd1").value;
    let password2 = document.getElementById("pwd2").value;
    //initialize all the errors with none
    document.getElementById('enterUserNameR').style.display = 'none';
    document.getElementById('enterPassword').style.display = 'none';
    document.getElementById('enterPassword2').style.display = 'none';
    document.getElementById('existUserNameR').style.display = 'none';
    document.getElementById('equalPassword').style.display = 'none';

    //case username or password or confirm password are empty
    if (username == "" || password == "" || password2 == "") { 
        if (username == "") {
            document.getElementById('enterUserNameR').style.display = 'inline';
        }
        if (password == "") {
            document.getElementById('enterPassword').style.display = 'inline';
        }
        if (password2 == "") {
            document.getElementById('enterPassword2').style.display = 'inline';
        }
    }
    else {
        if (username in dict) { //case the username is already exist in the dictionary
            document.getElementById('existUserNameR').style.display = 'inline';
        }
        else {
            if (password != password2) { //case the password and confirm password are not the same
                document.getElementById('equalPassword').style.display = 'inline';
            }
            else { //insert the new user to the dictionary
                dict[username] = password;
                alert("You created a new user successfully!");
                openSignIn();
            }

        }
    }
}


/** 
 * Clear the registration form.
 */
function resetRegistreation() {
    //initialize all the errors in none
    document.getElementById('enterUserNameR').style.display = 'none';
    document.getElementById('enterPassword').style.display = 'none';
    document.getElementById('enterPassword2').style.display = 'none';
    document.getElementById('existUserNameR').style.display = 'none';
    document.getElementById('equalPassword').style.display = 'none';
    //clear fields
    document.getElementById('usernameR').value = "";
    document.getElementById('pwd1').value = "";
    document.getElementById('pwd2').value = "";
    document.getElementById('firstname').value = "";
    document.getElementById('lastname').value = "";
    document.getElementById('female').checked = false;
    document.getElementById('male').checked = false;
    document.getElementById('mail').value = "";
    document.getElementById('dobday').value = "";
    document.getElementById('dobmonth').value = "";
    document.getElementById('dobyear').value = "";
}


/** 
 * Clear the sign-in form.
 */
function resetSignin() {
    //initialize all the errors in none
    document.getElementById('nameEmpty').style.display = 'none';
    document.getElementById('passEmpty').style.display = 'none';
    document.getElementById('nameError').style.display = 'none';
    document.getElementById('passError').style.display = 'none';
     //clear fields
     document.getElementById('username').value = "";
     document.getElementById('password').value = "";
}


/** 
 * Open the 'choose level' page and hide the other pages.
 */
function openChooseLevel() {
    document.getElementById('chooseLevel').style.display = 'inline-block';
    document.getElementById('chooseLevel').style.visibility = 'visible';
    document.getElementById('signIn').style.display = 'none';
    document.getElementById('signIn').style.visibility = 'hidden';
    document.getElementById('Game').style.display = 'none';
    document.getElementById('Game').style.visibility = 'hidden';
    document.getElementById('nameOfUser').innerHTML = "Welcome " + name + "!";
}


/** 
 * Open the sign-in page and hide the other pages.
 */
function openSignIn() {
    document.getElementById('signIn').style.display = 'inline-block';
    document.getElementById('signIn').style.visibility = 'visible';
    document.getElementById('MainWindow').style.display = 'none';
    document.getElementById('MainWindow').style.visibility = 'hidden';
    document.getElementById('registreation').style.display = 'none';
    document.getElementById('registreation').style.visibility = 'hidden';
    resetSignin();
}


/** 
 * Open the registration page and hidden the other pages.
 */
function openRegistreation() {
    document.getElementById('registreation').style.display = 'inline-block';
    document.getElementById('registreation').style.visibility = 'visible';
    document.getElementById('signIn').style.display = 'none';
    document.getElementById('signIn').style.visibility = 'hidden';
    resetRegistreation();
}


/** 
 * Open the game page and hide the other pages.
 */
function openGame() {
    document.getElementById('Game').style.display = 'inline-block';
    document.getElementById('Game').style.visibility = 'visible';
    document.getElementById('chooseLevel').style.display = 'none';
    document.getElementById('chooseLevel').style.visibility = 'hidden';
    document.getElementById('MainWindow').style.display = 'none';
    document.getElementById('MainWindow').style.visibility = 'hidden';
    document.getElementById('registreation').style.display = 'none';
    document.getElementById('registreation').style.visibility = 'hidden';
    document.getElementById('signIn').style.display = 'none';
    document.getElementById('signIn').style.visibility = 'hidden';
    if (name == "") {
        document.getElementById('userDisplay').innerHTML = "Player: Guest";
        document.getElementById('changeLevelLink').style.visibility = 'hidden';
    }
    else {
        document.getElementById('userDisplay').innerHTML = "Player: " + name;
        document.getElementById('changeLevelLink').style.visibility = 'visible';
    }
    createNewBoard();
}


/** 
 * Open the home page and hidden the other pages.
 */
function backToMain() {
    name="";
    clearInterval(interval);
    document.getElementById('MainWindow').style.display = 'inline-block';
    document.getElementById('MainWindow').style.visibility = 'visible';
    document.getElementById('chooseLevel').style.display = 'none';
    document.getElementById('chooseLevel').style.visibility = 'hidden';
    document.getElementById('signIn').style.display = 'none';
    document.getElementById('signIn').style.visibility = 'hidden';
    document.getElementById('registreation').style.display = 'none';
    document.getElementById('registreation').style.visibility = 'hidden';
    document.getElementById('Game').style.display = 'none';
    document.getElementById('Game').style.visibility = 'hidden';
}


/** 
 * Calculate the time of the game.
 */
function showTime() {
    let d = new Date();
    let time = Math.floor((d - startTime) / 1000);
    document.getElementById("lblTime").value = time;
}


/** 
 * Update the level to easy.
 */
function updateEasy() {
    level = 1;
    document.getElementById('userLevel').innerHTML = "Level: Easy";
    openGame();
}

/** 
 * Update the level to medium.
 */
function updateMedium() {
    level = 2;
    document.getElementById('userLevel').innerHTML = "Level: Medium";
    openGame();
}

/** 
 * Update the level to hard.
 */
function updateHard() {
    level = 3;
    document.getElementById('userLevel').innerHTML = "Level: Hard";
    openGame();
}

/** 
 * Update the level to Empty (empty board).
 */
function updateEmpty() {
    level = 0;
    document.getElementById('userLevel').innerHTML = "Level: Empty";
    openGame();
}


/** 
 * Insert the data of the matrix to the cells.
 */
function drawSudoku() {
    document.getElementById('checkButton').disabled = false;
    document.getElementById('hintButton').disabled = false;
    document.getElementById('finishButton').disabled = false;
    document.getElementById('solveButton').disabled = false;
    let message = document.getElementById("message");
    message.innerHTML = "Good Luck!";
    message.style.color = "black";
    hints = (6-level);
    if (level == 0) {
        hints = 0;
    }
    document.getElementById('hintsLeft').innerHTML = `Hints left: ${hints}`;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cell = document.getElementById("r" + i + "c" + j);
            cell.style.textShadow = 'none';
            cell.style.boxShadow = 'none';
            if (board[i][j] == 0) {
                cell.className = "emptyCell";
                cell.value = "";
                cell.disabled = false;
            }
            else {
                cell.className = "numCell";
                cell.value = board[i][j];
                cell.disabled = true;
            }
        }
    }

}


/** 
 * Clear red highlighted cells and verify legal input.
 */
function clearRedNessBoard() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let numId = (`r${i}c${j}`);
            let cell = document.getElementById(numId).value;
            board[i][j] = 0;
            if (isNaN(cell)) { //is it is not a number- delete content
                document.getElementById(numId).value = "";
            } else if ((cell >= 1) && (cell <= 9)) {
                board[i][j] = document.getElementById(numId).value;
            }
            document.getElementById(numId).style.boxShadow = 'none';
        }
    }
}



/** 
 * Generates a legal 9x9 sudoku board.
 */
function createBoard() {

    board = [ // Initialize the board
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    // If user chose an empty board, do not fill
    if (level == 0) {
        return;
    }

    board = solveBoard(true); // Legally fill the board

    coverUp(); // Cover a part of the board according to level
} 


/** 
 * Check if it's legal to add the number 'num' in column 'col' 
 * @param {Number} num - The number to check
 * @param {Number} col - The column to check in
 * @param {String} numId - ID of the element num is in
 */
function isLegalForCol(num, col, numId) {
    
    // Traverse the column to check if 'num' is already in it
    for (i = 0; i < board.length; i++) {
        let curr;
        let cell = document.getElementById((`r${i}c${col}`));
        curr = cell.value;

        if (curr == '') { // Ignore unfilled empty cells
            continue;
        }
        if ((curr == num) && (cell.id != numId)) {
            return false;
        }
    }
    return true;
}


/** 
 * Check if it's legal to add the number 'num' in row 'row'.
 * @param {Number} num - The number to check
 * @param {Number} row - The row to check in
 * @param {String} numId - ID of the element num is in
 */
function isLegalForRow(num, row, numId) {
    
    // Traverse the row to check if 'num' is already in it
    for (i = 0; i < board.length; i++) {
        let curr;
        let cell = document.getElementById((`r${row}c${i}`));
        curr = cell.value;

        if (curr == '') { // Ignore unfilled empty cells
            continue;
        }  
        if ((curr == num) && (cell.id != numId)) {
            return false;
        }
    }
    return true;
}


/** 
 * Check if 'num' is legal to enter in the 3x3 square that contains [row][col]
 * @param {Number} num - The number to check
 * @param {Number} row - The row the square is in
 * @param {Number} col - The column the square is in
 * @param {String} numId - ID of the element num is in
 */
function isLegalForSquare(num, row, col, numId) {

    // Set indexes for the beginnings of the square
    let sqRow = row - (row % 3);
    let sqCol = col - (col % 3);

    // Traverse the square to check if 'num' is already in it
    for (i = sqRow; i < (sqRow + 3); i++) {
        for (j = sqCol; j < (sqCol + 3); j++) {
            let curr;
            let cell = document.getElementById((`r${i}c${j}`));
            curr = cell.value;

            if (curr == '') { // Ignore unfilled empty cells
                continue;
            }
            if ((curr == num) && (cell.id != numId)) {
                return false;
            }

        }
    }
    return true;
}


/**
 * Covers some of the numbers in the board, according to level
 * Level 1 - Easy:   20 numbers covered
 * Level 2 - Medium: 40 numbers covered
 * Level 3 - Hard:   60 numbers covered
 */
function coverUp() {
    let toCover = 20 * level; // The amount of numbers to be covered

    for (i = 0; i < toCover; i++) {
        let row, col;

        // Find a random cell on the board that isn't covered yet
        do {
            let num = Math.floor(Math.random() * 81); // Roll between 0-80
            row = Math.floor(num / 9); // Get the row of rolled number
            col = num % 9; // Get the column of rolled number
        } while (board[row][col] == 0); // Got a cell that's already hidden, try again
        board[row][col] = 0;
    }
}


/**
 * Highlight in red every illegal column/row/square
 */
function checkBoard() {

    for (let iRow = 0; iRow < board.length; iRow++) {
        for (let iCol = 0; iCol < board.length; iCol++) {

            let cellId = (`r${iRow}c${iCol}`);
            let cell = document.getElementById(cellId);
            let num = cell.value;

            if ((num == '') || (num == undefined)) {
                continue;
            }

            // If the number is in an illegal row/column/square, highlight in red accordingly
            let highlight = '0px 0px 7px 5px red inset';
            if (!isLegalForCol(num, iCol, cellId)) {
                for (let i = 0; i < board.length; i++) {
                    let numId = (`r${i}c${iCol}`);
                    document.getElementById(numId).style.boxShadow = highlight;
                }
            }
            if (!isLegalForRow(num, iRow, cellId)) {
                for (let i = 0; i < board.length; i++) {
                    let numId = (`r${iRow}c${i}`);
                    document.getElementById(numId).style.boxShadow = highlight;
                }
            }
            if (!isLegalForSquare(num, iRow, iCol, cellId)) {
                let sqRow = iRow - (iRow % 3);
                let sqCol = iCol - (iCol % 3);

                for (let i = sqRow; i < (sqRow + 3); i++) {
                    for (let j = sqCol; j < (sqCol + 3); j++) {
                        let numId = (`r${i}c${j}`);
                        document.getElementById(numId).style.boxShadow = highlight;
                    }
                }
            }

        }
    }
}


/**
 * Completely solves a sudoku board
 * Accounting for user inputs if possible
 * 
 * @param {Boolean} hidden - Determines if the function reveals the solution
 */
function solveBoard(hidden) {

    // Make a deep copy of the matrix
    let boardClone = [];
    for (let i = 0; i < board.length; i++) {
        boardClone[i] = [...board[i]];
    }
    
    // Find and remove all user mistakes
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            let cell = document.getElementById(`r${i}c${j}`);
            if ((cell.className == "emptyCell") && (cell.value != '') &&
                (!isLegalInBoard(boardClone, cell.value, i, j))) {
                boardClone[i][j] = 0;
                if (!hidden) {
                    cell.value = '';
                }
            }
        }
    }
    
    getSolvedBoard(boardClone); // Get a solution for the board

    // The solver may fail due to user inputs creating a dead-end board,
    let failed;
    for (let y = 0; y < board.length; y++) {
        failed = boardClone[y].includes(0);
        if (failed) {
            break;
        }
    } // If such failure happens, remove all user inputs and solve properly
    if (failed) {
        for (let row1 = 0; row1 < board.length; row1++) {
            for (let col1 = 0; col1 < board.length; col1++) {
                let cell1 = document.getElementById(`r${row1}c${col1}`);
                if (cell1.className == "emptyCell") {
                    if (!hidden) {
                        cell1.value = '';
                    }
                    boardClone[row1][col1] = 0;
                }
            }
        }
        getSolvedBoard(boardClone);
    }

    // If this is a call for new board or hint, end here and return legal board
    if (hidden) {
        return boardClone;
    } // Otherwise, present solution to the user
    for (let row = 0; row < board.length; row++) {
        board[row] = [...boardClone[row]];
        for (let col = 0; col < board.length; col++) {
            let cell = document.getElementById(`r${row}c${col}`);
            cell.style.boxShadow = 'none';
            if (cell.className == "emptyCell") {
                if (cell.value == '') {
                    cell.value = boardClone[row][col];
                } else if (cell.style.textShadow == 'none') {
                    //cell.style.textShadow = '0px 0px 6px green';
                }
            }
        }
    }
}


/**
 * Helper function for solveBoard()
 * Finds a legal solution for a sudoku board, if there is one
 * Recursively checks all options until a right one is found
 * 
 * @param {Array} tempBoard - A clone of the game board
 */
function getSolvedBoard(tempBoard) {
   
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            let curr = tempBoard[row][col];

            // Reached an empty cell, set a legal value and check rest of the board
            if (curr == 0) { 
                let optionsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                while (optionsArr.length > 0) {
                    // Draw a random number between 1-9
                    let num = optionsArr.splice(Math.floor(Math.random() * optionsArr.length), 1)[0];

                    // If number is legal in cell, try to fill the rest of the board
                    if (isLegalInBoard(tempBoard, num, row, col)) {
                        tempBoard[row][col] = num;
                        if (getSolvedBoard(tempBoard)) {
                            return true; // Board successfully filled!
                        } else {
                        // Failed to fill board with current number in cell, set to 0 and try a different one
                            tempBoard[row][col] = 0; 
                        }
                    }
                }
                return false; // Dead end reached, backtrack and try a different solution
            }
        }
    } 
    return true; // Board successfully filled :D
}


/**
 * Check if 'num' is legal to enter in the 3x3 square that contains [numRow][numCol]
 * @param {Array} tempBoard - A clone of the game board
 * @param {Number} num      - The number to check
 * @param {Number} numRow   - The row the number is in
 * @param {Number} numCol   - The column the number is in
 */
function isLegalInBoard(tempBoard , num, numRow, numCol) {

    // One loop to check them all  ヾ(⌐■_■)ノ♪
    for (let i = 0; i < tempBoard.length; i++) {
        if ((num == tempBoard[numRow][i]) && (numCol != i) ) {
            return false;
        }

        if ((num == tempBoard[i][numCol]) && (numRow != i) ) {
            return false;
        }

        let sqRow = numRow - (numRow % 3) + Math.floor(i / 3);
        let sqCol = numCol - (numCol % 3) + (i % 3);
        if ((num == tempBoard[sqRow][sqCol]) && ((sqRow != numRow) && (sqCol != numCol))) {
            return false;
        }
    }
    return true;
}


/** 
 * Expose a random cell's legal number
 * 
 * Solves the entire board every single time, 
 * because it is the only way to get values that can 100% lead to a solved board
 */
function revealNum() {

    if (hints <= 0) { // Make sure the user has hints left to use
        return;
    }

    let boardClone = solveBoard(true); // Create a solved clone of the board

    // Create an array containing all unsolved cells
    let blanksArr = [];
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            let cellId = `r${row}c${col}`;
            let cell = document.getElementById(cellId);
            if (cell.value == '') {
                blanksArr.push(cellId);
            }
        }
    }
    if (blanksArr.length == 0) {
        return;
    }

    // Pull an unsolved cell at random and fill it with a good value
    let chosenCellId = blanksArr[Math.floor(Math.random() * blanksArr.length)];
    let chosenRow = parseInt(chosenCellId.charAt(1));
    let chosenCol = parseInt(chosenCellId.charAt(3));
    board[chosenRow][chosenCol] = boardClone[chosenRow][chosenCol];
    let chosenCell = document.getElementById(chosenCellId);
    chosenCell.value = boardClone[chosenRow][chosenCol];
    //chosenCell.style.textShadow = '0px 0px 6px #2e5cb8';
    hints--; // Update the number of hints the user has left
    document.getElementById('hintsLeft').innerHTML = `Hints left: ${hints}`;
    
}


/**
 * Get the board to its initial form.
 */
function clearBoard() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            let cell = document.getElementById(`r${row}c${col}`);
            if (cell.className == "emptyCell") {
                cell.value = '';
            }
        }
    }
    clearRedNessBoard();
    drawSudoku();
    clearInterval(interval);
    startTime = new Date();
    interval = setInterval(showTime, 1000);
}


/**
 * Draw a new board.
 */
function createNewBoard() {
    if(board){
        clearRedNessBoard();
    }
    createBoard();
    drawSudoku();
    clearInterval(interval);
    startTime = new Date();
    interval = setInterval(showTime, 1000);
}


/**
 * Check if the sudoku is correct and display a message.
 */
function finishSoduko() {
    if (checkIfCorrect()) {
        alert("You did it! Good Job!");
        clearInterval(interval);
        unableBoard();
        let message = document.getElementById("message");
        message.innerHTML = "done!";
        message.style.color = "green";
    }
    else {
        alert("Your solution is not correct. Keep trying.");
        let message = document.getElementById("message");
        message.innerHTML = "try again!";
        message.style.color = "red";
    }
}

/**
 * When finish sudoku, make buttons unable.
 */
function unableBoard(){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cell = document.getElementById(`r${i}c${j}`);
            if (cell.className == "emptyCell") {
                cell.disabled = true;
            }
        }
    }
    document.getElementById('checkButton').disabled = true;
    document.getElementById('hintButton').disabled = true;
    document.getElementById('finishButton').disabled = true;
    document.getElementById('solveButton').disabled = true;
}

/**
 * Check if the sudoku is correct.
 */
function checkIfCorrect() {
    filledMatrix = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            filledMatrix[i][j] = document.getElementById("r" + i + "c" + j).value;
            if (filledMatrix[i][j] == "") {
                return false;
            }
        }
    }
    return checkFullRow() && checkFullCol() && checkFullSquare();
}

//check a row there all numbers correctly
function checkFullRow() {
    let counterArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let row = 0; row < filledMatrix.length; row++) {
        for (let col = 0; col < filledMatrix[row].length; col++) {
            counterArr[filledMatrix[row][col] - 1]++; //indicate there is a specific num in the row
        }
        for (let i = 0; i < counterArr.length; i++) {
            if (counterArr[i] != 1) {
                return false;  //check there no duplicates
            }
        }
        counterArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    return true;
}

//check a column there all numbers correctly
function checkFullCol() {
    let counterArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let col = 0; col < filledMatrix.length; col++) {
        for (let row = 0; row < filledMatrix[col].length; row++) {
            counterArr[filledMatrix[row][col] - 1]++; //indicate there is a specific num in the col
        }
        for (let i = 0; i < counterArr.length; i++) {
            if (counterArr[i] != 1) { //check there no duplicates
                return false;
            }
        }
        counterArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    return true;
}

// check a square there all numbers correctly
function checkFullSquare() {
    let counterArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < filledMatrix.length; i += 3) {
        for (let j = 0; j < filledMatrix[i].length; j += 3) {
            for (let sqRow = i; sqRow <= i + 2; sqRow++) {
                for (let sqCol = j; sqCol <= j + 2; sqCol++) {
                    counterArr[filledMatrix[sqRow][sqCol] - 1]++; //indicate there is a specific num in the square
                }
            }
            for (let i = 0; i < counterArr.length; i++) {
                if (counterArr[i] != 1) {
                    return false;  //check there no duplicates
                }
            }
            counterArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
    }
    return true;
}

/* Did you know?
   There are 6,670,903,752,021,072,936,960 different combinations for a sudoku board :D */