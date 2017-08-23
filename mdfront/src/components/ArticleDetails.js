import React from 'react';
import Reactions from './Reactions'
import { Card, Icon, Image } from 'semantic-ui-react';


const ArticleDetails = (props) => {
return (
  <div>
    <Card>
      <Image src={ props.article.image } />
      <Card.Content>
        <Card.Header>
          {props.article.title}
        </Card.Header>
        <Card.Description>
          { props.article.content }
        </Card.Description>
        <Card.Meta>
          <span className='date' style={{float:'right'}}>
            <a href={ props.article.url } target="_blank">Read the Article!</a>
          </span>
        </Card.Meta>
      </Card.Content>
      <button onClick={props.goBack}>
      Go Back
      </button>
    </Card>
    < Reactions article_id={props.article.id} user_id={props.user_id}/>
  </div>
)

}


export default ArticleDetails;
