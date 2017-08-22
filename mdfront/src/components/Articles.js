import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

let articlesToSendToBackend = [];
let data;

class Article extends React.Component {

  constructor(){
    super()

    this.state = {
      newArticles: [],
      articlesFromBackEnd: [],
      featuredArticles: []
    }
  }

  // go get me some new articles and add them to what we have in articles
  componentDidMount(){
    fetch('https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=698b68b4508443aebc50059616294ee2')
    .then(resp => resp.json())
    .then(data => this.setState({
      newArticles: [...this.state.newArticles, ...data.articles]
    }))
    .then( () => {
      articlesToSendToBackend = this.state.newArticles.map((article) => {
        return {
          title: article.title,
          content: article.description,
          image: article.urlToImage,
          url: article.url
        }
      })
      this.sendArticlesToBackend(articlesToSendToBackend)
    })
    .then( () => {
      fetch(`http://localhost:3000/api/v1/articles`)
      .then(resp => resp.json())
      .then(data => this.setState({
        featuredArticles: [...this.state.featuredArticles, ...data]
      }))
    })
  }

  // send them to the back end and bring them back to update state.
  sendArticlesToBackend = (articles) => {
    articles.forEach((article) => {
      data = JSON.stringify(article)
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
        articlesFromBackEnd: [...this.state.articlesFromBackEnd, resp]
      }))
    })
  }

  //this should then take us to another component...ArticleDetails, with a prop of articleId.
  renderArticleDetail = (e) => {
    console.log(e.target.getAttribute('value'))
  }

  render(){
    let articles;
    if (this.state.featuredArticles.length) {
      articles = this.state.featuredArticles.map((article, index) =>
        <Card key={index}>
          <Image src={ article.image } />
          <Card.Content>
            <Card.Header>
              {article.title}
            </Card.Header>
            <Card.Description>
              { article.content }
            </Card.Description>
            <Card.Meta>
              <span className='date' style={{float:'right'}}>
                <a href={ article.url } target="_blank">Read the Article!</a>
              </span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <a onClick={ this.renderArticleDetail } value={ article.id }>
              <Icon name='user' />
              Head to the Discussion!
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
