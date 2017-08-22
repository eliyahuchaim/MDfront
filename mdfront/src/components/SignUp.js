import React from 'react';
import SignUpAdapter from '../adapters/SignUpAdapter';

const SignUp = (props) => {

  const redirectLogin = (event) => {
    event.preventDefault()
    let data = {user: {
        name: event.target.name.value,
        username: event.target.username.value,
        password: event.target.password.value
      }
    }
    //validation check for mismatch password?
    SignUpAdapter.signUp(data)
    //add then to catch for bad sign up?
    props.history.push('/login')
  }

  return(
    <form
      onSubmit={redirectLogin}
      >
      <h1>SignUp</h1>
      <div>
        <input type='text' name='name' placeholder='Name' />
        <label htmlFor='name'>Name</label>
      </div>
      <div>
        <input type='text' name='username' placeholder='Username' />
        <label htmlFor='username'>Username</label>
      </div>
      <div>
        <input type='password' name='password' placeholder='Password' />
        <label htmlFor='password'>Password</label>
      </div>
      <div>
        <input type='password' name='password_confirmation' placeholder='Password_Confirmation' />
        <label htmlFor='password_confirmation'>Password Confirmation</label>
      </div>
      <input type='submit' value='Signup' />
    </form>
  )
}

export default SignUp;
