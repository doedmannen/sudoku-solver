class Cell {

  constructor(r, c) {
    this.r = r;
    this.c = c;
    this.soft = true;
    this.value = 0;
  }

  findVal(){
    if(!this.soft)
      return true;

      // Testar rad och kolumn
      for(let i = 0; i < 9; i++){
        if(gridCells[this.r][i].value == v || gridCells[i][this.c].value == v){
          return false;
        }
      }

      // Testar om värdet finns i rutan
      let r = int(this.r/3)*3;
      let c = int(this.c/3)*3;

      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          if(gridCells[(r+i)][(c+j)].value == v){
            return false;
          }
        }
      }

      this.value = v;
      return true;


  }
}
