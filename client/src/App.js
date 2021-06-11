import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './component/Landing';
import Game from './component/Game';
import Ranking from './component/Ranking';
import store from './store';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import PrivateRouting from './component/Private/PrivateRouting';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Landing} />
        <Switch>
          <Route exact path='/ranking' component={Ranking} />
          <PrivateRouting exact path='/game' component={Game} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
