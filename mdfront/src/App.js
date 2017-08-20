import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//import component files
import Article from './components/Articles'
import Card from './components/Cards'
import Post from './components/Posts'
import Reaction from './components/Reactions'
import User from './components/Users'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Article />
        <Card />
        <Post />
        <Reaction />
        <User />
      </div>
    );
  }
}

export default App;
