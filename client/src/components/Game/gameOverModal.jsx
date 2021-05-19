import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const GameOverModal = ({ isOpen, isWin, difficulty, restart }) => (
  <Modal
    isOpen={isOpen}
    ariaHideApp={false}
    style={{
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      },
    }}
  >
    {isWin ? (
      <>
        <div>Well, good for you! You won the game!</div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            window.location.reload('');
          }}
        >
          Take me to the main page
        </button>
      </>
    ) : (
      <>
        <div>Booom, you are dead!</div>
        <button
          type="button"
          className="btn btn-warning"
          onClick={(e) => {
            e.preventDefault();
            restart(difficulty);
          }}
        >
          Restart
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={(e) => {
            e.preventDefault();
            window.location.reload('');
          }}
        >
          Quit
        </button>
      </>
    )}
  </Modal>
);

GameOverModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isWin: PropTypes.bool.isRequired,
  restart: PropTypes.func.isRequired,
  difficulty: PropTypes.string,
};

GameOverModal.defaultProps = {
  difficulty: 'medium',
};

export default GameOverModal;
