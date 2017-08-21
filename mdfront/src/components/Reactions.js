import React from 'react';
import ReactionForm from './ReactionForm'

class Reaction extends React.Component {
  constructor(){
    super()
    this.state = {
      reactions: []
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    let payload = {
      point_1: event.target.elements[0].value,
      point_2: event.target.elements[1].value,
      point_3: event.target.elements[2].value,
      content: event.target.elements[3].value,
      article_id: event.target.elements[4].value,
      user_id: event.target.elements[5].value
    }
    var data = JSON.stringify (payload)
    this.submitReaction(data)
  }

  submitReaction = (data) => {
    fetch(`http://localhost:3000/api/v1/reactions`, {
      headers: {
      'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozfQ.Ml5q0Qa3O-9xjA-aluRwTS86Yt5ilN-SGT-HEK4oDAk",
      'accept': 'application/json',
      'content-Type': 'application/json'
       },
      method: 'POST',
      body: data
    })
    .then(resp => resp.json())
    .then(resp => {debugger})
  }

  render(){
    return (
      <div>
      <ReactionForm onSubmit={this.handleFormSubmit}/>
        <h1>I am a Reaction</h1>
      </div>
    )
  }
};

export default Reaction;
