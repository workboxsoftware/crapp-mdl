import React from 'react';
import { Link } from 'react-router';

const Menu = () => {
  return (
    <div className="mdl-layout__drawer">
      <span className="mdl-layout-title">Title</span>
      <nav className="mdl-navigation">
        <Link to="/" className="mdl-navigation__link">
          Home
        </Link>
        <Link to="/about" className="mdl-navigation__link">
          About
        </Link>
      </nav>
    </div>
  );
}

export default Menu;
