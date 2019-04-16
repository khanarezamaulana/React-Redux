import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';
import Price from './component/Price';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/price" component={Price} />
      </React.Fragment>
    );
  }
}

export default App;
