import './App.scss';
import { Component } from 'react';
import Tab from './components/tab/tab';
import Captcha from './components/captcha/Captcha';

import { MemoryRouter, Redirect, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <MemoryRouter>
        <Route path="/captcha" component={Captcha} />
        <Route path="/booking" component={Tab} />
        <Redirect to="/captcha" />
      </MemoryRouter>
    );
  }
}

export default App;
