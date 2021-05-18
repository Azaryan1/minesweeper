import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import AuthService from '../services/auth.service';

const Home = () => {
  const [user] = useState(AuthService.getCurrentUser());
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          {user ? (
            <Redirect to="/new" />
          ) : (
            <>
              <p>Hi, hi, hi, there!</p>
              <p>Welly, welly, welly, welly, welly, welly, well!</p>
              <p>
                To what do I owe the extreme pleasure of this surprising visit?
              </p>
            </>
          )}{' '}
        </h3>
      </header>
    </div>
  );
};

export default Home;
