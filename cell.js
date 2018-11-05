class Cell {

  constructor(r, c) {
    this.r = r;
    this.c = c;
    this.soft = true;
    this.value = 0;
  }


  findVal() {
    do {
      this.value++;
    } while (!this.validValue());

  }


  validValue() {

    // Testar rad och kolumn
    for (let i = 0; i < 9; i++) {


      if(gridCells[this.r][i].value == this.value && this.c != i){
        return false;
      }

      if(gridCells[i][this.c].value == this.value && this.r != i){
        return false;
      }


    }


    // Testar om värdet finns i rutan
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
