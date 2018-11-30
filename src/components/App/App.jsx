import React from 'react';
import { block } from 'bem-cn';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, MainBody } from '../';;

import './App.scss';

const b = block('app-container');

class App extends React.PureComponent {

  render() {
    return (
      <Router>
        <div className={b()}>
          <Header />
          <Switch>
            <Route exact path="/" component={MainBody} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;