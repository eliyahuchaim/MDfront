import React from 'react';
import {NavLink} from 'react-router-dom';

const link = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  textAlign: 'center',
  background: '#008CBA',
  display: 'inline-block',
  fontSize: '16px',
  textDecoration: 'none',
  color: 'white',
}

const Navbar = (props) => {

  const loginStatusNav = () => {
    if (props.loginStatus) {
      return (
        <div className='nav-in'>
          <NavLink
            to='/'
            exact
            style={link}
            activeStyle={{
              background: '#2a65b2'
            }}
          >Home</NavLink>
          <NavLink
            to='/featured'
            exact
            style={link}
            activeStyle={{
              background: '#2a65b2'
            }}
          >Winners</NavLink>
          <NavLink
            to='/logout'
            exact
            style={link}
            activeStyle={{
              background: '#2a65b2'
            }}
          >Logout</NavLink>
        </div>
      )
    }
    else{
      return (
        <div className='nav-out'>
          <NavLink
            to='/'
            exact
            style={link}
            activeStyle={{
              background: '#2a65b2'
            }}
          >Home</NavLink>
          <NavLink
            to='/featured'
            exact
            style={link}
            activeStyle={{
              background: '#2a65b2'
            }}
          >Winners</NavLink>
          <NavLink
            to='/login'
            exact
            style={link}
            activeStyle={{
              background: '#2a65b2'
            }}
          >Login</NavLink>
          <NavLink
            to='/signup'
            exact
            style={link}
            activeStyle={{
              background: '#2a65b2'
            }}
          >SignUp</NavLink>
        </div>
      )
    }
  }

  return(
    <div className='navbar'>
      {loginStatusNav()}
    </div>
  );
}

export default Navbar;
