/*
TODO:



*/

let gridCells;        // Array for sudoku grid
let solved = false;   // Is the sudoku solved?
let change_r;         // Keeps track of which cell is being changed by user
let change_c;         // Keeps track of which cell is being changed by user
let display = 1;      // Keeps track of what to display (board or input)
let help = -1;        // Keeps track of if the user is in help


/*
 On first run:
 Run a reset, which creates a new grid for us
*/
resetGrid();

/*
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
¤¤¤¤¤¤¤¤¤¤       GRID       ¤¤¤¤¤¤¤¤¤¤¤¤¤¤
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
*/

// Creates a 2D array with new cells
function createGrid() {
  solved = false;
  gridCells = [];
  for (let r = 0; r < 9; r++) {
    gridCells[r] = [];
    for (let c = 0; c < 9; c++) {
      gridCells[r][c] = new Cell(r, c);
    }
  }
}

/*
  Create a new 2D array containing our sudoku grid and update it on screen
*/
function resetGrid() {
  createGrid();
  updateGrid();

  document.getElementById('output').style.color = "black";
  document.getElementById('output').innerHTML = "Enter your numbers";
}



/*
  Updates the view of sudoku
  Cells containing the value 0 are displayed as 0 but with color white
  Cells containing a value other than 0 is displayed with color black
  Cells that are hard (not soft) are given the background color yellow
*/

function updateGrid() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let e_id = r + "" + c;
      let html_elem = document.getElementById(e_id);
      html_elem.innerHTML = gridCells[r][c].value;
      if(gridCells[r][c].value === 0){
        html_elem.style.color = "white";
      } else {
        html_elem.style.color = "black";
      }
      if(!gridCells[r][c].soft){
        html_elem.style.backgroundColor = "#FF0";
      } else {
        html_elem.style.backgroundColor = "#FFF";
      }
    }
  }
}

/*
  Sets which cell in the grid the user wants to update
  and changes the display to number selection
  If sudoku is solved the function should return 0 immediately
*/
function changeVal(r, c) {
  if(solved)
    return 0;
  document.getElementById('numSelect').innerHTML = "Select number for position in <br> row " + (r+1) + " column " + (c+1);
  change_r = r;
  change_c = c;
  changeDisplay();
}

/*
  Adds a value to a certain gridposition and changes the boolean soft to false
  Changes display back to sudoku and updates the grid
*/
function newEntry(v) {

  gridCells[change_r][change_c].value = v;
  if(v != 0){
    gridCells[change_r][change_c].soft = false;
  } else {
    gridCells[change_r][change_c].soft = true;
  }

  change_c = null;
  change_r = null;
  changeDisplay();
  updateGrid();
}



/*
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
¤¤¤¤¤¤¤¤¤¤       SOLVE      ¤¤¤¤¤¤¤¤¤¤¤¤¤¤
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
*/


/*
  Is called when the user wants to solve the sudoku
  The grid is validated (is the user input correct?)
  If the input was correct we start crawl with a delay (needed for text update)
  If sudoku is solved the function should return 0 immediately
*/
function solve() {
  if(solved)
    return 0;

  if(validateGrid()){
    document.getElementById('output').style.color = "black";
    document.getElementById('output').innerHTML = "Solving, please hold...";
    window.setTimeout(crawl, 500); // wait 500 milli sec before crawling
  } else {
    document.getElementById('output').style.color = "red";
    document.getElementById('output').innerHTML = "Grid is not valid, please reset and try again";
  }
}


/*
  Before solve calls crawl, we need to validate that the user input
  was correct and follows the rules of a sudoku
  Loops the entire grid and checks that all of the hard cells are
  correct
*/
function validateGrid() {
  for(let r = 0; r < 9; r++){
    for(let c = 0; c < 9; c++){

      if(!gridCells[r][c].soft){

        if(!gridCells[r][c].validValue()){
          return false;
        }
      }
    }
  }

  return true;
}


/*
  Function for solving the sudoku
  It crawls through the grid and backtracks when a value gets to 10
  Returns 0 when we solve
*/
function crawl(r = 0, c = 0) {

  if(solved){
    return 0;
  }

  // Check if row and column is correct, if row is 9 the sudoku is solved
  if (c === 9) {
    r++;
    c = 0;
    if (r === 9) {
      document.getElementById('output').style.color = "green";
      document.getElementById('output').innerHTML = "Solved!";

      updateGrid();
      solved = true;
      return 0;
    }
  }


  // Checks if the current cell is soft, only soft cells should be changed
  if (gridCells[r][c].soft) {

    let below = true;

    while (below) { // Loop until we reach 10

      gridCells[r][c].findVal(); // Get first valid value of cell

      if (gridCells[r][c].value < 10) { // Is it below 10?

        crawl(r, (c + 1)); // Crawl to next cell

      } else { // If 10 is reached, end the loop and backtrack

        gridCells[r][c].value = 0;
        below = false;

      }
    }
  } else {
    crawl(r, (c + 1)); // Hard cells are skipped
  }
}




/*
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
¤¤¤¤¤¤¤¤¤¤     USER VIEW    ¤¤¤¤¤¤¤¤¤¤¤¤¤¤
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
*/

/*
  Changes the display when user is entering a new value to the grid
*/
function changeDisplay() {
  display *= -1;
  if(display === 1){
    document.getElementById('sudoku').style.display = "flex";
    document.getElementById('numbers').style.display = "none";
  } else {
    document.getElementById('sudoku').style.display = "none";
    document.getElementById('numbers').style.display = "flex";
  }
}

/*
  Changes the display when user is in help
*/
function helpMe() {
  help *= -1;
  if(help === 1){
    document.getElementById('sudoku').style.display = "none";
    document.getElementById('help').style.display = "flex";
  } else {
    document.getElementById('sudoku').style.display = "flex";
    document.getElementById('help').style.display = "none";
  }
}
