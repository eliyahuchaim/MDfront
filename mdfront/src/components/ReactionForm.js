import React from 'react';
import { Form, Input, TextArea, Button } from 'semantic-ui-react'

const ReactionForm = (props) => {


  return (
    <form onSubmit={props.onSubmit}>
      <Form.Group widths='equal'>
        <Form.Field id='form-input-control-point_1' control={Input} label='First Point' placeholder='the topping' />
        <Form.Field id='form-input-control-point_2' control={Input} label='Second Point' placeholder='the meat' />
        <Form.Field id='form-input-control-point_3' control={Input} label='Final Point' placeholder='the sandwhich' />
      </Form.Group>
      <Form.Field id='form-textarea-control-content' control={TextArea} label='Detaild Content' placeholder='go into detail...' />
      <Form.Field id='form-button-control-public' control={Button} content='Post' />
    </form>
  )
}




export default ReactionForm;
