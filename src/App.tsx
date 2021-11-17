import './App.scss';

import { Component } from 'react';
import Tab from './components/tab/tab';
import Captcha from './components/captcha/Captcha';

import { HashRouter, Redirect, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Route path="/captcha" component={Captcha} />
        <Route path="/booking" component={Tab} />
        <Redirect to="/booking" />
      </HashRouter>
    );
  }
}

export default App;
