import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class Article extends React.Component {

  constructor(){
    super()

    this.state = {
      articles: []
    }
  }

  componentDidMount(){
    fetch('https://newsapi.org/v1/articles?source=the-economist&sortBy=top&apiKey=698b68b4508443aebc50059616294ee2')
    .then(resp => resp.json())
    .then(data => this.setState({
      articles: [...this.state.articles, ...data.articles]
    }))
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
