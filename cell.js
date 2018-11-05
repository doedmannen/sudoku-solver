class Cell {

  constructor(r, c) {
    this.r = r;
    this.c = c;
    this.soft = true;
    this.value = 0;
  }


  findVal() {

    do {
      console.log("looking");
      this.value++;
    } while (!this.validValue());

  }


  validValue() {

    console.log("validate");

    // Testar rad och kolumn
    for (let i = 0; i < 9; i++) {

      console.log("checking lines");

      if(gridCells[this.r][i].value == this.value && this.r != i)
        return false;

      if(gridCells[i][this.c].value == this.value && this.c != i)
        return false;


      // if (i < this.r && gridCells[i][this.c].value == this.value)
      //   return false;
      //
      // if (i < this.c && gridCells[this.r][i].value == this.value)
      //   return false;
      //
      // if (!gridCells[i][this.c].soft && gridCells[i][this.c].value == this.value)
      //   return false;
      //
      // if (!gridCells[this.r][i].soft && gridCells[this.r][i].value == this.value)
      //   return false;
    }


    // Testar om värdet finns i rutan
    let r = parseInt(this.r / 3) * 3;
    let c = parseInt(this.c / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {

        console.log("checking squares");

        if(gridCells[(r+i)][c+j].value == this.value && gridCells[(r+i)][c+j] != this)
          return false;

        //
        // if ((r + i) < this.r || ((r + i) == this.r && (c + j) < this.c) && gridCells[(r + i)][(c + j)].value == this.value)
        //   return false;
        //
        // if (!gridCells[(r + i)][(c + j)].soft && gridCells[(r + i)][(c + j)].value == v && !((r + i) == this.r && (c + j) == this.c))
        //   return false;

      }
    }

  return true;
  }
}
