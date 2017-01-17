import React from 'react';
import rocket from '../images/rocket.svg';
import './style.css'
import clouds from '../images/clouds1.png';

const RocketArea = ({props}) => {
  const { auth } = props;
  const rocketClass = (auth.authenticated) ? 'Auth-rocket-area Auth-rocket-move' : 'Auth-rocket-area';

  return (
    <section className="Auth-left-side">
      <div className="Auth-cloud-parent">
        <img src={clouds} className="Auth-clouds" alt="logo"/>
        <img src={clouds} className="Auth-clouds Auth-clouds-2 {
" alt="logo"/>
      </div>
      <div className="Auth-rocket-parent">
        <img src={rocket} alt="Welcome to Workbox" className={rocketClass}/>
      </div>
    </section>
  )
}

export default RocketArea;