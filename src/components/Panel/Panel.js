import React from 'react';
import Tab from '../Tab/Tab';
import UserFilter from '../Filter/UserFilter';

const Panel = () => {
  return (
    <div className="panel">
      <div className="panel__header mdl-shadow--4dp" />
      <Tab />
      <UserFilter />
    </div>
  )
}

export default Panel;
