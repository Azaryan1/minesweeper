import React, { useState } from 'react';
import PropTypes from 'prop-types';

import utils from '../../utils/boardUtils';

const Timer = (props) => {
  const { startTime, gameOver } = props;
  const [, setTemp] = useState(0);
  const [int, setInt] = useState(0);
  if (!gameOver && int === 0) {
    setInt(
      setInterval(() => {
        if (!gameOver) {
          setTemp((prev) => prev + 1);
        }
      }, 1000)
    );
  }
  if (gameOver && int !== 0) {
    clearInterval(int);
    setInt(0);
  }

  return (
    <h3 className="text-center">
      {utils.formatSeconds(Math.round((new Date() - startTime) / 1000))}
    </h3>
  );
};

Timer.propTypes = {
  startTime: PropTypes.instanceOf(Date).isRequired,
  gameOver: PropTypes.bool.isRequired,
};

export default Timer;
