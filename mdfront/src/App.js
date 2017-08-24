import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Redirect} from 'react-router'
import Navbar from './components/Navbar'
import Featured from './components/Featured'
import Login from './components/Login'
import LoginAdapter from './adapters/LoginAdapter'
import SignUp from './components/SignUp'
import Article from './components/Articles'
import Card from './components/Cards'
import Post from './components/Posts'
import User from './components/Users'

class Everything extends React.Component{
  constructor(){
    super()
    this.state = {
      userId: ""
    }
  }

  componentWillMount(){
    fetch("http://localhost:3000/api/v1/userinfo", {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'GET',
    })
    .then(resp => resp.json())
    .then(resp => {this.setState({
      userId: resp.user_id
    })})

  }

  render(){
  return (
    <div>
      <Article userId={this.state.userId}/>
      <Card />
      <Post />
      <User />
    </div>
  );
}
}


class App extends Component {

  state = {
    loggedIn : false,
    userId : "",
    overdue : []
  }


  intervalCallback = () => {
    fetch("http://localhost:3000/api/v1/articles", {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'GET',
    })
    .then(resp => resp.json())
    .then(data => {
      let expired_goods = data.filter((article)=>{
        let old_date = new Date(article.created_at)
        let now = new Date()
        return ((now - old_date) - 120000 ) > 0
      })
      this.setState({
        overdue: expired_goods
      },console.log(this.state.overdue))
    })
  }

  componentDidMount(){
    this.setState({
      loggedIn : (localStorage.getItem('token')) ? true : false
    })
    localStorage.setItem("intervalId", setInterval(()=>{ this.intervalCallback() },3000))
  }

  loginUser = (event, history) => {
    event.preventDefault();
    let data = { username: event.target.username.value, password: event.target.password.value}

    LoginAdapter.login(data)
    .then((data) => {
      if(data.not_jwt) {
        localStorage.setItem('token', data.not_jwt)
        this.setState({
          loggedIn : true,
          userId : data.user_id
        })
        history.push('/')
      } else {
        localStorage.removeItem('token', data.not_jwt)
        alert("Incorrect Username and Password, Please Try Again")
      }
    })
  }

  logoutUser = () => {
    localStorage.removeItem('token')
    this.setState({
      loggedIn : false,
      userId : ""
    })
    return <Redirect to="/" />
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.){
  //
  //   }
  // }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <div>
              <Navbar loginStatus={this.state.loggedIn} />
            </div>
            <br />
            <br />
            <Route exact path='/' render={()=>(<Everything userId={this.state.userId} getToken={this.getToken} />)} />
            <Route exact path='/featured' render={()=>(<Featured completedArticles={this.state.overdue}/>)}/>
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
