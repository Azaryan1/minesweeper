class Cell {
  constructor(isOpen, val) {
    this.isOpen = isOpen;
    this.val = val;
  }

  toString() {
    return this.val;
  }

  valueOf() {
    return this.val;
  }
}

const generateBoard = (rows, cols, mines) => {
  let board = [...new Array(rows)].map(() => new Array(cols).fill(undefined));
  board = board.map((arr) => arr.map(() => new Cell(false, 0)));
  while (mines > 0) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (board[row][col].val !== -1) {
      board[row][col].val = -1;

      if (row > 0 && board[row - 1][col].val !== -1) {
        board[row - 1][col].val += 1;
      }
      if (col > 0 && board[row][col - 1].val !== -1) {
        board[row][col - 1].val += 1;
      }

      if (row < rows - 1 && board[row + 1][col].val !== -1) {
        board[row + 1][col].val += 1;
      }
      if (col < cols - 1 && board[row][col + 1].val !== -1) {
        board[row][col + 1].val += 1;
      }

      if (row > 0 && col > 0 && board[row - 1][col - 1].val !== -1) {
        board[row - 1][col - 1].val += 1;
      }
      if (
        row < rows - 1 &&
        col < cols - 1 &&
        board[row + 1][col + 1].val !== -1
      ) {
        board[row + 1][col + 1].val += 1;
      }

      if (row > 0 && col < cols - 1 && board[row - 1][col + 1].val !== -1) {
        board[row - 1][col + 1].val += 1;
      }
      if (row < rows - 1 && col > 0 && board[row + 1][col - 1].val !== -1) {
        board[row + 1][col - 1].val += 1;
      }

      mines -= 1;
    }
  }

  return board;
};

const cascade = (board, row, col) => {
  if (row < 0 || col < 0 || row >= board.length || col >= board[0].length) {
    return board;
  }
  if (board[row][col].val === 0 && !board[row][col].isOpen) {
    board[row][col].isOpen = true;
    board = cascade(board, row - 1, col - 1);
    board = cascade(board, row + 1, col - 1);
    board = cascade(board, row - 1, col + 1);
    board = cascade(board, row + 1, col + 1);
    board = cascade(board, row - 1, col);
    board = cascade(board, row + 1, col);
    board = cascade(board, row, col - 1);
    board = cascade(board, row, col + 1);
    return board;
  }
  if (board[row][col].val > 0) {
    board[row][col].isOpen = true;
    return board;
  }
  return board;
};

const getSettings = (diff) => {
  let rows;
  let cols;
  let mines;
  switch (diff) {
    case 'easy':
      rows = 9;
      cols = 9;
      mines = 10;
      break;
    case 'medium':
      rows = 16;
      cols = 16;
      mines = 40;
      break;
    case 'hard':
      rows = 16;
      cols = 30;
      mines = 99;
      break;
    default:
      rows = 16;
      cols = 16;
      mines = 40;
      break;
  }
  return [rows, cols, mines];
};

const formatSeconds = (second) => {
  let h = Math.floor(second / 3600);
  let m = Math.floor((second - h * 3600) / 60);
  let s = second - h * 3600 - m * 60;

  if (h < 10) {
    h = `0${h}`;
  }
  if (m < 10) {
    m = `0${m}`;
  }
  if (s < 10) {
    s = `0${s}`;
  }
  if (h === '00') {
    return `${m}:${s}`;
  }
  return `${h}:${m}:${s}`;
};

export default {
  generateBoard,
  getSettings,
  formatSeconds,
  cascade,
};
