import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div className="row">
            <div className="pr-4">
                <Link to="/"><h6>HOME</h6></Link>
            </div>
            <div className="pr-4">
                <Link to="/about"><h6>ABOUT</h6></Link>
            </div>
            <div>
                <Link to="/price"><h6>PRICE</h6></Link>
            </div>
        </div>
        </header>
        <img src={logo} className="App-logo" alt="logo" />
          <h3>
            OUR PRICE
          </h3>
      </div>
    );
  }
}

export default Home;