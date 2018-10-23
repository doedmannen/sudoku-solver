/*
9 8 7 6 5 4 3 2 1
9 8 7 6 5 4 3 2 1
9 8 7 6 5 4 3 2 1
9 8 7 6 5 4 3 2 1
9 8 7 6 5 4 3 2 1
9 8 7 6 5 4 3 2 1
9 8 7 6 5 4 3 2 1
9 8 7 6 5 4 3 2 1
9 8 7 6 5 4 3 2 1

*/
// Grid for the sudoku
let gridCells = [];

createGrid();

newEntry(2, 3, 9);


// Creates a 2D array with new cells
function createGrid() {
  for(let r = 0; r < 9; r++){
    gridCells[r] = [];
    for(let c = 0; c < 9; c++){
      gridCells[r][c] = new Cell(r, c);
    }
  }
}


// Adds a value to a certain gridposition and changes the boolean soft to false
function newEntry(r, c, v) {
  if(v < 10 && v > 0 && r > 0 && r < 10 && c > 0 && c < 10){
    r--;
    c--;
    gridCells[r][c].value = v;
    gridCells[r][c].soft = false;
  }
}
