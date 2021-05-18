import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DifficultySelector from './difficultySelector';
import Board from './board';
import Utils from '../../utils/boardUtils';

import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

import UserResults from './userResults';

const initialState = {
  gameData: {
    difficulty: null,
    board: undefined,
    gameOver: false,
    nMines: 0,
    nMarked: 0,
    remaining: 0,
    readyForSubmit: true,
  },
  userStat: {
    nGames: {
      easy: 0,
      medium: 0,
      hard: 0,
    },
    nWins: {
      easy: 0,
      medium: 0,
      hard: 0,
    },
    bests: {
      easy: null,
      medium: null,
      hard: null,
    },
  },
};

const { generateBoard, getSettings, cascade } = Utils;

const Game = () => {
  const [gameData, setGameData] = useState(initialState.gameData);
  const [user] = useState(
    AuthService.getCurrentUser() ? AuthService.getCurrentUser().username : null
  );
  const [userStat, setUserStat] = useState(initialState.userStat);
  const [startTime, setStartTime] = useState(0);

  const selectDifficulty = (diff) => {
    const [rows, cols, mines] = getSettings(diff);
    setGameData({
      ...initialState.gameData,
      difficulty: diff,
      nMarked: 0,
      nMines: mines,
      board: generateBoard(rows, cols, mines),
      remaining: rows * cols - mines,
    });
    setStartTime(new Date());
    axios
      .get(`http://localhost:8080/api/userdata?name=${user}`)
      .then((data) => {
        setUserStat(data.data);
      });
  };

  const moveHandler = (row, col, e) => {
    e.preventDefault();
    if (
      (gameData.board[row][col].isOpen && e.button !== 1) ||
      gameData.gameOver
    )
      return;
    let newBoard;
    if (e.button === 0 && !gameData.board[row][col].isMarked) {
      let isGameOver = false;
      if (gameData.board[row][col].val === -1) {
        newBoard = gameData.board.map((el) =>
          el.map((cell) => {
            cell.isOpen = true;
            return cell;
          })
        );
        isGameOver = true;
      } else if (gameData.board[row][col].val === 0) {
        newBoard = cascade(
          gameData.board.map((el) => [...el]),
          row,
          col
        );
      } else {
        newBoard = gameData.board.map((el) => [...el]);
      }

      newBoard[row][col].isOpen = true;

      let r = gameData.remaining;
      if (gameData.board[row][col].val !== -1) {
        r = 0;
        newBoard.forEach((el) => {
          el.forEach((cell) => {
            if (!cell.isOpen && cell.val !== -1) {
              r += 1;
            }
          });
        });
        if (r === 0) {
          isGameOver = true;
        }
      }

      setGameData({
        ...gameData,
        board: newBoard,
        gameOver: isGameOver,
        remaining: r,
      });
    }
  };

  const submitResults = (time) => {
    if (
      gameData.readyForSubmit &&
      gameData.remaining === 0 &&
      gameData.gameOver
    ) {
      UserService.submitResult(user, gameData.difficulty, time, true);
      setGameData({ ...gameData, readyForSubmit: false });
    } else if (
      gameData.readyForSubmit &&
      gameData.remaining > 0 &&
      gameData.gameOver
    ) {
      UserService.submitResult(user, gameData.difficulty, time, false);
      setGameData({ ...gameData, readyForSubmit: false });
    }
  };

  useEffect(() => {
    submitResults(Math.round((new Date() - startTime) / 1000));
  }, [gameData.gameOver]);

  return (
    <div className="container justify-content-center align-items-center">
      {gameData.difficulty ? (
        <>
          <UserResults userStat={userStat} />
          <p className="text-center">
            {Math.max(gameData.nMines - gameData.nMarked, 0)} mines remaining:
            there are {gameData.nMines} mines and you have marked{' '}
            {gameData.nMarked} cells
          </p>
          <Board
            moveHandler={moveHandler}
            restart={selectDifficulty}
            difficulty={gameData.difficulty}
            board={gameData.board}
          />
        </>
      ) : (
        <>
          <header className="jumbotron">
            <h1>{`Hello, general ${user}!`}</h1>
          </header>
          <DifficultySelector onSelect={selectDifficulty} />
        </>
      )}
    </div>
  );
};
export default Game;
