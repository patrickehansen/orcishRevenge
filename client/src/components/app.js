'use strict';
import '../style/styles.scss';
import "@babel/polyfill";
import React, { Component } from 'react';
import Home from './home';
import Game from './game/game';
import Main from './main';
import Login from './account/login';
import Register from './account/register';

import {
BrowserRouter as Router,
Route,
Switch,
} from 'react-router-dom';

import history from './history';

class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
        currentPath: '',
      }
    }

    clearError = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Router history={history}>
          <div className='App'> 
            <title>Orcish Revenge</title>

            <Main>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/game' component={Game} />
              </Switch>
            </Main>
          </div>
        </Router>
      )
    }
}

export default App;