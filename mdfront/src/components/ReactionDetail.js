import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react'



const ReactionDetails = (props) => {



  let reactions = reactionJSX(props.Reactions, props)


  return (
    <div>
    <Card.Group>
    {reactions}
    </Card.Group>
    </div>
  )
}

function reactionJSX(reactions, props){
  if (reactions[0]) {
    return reactions[0].reactions.map(reaction => {
      return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src='/assets/images/avatar/large/steve.jpg' />
          <Card.Header>
            name of person
          </Card.Header>
          <Card.Description>
            {reaction.point_1}
            <br/>
            {reaction.point_2}
            <br/>
            {reaction.point_3}
            <br/>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='blue' onClick={props.showSingleReaction} id={reaction.id} >Click To See Takeaway</Button>
          </div>
        </Card.Content>
    </Card>
      )
    })
  } else if (reactions.id) {
    return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src='/assets/images/avatar/large/steve.jpg' />
          <Card.Header>
            name of person
          </Card.Header>
          <Card.Meta>
          {reactions.point_1}
          <br/>
          {reactions.point_2}
          <br/>
          {reactions.point_3}
          <br/>
          </Card.Meta>
          <Card.Description>
            {reactions.content}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='blue' onClick={props.showAllReactions}>Go Back</Button>
          </div>
        </Card.Content>
    </Card>
    )
  } else {
    return null
  }
}


// function show_takeaway(reaction){
//   debugger
//   // props.showSingleReaction(reaction.target.id)
// }







export default ReactionDetails;
