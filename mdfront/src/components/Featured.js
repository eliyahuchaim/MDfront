import React from 'react';
import {Card, Image } from 'semantic-ui-react'

const Featured = (props) => {

  const displayWinners = () => {

    let formatedData = props.completedArticles.map((article)=>{
      let winningReaction=article.reactions.sort((a, b)=>{
        return (a.intial_score > b.initial_score) ? 1 : (b.initial_score > a.initial_score) ? -1 : 0;
      })[0]// reactions sort
      return({article:article, reaction:winningReaction})
    })// articles map
    return(
      formatedData.filter((article)=>{
        return article.reaction
      }).map((article_data)=>{
        return <Card>
          <Card.Content>
            <Image floated='right' size='mini' src='/assets/images/avatar/large/steve.jpg' />
            <Card.Header>
              {article_data.reaction.user.name}
            </Card.Header>
            <Card.Description>
            <Card.Meta>
              {article_data.article.title}
            </Card.Meta>
              {article_data.reaction.point_1}
              <br/>
              {article_data.reaction.point_2}
              <br/>
              {article_data.reaction.point_3}
              <br/>
              {article_data.reaction.content}
            </Card.Description>
          </Card.Content>
        </Card>
      })//formatData map
    )
  }

  return(
    <div>
      {displayWinners()}
    </div>
  )
}

export default Featured;
