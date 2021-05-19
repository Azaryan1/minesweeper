import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import './Game.css';

const Board = ({ board, movieHandler, restart, difficulty }) => {
  const cols = [];

  for (let i = 0; i < board.length; i++) {
    const row = [];
    for (let j = 0; j < board[i].length; j++) {
      const val =
        board[i][j].isOpen && board[i][j].val > 0 ? board[i][j].val : '';
      const cell = board[i][j];
      const classes = [];
      if (cell.isOpen) {
        classes.push('open');
        if (cell.val === -1) {
          classes.push('bomb');
        }
      } else {
        classes.push('close');
      }
      if (cell.isMarked && !cell.isOpen) {
        classes.push('mark');
      }
      row.push(
        <span
          onMouseDown={(e) => movieHandler(i, j, e)}
          onContextMenu={(e) => e.preventDefault()}
          className={`cell ${classes.join(' ')}`}
          key={uuidv4()}
        >
          {val}
        </span>
      );
    }
    cols.push(row);
  }

  return (
    <>
      <div className="h-100 d-flex justify-content-center align-items-center">
        <div id="board">
          {cols.map((row) => (
            <div className={`row row_${difficulty}`} key={uuidv4()}>
              {row}
            </div>
          ))}
        </div>
      </div>
      <br />
      <div className="col-md-12 text-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            restart(difficulty);
          }}
        >
          Restart
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            window.location.reload('./new');
          }}
        >
          Quit
        </button>
      </div>
    </>
  );
};

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array).isRequired,
  movieHandler: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default Board;
