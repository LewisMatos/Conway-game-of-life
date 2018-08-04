class GOF {
  constructor(canvas, col = 700, row = 700, fps = 20, population = 100) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.width = col;
    this.canvas.height = row;
    this.width = col;
    this.heght = row;
    this.FPS = fps;
    this.POPULATION = population;
    this.CELLSIZE = col / population;
    this.score = 0;
    this.generation = 0;
    this.board = [];
    this.boardClone = [];
  }

  init() {
    this.board = this.createBoard();
    this.boardClone = this.createBoard();
  }

  update() {
    this.computeNextGeneration();
  }

  draw() {
    this.drawCells();
  }

  drawCells() {
    this.board.map((array, col) => {
      array.forEach((cell, row) => {
        let paint = cell === 1 ? '#E71D36' : 'white';
        this.createCell(col * this.CELLSIZE, row * this.CELLSIZE, paint);
      });
    });
  }

  createCell(x, y, fillStyle) {
    this.ctx.beginPath();
    this.ctx.fillStyle = fillStyle;
    this.ctx.rect(x, y, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = 'white';
    this.ctx.fill();
    this.ctx.stroke();
  }

  createBoard(cols, rows) {
    //2D array for board
    let boardArray = new Array(this.POPULATION).fill(null).map(array => {
      return new Array(this.POPULATION).fill(null);
    });

    //Create rand 0 || 1 in each cell

    for (let col = 0; col < this.POPULATION; col++) {
      for (let row = 0; row < this.POPULATION; row++) {
        boardArray[col][row] = Math.round(Math.random());
      }
    }
    return boardArray;
  }

  /*
        x -1   x   x + 1
  y -1   
    y         x,y
  y + 1


  */
  computeNextGeneration() {
    // let boardClone = this.copyArray(this.board);
    let board = this.board;
    let neighbors = 0;
    let score = 0;

    for (let col = 1; col < board.length - 1; col++) {
      for (let row = 1; row < board[col].length - 1; row++) {
        if (board[col - 1][row - 1] === 1) neighbors++;
        if (board[col][row - 1] === 1) neighbors++;
        if (board[col + 1][row - 1] === 1) neighbors++;
        if (board[col - 1][row] === 1) neighbors++;
        if (board[col + 1][row] === 1) neighbors++;
        if (board[col - 1][row + 1] === 1) neighbors++;
        if (board[col][row + 1] === 1) neighbors++;
        if (board[col + 1][row + 1] === 1) neighbors++;

        this.boardClone[col][row] = this.rules(board[col][row], neighbors);
        neighbors = 0;
      }
    }
    this.generation++;

    this.updateStats('generation_stat', this.generation);
    this.updateStats('population_stat', this.score);

    this.score = 0;
    let temp = this.board;
    this.board = this.boardClone;
    this.boardClone = temp;
  }

  rules(cellPos, neighbors) {
    if (cellPos === 1 && neighbors < 2) {
      return 0;
    } else if (cellPos === 1 && neighbors > 3) {
      return 0;
    } else if (cellPos === 0 && neighbors == 3) {
      this.score++;
      return 1;
    } else {
      return cellPos;
    }
  }

  updateStats(className, value) {
    document.getElementsByClassName(className)[0].innerHTML = value;
  }

  copyArray(originalArray) {
    return originalArray.map(arr => {
      return arr.slice();
    });
  }

  start() {
    let fps = this.FPS;
    this.init();
    let animate = () => {
      setTimeout(() => {
        this.update();
        this.draw();
        requestAnimationFrame(animate);
      }, 1000 / fps);
    };
    animate();
  }
}

window.onload = () => {
  let gof = new GOF(document.getElementById('canvas'));
  gof.start();
};
