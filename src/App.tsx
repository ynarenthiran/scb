import './App.scss';

import { Component } from 'react';
import Tab from './components/tab/tab';
import Captcha from './components/captcha/Captcha';

import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/booking" component={Tab} />
        <Route path="" component={Captcha} />
      </Router>
    );
  }
}

export default App;
