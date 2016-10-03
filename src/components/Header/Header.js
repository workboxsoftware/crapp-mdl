import React from 'react';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  return (
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">Title</span>
        <div className="mdl-layout-spacer"></div>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
