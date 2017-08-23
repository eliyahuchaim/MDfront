import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react'
import { Form, Input, TextArea} from 'semantic-ui-react'

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
  if (reactions.reactions) {
    return reactions.reactions.map(reaction => {
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
            {(reaction.user_id === props.user_id) ? <Button basic color='blue' onClick={props.editReaction} id={reaction.id}>Edit Your Reaction</Button> : null}
          </div>

        </Card.Content>
    </Card>
      )
    })
  } else if (reactions.id) {
    if (!props.edit) {
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
    return (
      <div>
        <form onSubmit={props.updateReaction} id={reactions.id}>
          <Form.Group widths='equal'>
            <Form.Field id='form-input-control-point_1' control={Input} label='First Point' defaultValue={reactions.point_1} />
            <Form.Field id='form-input-control-point_2' control={Input} label='Second Point' defaultValue={reactions.point_2} />
            <Form.Field id='form-input-control-point_3' control={Input} label='Final Point' defaultValue={reactions.point_3} />
          </Form.Group>
          <Form.Field id='form-textarea-control-content' control={TextArea} label='Detaild Content' defaultValue={reactions.content} />
          <Form.Field id='form-button-control-public' control={Button} content='Update' />
        </form>
        <Button basic color='blue' id={reactions.id} onClick={props.deleteReaction}>Delete</Button>
      </div>
    )
  }
  } else {
    return null
  }
}


export default ReactionDetails;
