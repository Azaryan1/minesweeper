import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AuthService from './services/auth.service';

import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import Top from './components/top';
import Game from './components/Game/game';

const App = () => {
  const [user] = useState(AuthService.getCurrentUser());

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Minesweeper
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/top" className="nav-link">
              Top Results
            </Link>
          </li>
          {user && (
            <li className="nav-item">
              <Link
                to="/new"
                onClick={() => {
                  if (window.location.pathname.startsWith('/new')) {
                    window.location.reload('./new');
                  }
                }}
                className="nav-link"
              >
                New Game
              </Link>
            </li>
          )}
        </div>
        {user ? (
          <>
            <div style={{ color: 'white' }}>Welcome {user.username}!</div>
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={AuthService.logout}>
                  Logout
                </a>
              </li>
            </div>
          </>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/top" component={Top} />
          <Route exact path="/new" component={Game} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
