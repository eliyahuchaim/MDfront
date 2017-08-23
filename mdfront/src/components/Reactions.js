import React from 'react';
import ReactionForm from './ReactionForm'
import ReactionDetails from './ReactionDetail'

const URL = 'http://localhost:3000/api/v1'

class Reaction extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      allReactions: [],
      showFrom: false,
      singleReaction: [],
      article_id: this.props.article_id,
      showSingleReaction: false,
      editReaction: false
    }
  }

  componentWillMount(){
    fetch(`${URL}/article/reactions/${this.state.article_id}`, {
      headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'accept': 'application/json',
      'content-Type': 'application/json'
       }
    })
    .then(resp => resp.json())
    .then(resp => {this.setState({
      allReactions: resp
    })})
  }

  showReactionForm = () => {
    this.setState({
      showFrom: true
    })
  }

  showSingleReaction = (id) => {
    let singleAFReaction = this.state.allReactions.reactions.find(reaction =>{
      return reaction.id == id.target.id
    })
    this.updateReactionViews(id, singleAFReaction)
  }

  editReaction = (event) => {
    const ID = event.target.id

    let singleAFReaction = this.state.allReactions.reactions.find(reaction =>{
      return reaction.id == ID
    })
    this.setState({
      singleReaction: singleAFReaction,
      showSingleReaction: true,
      editReaction: true
    })
  }

  updateReaction = (event) => {
    event.preventDefault()
    const ID = parseInt(event.target.id)

      let payload = {
        point_1: event.target.elements[0].value,
        point_2: event.target.elements[1].value,
        point_3: event.target.elements[2].value,
        content: event.target.elements[3].value,
        article_id: this.state.article_id,
      }
      var data = JSON.stringify (payload)

      fetch(`http://localhost:3000/api/v1/reactions/${ID}`, {
        headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'accept': 'application/json',
        'content-Type': 'application/json'
         },
        method: 'PATCH',
        body: data
      })
      .then(resp => resp.json())
      .then(resp => {this.setState({
        showFrom: false
        })
      })
        // let reactions = this.state.allReactions.reactions.filter(reaction => {
        //   reaction.id !== resp.id
        // })
        // debugger
        // console.log(reactions)
        // let updatedReactions = reactions.push(resp)
        // this.setState({
        // showFrom: false,
        // singleReaction: resp,
        // allReactions: reactions
      // })})

    }

  deleteReaction = (event) => {
    event.preventDefault()
    const ID = parseInt(event.target.id)

    fetch(`http://localhost:3000/api/v1/reactions/${ID}`, {
      headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'accept': 'application/json',
      'content-Type': 'application/json'
       },
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(resp => {this.setState({
      showSingleReaction: false
    })})
  }


  updateReactionViews = (id, singleAFReaction) => {
    var data = { "reaction": {
      "initial_score": "true"
      }
    }
    const ID = parseInt(id.target.id)
    var payload = JSON.stringify(data)
    fetch(`${URL}/reactions/${ID}`, {
      headers: {
      'accept': 'application/json',
      'content-Type': 'application/json'
       },
      body: payload,
      method: 'PATCH'
    })
    .then(resp => resp.json())
    .then(resp => { console.log(resp)
      this.setState({
      singleReaction: singleAFReaction,
      showSingleReaction: true
    })})
  }

  showAllReactions = () => {
    this.setState({
      showSingleReaction: false,
      editReaction: false
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    let payload = {
      point_1: event.target.elements[0].value,
      point_2: event.target.elements[1].value,
      point_3: event.target.elements[2].value,
      content: event.target.elements[3].value,
      article_id: this.state.article_id,
    }
    var data = JSON.stringify (payload)
    this.submitReaction(data)
  }

  submitReaction = (data) => {
    fetch(`http://localhost:3000/api/v1/reactions`, {
      headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'accept': 'application/json',
      'content-Type': 'application/json'
       },
      method: 'POST',
      body: data
    })
    .then(resp => resp.json())
    .then(resp => {
      let reactions = this.state.allReactions
      reactions.reactions.push(resp)
      this.setState({
      showFrom: false,
      singleReaction: resp,
      allReactions: reactions
    })})
  }



  render(){
    console.log("reaction props",this.props)
    return (
      <div>
        {
          (this.state.showFrom) ? <ReactionForm onSubmit={this.handleFormSubmit} />
          : <button onClick={this.showReactionForm} >
          Add Reaction
          </button>
        }
        <ReactionDetails deleteReaction={this.deleteReaction} updateReaction={this.updateReaction} edit={this.state.editReaction} editReaction={this.editReaction} user_id={this.props.user_id} Reactions={(this.state.showSingleReaction) ? this.state.singleReaction: this.state.allReactions} showSingleReaction={this.showSingleReaction} showAllReactions={this.showAllReactions} />
      </div>
    )
  }
};

export default Reaction;
