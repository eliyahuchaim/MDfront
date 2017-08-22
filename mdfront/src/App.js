import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Redirect} from 'react-router'
import Navbar from './components/Navbar'
import Login from './components/Login'
import LoginAdapter from './adapters/LoginAdapter'
import SignUp from './components/SignUp'
import Article from './components/Articles'
import Card from './components/Cards'
import Post from './components/Posts'
import User from './components/Users'

const Everything = (props) => {
  return (
    <div>
      <Article />
      <Card />
      <Post />
      <User />
    </div>
  );
}


class App extends Component {

  state = {
    loggedIn : false
  }

  componentDidMount(){
    this.setState({
      loggedIn : (localStorage.getItem('token')) ? true : false
    })
  }

  loginUser = (event, history) => {
    event.preventDefault();
    let data = { username: event.target.username.value, password: event.target.password.value}

    LoginAdapter.login(data)
    .then((data) => {
      if(data.not_jwt) {
        localStorage.setItem('token', data.not_jwt)
        this.setState({
          loggedIn : localStorage.getItem('token')
        })
        history.push('/')
      } else {
        localStorage.removeItem('token', data.not_jwt)
        alert("Incorrect Username and Password, Please Try Again")
      }
    })
  }

  logoutUser = () => {
    this.setState({
      loggedIn : false
    }, () => {localStorage.removeItem('token')})
    return (<Redirect to="/" />)
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <div>
              <Navbar loginStatus={this.state.loggedIn} />
            </div>
            <Route exact path='/' render={Everything} />
            <Route exact path='/login' render={(props)=>(<Login loginUser={this.loginUser} route={props} />)} />
            <Route exact path='/logout' render={this.logoutUser} />
            <Route exact path='/signup' component={SignUp} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
