import React from 'react';

const UserFilter = () => {
  return (
    <div className="filter__user--wrapper">
      <div className="filter__user">
        <button id="userFilter" className="mdl-button mdl-js-button mdl-button--icon">
          <i className="material-icons">more_vert</i>
        </button>
        <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="userFilter">
          <li className="mdl-menu__item">Some Action</li>
          <li className="mdl-menu__item">Another Action</li>
          <li disabled className="mdl-menu__item">Disabled Action</li>
          <li className="mdl-menu__item">Yet Another Action</li>
        </ul>
      </div>
    </div>
  )
}

export default UserFilter;
