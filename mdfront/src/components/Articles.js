import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

let articlesToSendToBackend = [];
let data;

class Article extends React.Component {

  constructor(){
    super()

    this.state = {
      articles: [],
      articlesFromBackEnd: []
    }
  }

  // get articles, set state, and send articles to back end.
  componentDidMount(){
    fetch('https://newsapi.org/v1/articles?source=the-economist&sortBy=top&apiKey=698b68b4508443aebc50059616294ee2')
    .then(resp => resp.json())
    .then(data => this.setState({
      articles: [...this.state.articles, ...data.articles]
    }))
    .then( () => {
      articlesToSendToBackend = this.state.articles.map((article) => {
        return {
          title: article.title,
          content: article.description,
          image: article.urlToImage
        }
      })
      this.sendArticlesToBackend(articlesToSendToBackend)
    })
  }

  sendArticlesToBackend = (articles) => {
    let data = JSON.stringify({articles: articles})
    debugger
    fetch(`http://localhost:3000/api/v1/articles`, {
      headers: {
      'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.F78CECWXR11i61vE8J6mrE3pSdGjTaRySi7onU00QpQ",
      'accept': 'application/json',
      'content-Type': 'application/json'
       },
      method: 'POST',
      body: data
    })
    .then(resp => resp.json())
    .then(resp => this.setState({
      articlesFromBackEnd: [...this.state.articlesFromBackEnd, ...resp]
    },()=>{console.log(resp)}))
  }

  render(){
    let articles;
    if (this.state.articles.length) {
      articles = this.state.articles.map((article, index) =>
        <Card key={index}>
          <Image src={ article.urlToImage } />
          <Card.Content>
            <Card.Header>
              {article.title}
            </Card.Header>
            <Card.Description>
              { article.description }
            </Card.Description>
            <Card.Meta>
              <span className='date' style={{float:'right'}}>
                <a href={ article.urlToImage }>Head to Article!</a>
              </span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              See Reactions
            </a>
          </Card.Content>
        </Card>
      );
    } else {
    articles = <h1>Working</h1>;
  }
    return (
      <Card.Group>
        {articles}
      </Card.Group>

    )
  }
};

export default Article;
