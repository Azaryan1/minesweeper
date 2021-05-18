import React from 'react';
import PropTypes from 'prop-types';

const DifficultySelector = (props) => (
  <>
    <h1 className="text-center">Please select the difficulty</h1>
    <div className="row align-items-center h-100">
      <div className="col text-center">
        <button
          type="button"
          onClick={() => props.onSelect('easy')}
          className="btn btn-primary btn-lg"
        >
          Easy
        </button>
      </div>
      <div className="col text-center">
        <button
          type="button"
          onClick={() => props.onSelect('medium')}
          className="btn btn-primary btn-lg"
        >
          Medium
        </button>
      </div>
      <div className="col text-center">
        <button
          type="button"
          onClick={() => props.onSelect('hard')}
          className="btn btn-primary btn-lg"
        >
          Hard
        </button>
      </div>
    </div>
  </>
);

DifficultySelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default DifficultySelector;
