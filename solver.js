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
printGrid();

// Creates a 2D array with new cells
function createGrid() {
  for (let r = 0; r < 9; r++) {
    gridCells[r] = [];
    for (let c = 0; c < 9; c++) {
      gridCells[r][c] = new Cell(r, c);
    }
  }
}

function resetGrid() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      gridCells[r][c].value = 0;
      gridCells[r][c].soft = true;
    }
  }
  printGrid();
}

function printGrid() {
  let output = "";
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      output += "" + gridCells[r][c].value;
      if (c < 8) {
        output += " - ";
      }
    }
    output += "<br>"
  }
  document.getElementById('output').innerHTML = output;
}


// Adds a value to a certain gridposition and changes the boolean soft to false
function newEntry() {
  let r = document.getElementById("row").value;
  let c = document.getElementById("col").value;
  let v = document.getElementById("val").value;

  document.getElementById("row").value = "";
  document.getElementById("col").value = "";
  document.getElementById("val").value = "";

  if (v < 10 && v > 0 && r > 0 && r < 10 && c > 0 && c < 10) {
    r--;
    c--;
    gridCells[r][c].value = v;
    gridCells[r][c].soft = false;
  }
  printGrid();
}

function solveSudoku() {
  // Kryp framåt i grid och testa värden
  crawl(0, 0);
}

function crawl(r, c) {
  /*
  öka r enligt c
  Om r == 9
  retun true;
  */
  if (c == 9) {
    r++;
    c = 0;
    if (r == 9) {
      return true;
    }
  }

  /*
  Hitta första giltiga värde för nuvarande ruta
  Gå till nästa crawl(r, c+1)
  så länge crawl == false
  */


  /*
  Om värde == 10
  this.val = 0;
  return false
  */






}
