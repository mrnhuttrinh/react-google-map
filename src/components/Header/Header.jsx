import React from 'react';
import block from 'bem-cn';

import './Header.scss';

const b = block('header');

class Header extends React.PureComponent {
  render() {
    return (
      <header className={b()}>
        <div className={b('top')}>
          <div className={b('top--logo')}>
            <img src={require('./imgs/logo.PNG')} />
          </div>
          <div className={b('top--menu')}>
            <ul className={b('top--menu_left')}>
              <li className="active">Overview</li>
              <li>Fleet Utilisation</li>
              <li>Violations</li>
              <li>Drivers Scoreboard</li>
              <li>Vehicle Maintenance</li>
              <li>Reports</li>
            </ul>
            <ul className={b('top--menu_right')}>
              <li><i className={b('icon').mix('far fa-user')}></i></li>
              <li><i className={b('icon').mix('fas fa-sign-out-alt')}></i></li>
            </ul>
          </div>
        </div>
        <div className={b('bottom')}>
          <div>
            &#8592; Back to Overview
          </div>
          <div>
            Connect4car’s Fleet Summary
          </div>
        </div>
      </header>
    );
  }
}


export default Header;