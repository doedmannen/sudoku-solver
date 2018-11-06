class Cell {

/*
  Each cell contains values for it's position in the grid
  A boolean to check if the value is from user input (hard)
  or to be changed (soft)
  And the value of the cell
*/

  constructor(r, c) {
    this.r = r;
    this.c = c;
    this.soft = true;
    this.value = 0;
  }


  /*
    Finds the first possible value for this cell
    Loop increases the cells value until it is validates as unique
  */
  findVal() {
    do {
      this.value++;
    } while (!this.validValue());

  }


  /*
    Validates the cells value.
    Checks if the same value already exists in the same row or column
    or if it exists in the same 9x9 square.
    If none of the tests returns false, it is a valid number and
    the function returns true at the end.
  */
  validValue() {

    /*
      Test for checking if the value exists in the same row or column
    */
    for (let i = 0; i < 9; i++) {

      if(gridCells[this.r][i].value == this.value && this.c != i){
        return false;
      }

      if(gridCells[i][this.c].value == this.value && this.r != i){
        return false;
      }

    }



    /*
      Test for checking if the value exists in the same 9x9 square
    */

    let r = parseInt(this.r / 3) * 3;
    let c = parseInt(this.c / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {

        if(gridCells[(r+i)][c+j].value == this.value && gridCells[(r+i)][c+j] != this){
          return false;
        }
      }
    }
  return true;
  }


}
