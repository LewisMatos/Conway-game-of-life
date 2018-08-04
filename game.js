class GOF {
  constructor(canvas, col = 900, row = 900, fps = 30, cellSize = 10) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.style.width = `${col}px`;
    this.canvas.style.height = `${row}px`;
    this.width = col;
    this.heght = row;
    this.FPS = fps;
    this.CELLSIZE = cellSize;
  }

  init() {
    this.board = this.createBoard();
  }

  update() {
    this.computeNextGeneration();
  }

  draw() {
    this.drawCells();
  }

  drawBackground() {
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCells() {
    let cellSize = this.CELLSIZE;
    this.board.map((array, col) => {
      array.forEach((cell, row) => {
        if (cell === 1) {
          this.createCell(col * cellSize, row * cellSize, 'red');
        } else {
          this.createCell(col * cellSize, row * cellSize, 'white');
        }
      });
    });
  }

  createCell(x, y, fillStyle) {
    this.ctx.fillStyle = fillStyle;
    this.ctx.fillRect(x, y, this.CELLSIZE, this.CELLSIZE);
    this.ctx.strokeStyle = 'black';
    this.ctx.strokeRect(x, y, this.CELLSIZE, this.CELLSIZE);
  }

  createBoard(cols, rows) {
    //2D array for board
    let boardArray = new Array(this.width).fill(null).map(array => {
      return new Array(this.heght).fill(null);
    });

    //Create rand 0 || 1 in each cell
    boardArray.map(array => {
      return array.forEach((cell, index) => {
        array[index] = Math.round(Math.random());
      });
    });
    return boardArray;
  }

  /*
        x -1   x   x + 1
  y -1   
    y         x,y
  y + 1


  */
  computeNextGeneration() {
    let boardClone = this.copyArray(this.board);
    let board = this.board;
    let neighbors = 0;

    for (let col = 1; col < board.length - 1; col++) {
      for (let row = 1; row < board[col].length - 1; row++) {
        switch (board) {
          case board[col - 1][row - 1] === 1:
            neighbors++;
            break;
          case board[col - 1][row - 1] === 1:
            neighbors++;
            break;
          case board[col - 1][row - 1] === 1:
            neighbors++;
            break;
          case board[col - 1][row - 1] === 1:
            neighbors++;
            break;
          case board[col - 1][row - 1] === 1:
            neighbors++;
            break;
          case board[col - 1][row - 1] === 1:
            neighbors++;
            break;
          default:
            break;
        }

        if (board[col - 1][row - 1] === 1) {
          neighbors++;
        }
        if (board[col][row - 1] === 1) {
          neighbors++;
        }
        if (board[col + 1][row - 1] === 1) {
          neighbors++;
        }

        if (board[col - 1][row] === 1) {
          neighbors++;
        }
        if (board[col + 1][row] === 1) {
          neighbors++;
        }

        if (board[col - 1][row + 1] === 1) {
          neighbors++;
        }
        if (board[col][row + 1] === 1) {
          neighbors++;
        }
        if (board[col + 1][row + 1] === 1) {
          neighbors++;
        }

        boardClone[col][row] = this.rules(board[col][row], neighbors);
        neighbors = 0;
      }
    }
    this.board = this.copyArray(boardClone);
  }

  rules(cellPos, neighbors) {
    if (cellPos === 1 && neighbors < 2) {
      return 0;
    } else if (cellPos === 1 && neighbors > 3) {
      return 0;
    } else if (cellPos === 0 && neighbors == 3) {
      return 1;
    } else {
      return cellPos;
    }
  }

  copyArray(originalArray) {
    let cloneArray = this.createBoard();
    originalArray.forEach((array, col) => {
      array.forEach((cell, row) => {
        cloneArray[col][row] = cell;
      });
    });
    return cloneArray;
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
