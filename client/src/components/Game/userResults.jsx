import React from 'react';
import PropTypes from 'prop-types';
import utils from '../../utils/boardUtils';

const UserResults = ({ userStat }) => (
  <table className="table table-sm table-bordered table-dark">
    <tbody>
      <tr>
        <th />
        <th>Easy</th>
        <th>Medium</th>
        <th>Hard</th>
      </tr>
      <tr>
        <th>Won</th>
        <td>{userStat.nWins.easy}</td>
        <td>{userStat.nWins.medium}</td>
        <td>{userStat.nWins.hard}</td>
      </tr>
      <tr>
        <th>Lost</th>
        <td>{userStat.nGames.easy - userStat.nWins.easy}</td>
        <td>{userStat.nGames.medium - userStat.nWins.medium}</td>
        <td>{userStat.nGames.hard - userStat.nWins.hard}</td>
      </tr>
      <tr>
        <th>Total</th>
        <td>{userStat.nGames.easy}</td>
        <td>{userStat.nGames.medium}</td>
        <td>{userStat.nGames.hard}</td>
      </tr>
      <tr>
        <th>Best result</th>
        <td>
          {userStat.bests.easy && utils.formatSeconds(userStat.bests.easy)}
        </td>
        <td>
          {userStat.bests.medium && utils.formatSeconds(userStat.bests.medium)}
        </td>
        <td>
          {userStat.bests.hard && utils.formatSeconds(userStat.bests.hard)}
        </td>
      </tr>
    </tbody>
  </table>
);

UserResults.propTypes = {
  userStat: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default UserResults;
