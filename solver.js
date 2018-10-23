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

let gridCells = [];

createGrid();

function createGrid() {
  for(let r = 0; r < 9; r++){
    gridCells[r] = [];
    for(let c = 0; c < 9; c++){
      gridCells[r][c] = new Cell(r, c);
    }
  }
}
