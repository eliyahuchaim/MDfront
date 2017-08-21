import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Article from './components/Articles'
import Card from './components/Cards'
import Post from './components/Posts'
import Reaction from './components/Reactions'
import User from './components/Users'



class App extends Component {

  // componentWillMount(){
  //   fetch('http://localhost:3000/api/v1/users')
  //   .then(resp => resp.json())
  //   .then(resp => {debugger})
  // }



  render() {
    return (
      <div>
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
