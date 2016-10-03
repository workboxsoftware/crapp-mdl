import React from 'react';
import { Link } from 'react-router';

const Navigation = () => {
  return (
    <nav className="mdl-navigation mdl-layout--large-screen-only">
      <Link to="/" className="mdl-navigation__link">
        Home
      </Link>
      <Link to="/about" className="mdl-navigation__link">
        About
      </Link>
    </nav>
  );
}

export default Navigation;
