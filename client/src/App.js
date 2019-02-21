import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to SimpleJAO
          </p>
          <p>Sign in to start!</p>
          <a
            className="App-link"
            href="http://localhost:5000/auth/google"
          >
            Google Sign In
          </a>
        </header>
      </div>
    );
  }
}

export default App;
