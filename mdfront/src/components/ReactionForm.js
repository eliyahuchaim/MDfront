import React from 'react';

const ReactionForm = (props) => {


  return (
    <form onSubmit={props.onSubmit}>
      <input type="text" name="reaction[point_1]" placeholder="point_1" />
      <input type="text" name="reaction[point_2]" placeholder="point_2"/>
      <input type="text" name="reaction[point_3]" placeholder="point_3"/>
      <input type="text" name="reaction[content]" placeholder="content"/>
      <input type="text" name="reaction[article_id]" placeholder="article_id"/>
      <input type="submit" />
    </form>
  )
}

export default ReactionForm;
