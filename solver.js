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
// Grid for the sudo

let gridCells = [];
let solved = false;

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
  solved = false;
  printGrid();
}


function fillGrid() {

  newEntry(1, 1, 5);
  newEntry(1, 2, 3);
  newEntry(1, 5, 7);

  newEntry(2, 1, 6);
  newEntry(2, 4, 1);
  newEntry(2, 5, 9);
  newEntry(2, 6, 5);

  newEntry(3, 2, 9);
  newEntry(3, 3, 8);
  newEntry(3, 8, 6);

  newEntry(4, 1, 8);
  newEntry(4, 5, 6);
  newEntry(4, 9, 3);

  newEntry(5, 1, 4);
  newEntry(5, 4, 8);
  newEntry(5, 6, 3);
  newEntry(5, 9, 1);

  newEntry(6, 1, 7);
  newEntry(6, 5, 2);
  newEntry(6, 9, 6);

  newEntry(7, 2, 6);
  newEntry(7, 7, 2);
  newEntry(7, 8, 8);

  newEntry(8, 4, 4);
  newEntry(8, 5, 1);
  newEntry(8, 6, 9);
  newEntry(8, 9, 5);

  newEntry(9, 5, 8);
  newEntry(9, 8, 7);
  newEntry(9, 9, 9);

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
function newEntry(r = document.getElementById("row").value, c = document.getElementById("col").value, v = document.getElementById("val").value) {


  if (v < 10 && v > 0 && r > 0 && r < 10 && c > 0 && c < 10) {
    r--;
    c--;
    gridCells[r][c].value = v;
    gridCells[r][c].soft = false;
  }

  document.getElementById("row").value = "";
  document.getElementById("col").value = "";
  document.getElementById("val").value = "";

  printGrid();
}




function crawl(r, c) {

  // console.log("crawling into " + r + " " + c);

  if(c === 9){
    r++;
    c = 0;
    if(r === 9){
      console.log("Solved");
      printGrid();
      solved = true;
      return 0;
    }
  }

  if(gridCells[r][c].soft){

    let below = true;

    while (below) {

      gridCells[r][c].findVal();

      if (gridCells[r][c].value < 10) {

        crawl(r, (c+1));

      } else {

        gridCells[r][c].value = 0;
        below = false;

      }
    }
  } else {
    crawl(r, (c+1));
  }
}
