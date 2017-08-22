import React from 'react';
import {NavLink} from 'react-router-dom';

const link = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  background: 'blue',
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
              background: 'darkblue'
            }}
          >Everything</NavLink>
          <NavLink
            to='/logout'
            exact
            style={link}
            activeStyle={{
              background: 'darkblue'
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
              background: 'darkblue'
            }}
          >Everything</NavLink>
          <NavLink
            to='/login'
            exact
            style={link}
            activeStyle={{
              background: 'darkblue'
            }}
          >Login</NavLink>
          <NavLink
            to='/signup'
            exact
            style={link}
            activeStyle={{
              background: 'darkblue'
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
