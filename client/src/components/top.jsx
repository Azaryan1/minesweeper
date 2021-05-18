import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import AuthService from '../services/auth.service';

const Top = () => {
  const [data, setData] = useState([]);
  const [level, setLevel] = useState('medium');
  const [user] = useState(
    AuthService.getCurrentUser() ? AuthService.getCurrentUser().username : null
  );

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/top?level=${level}`)
      .then((res) => setData(res.data));
  }, [level]);

  const getDataAsReactElement = () =>
    !data ? null : (
      <tbody>
        <tr>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Best time (in seconds)</th>
        </tr>
        {data.map((el) => (
          <tr
            className={user && el.username === user ? 'text-success' : null}
            key={uuidv4()}
          >
            {Object.entries(el).map((field) => (
              <td key={uuidv4()}>{field[1]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  return (
    <div>
      <select
        className="form-select"
        onChange={(e) => {
          setLevel(e.target.value);
        }}
        defaultValue="medium"
      >
        <option value="easy">Easy</option>
        <option value="medium">Meduim</option>
        <option value="hard">Hard</option>
      </select>
      <table className="table">{getDataAsReactElement()}</table>
    </div>
  );
};

export default Top;
