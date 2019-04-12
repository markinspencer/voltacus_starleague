import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav className="light-blue lighten-1" role="navigation">
      <div className="nav-wrapper container">
        <a id="logo-container" href="/" className="brand-logo">
          Voltucus StarLeague
        </a>
        <ul className="right hide-on-med-and-down">
          {user && (
            <React.Fragment>
              <li>
                <NavLink to="/profile" className="nav-item nav-link">
                  {user.battleTag}
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout" className="nav-item nav-link">
                  Logout
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {!user && (
            <li>
              <a href="http://localhost:4000/auth/bnet">Sign in</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
