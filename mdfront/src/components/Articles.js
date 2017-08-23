import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import ArticleDetails from './ArticleDetails';

let articlesToSendToBackend = [];
let data;
const URL = 'http://localhost:3000/api/v1'

class Article extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      newArticles: [],
      articlesFromBackEnd: [],
      featuredArticles: [],
      showSingleArticle: false,
      singleArticle: [],
      userId: ""
    }
  }

    componentWillReceiveProps(nextProps){
      if (nextProps.userId !== this.props.userId) {
        this.setState({
          userId: nextProps.userId
        })
      }
    }

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
    let data = JSON.stringify({articles: articles})
    fetch(`http://localhost:3000/api/v1/articles`, {
      headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'accept': 'application/json',
      'content-Type': 'application/json'
       },
      method: 'POST',
      body: data
    })
    .then(resp => resp.json())
    .then(resp => this.setState({
      articlesFromBackEnd: [...this.state.articlesFromBackEnd, ...resp]
    }))
  }

  //this should then take us to another component...ArticleDetails, with a prop of articleId.
  renderArticleDetail = (e) => {
    const ID = parseInt(e.target.getAttribute("value"))
    const Article = this.state.featuredArticles.find(article => {
      return article.id === ID
    })
    this.updateArticleViews(ID)
    this.setState({
      showSingleArticle: true,
      singleArticle: Article
    })
  }

  updateArticleViews = (ID) => {
    fetch(`${URL}/articles/${ID}`, {
      headers: {
      'accept': 'application/json',
      'content-Type': 'application/json'
       },
      method: 'PATCH'
    })
    .then(resp => resp.json())
    .then( () => {
      fetch(`http://localhost:3000/api/v1/articles`)
      .then(resp => resp.json())
      .then(data => this.setState({
        featuredArticles: data
      }))
    })
  }

  renderAllArticles = () => {
    this.setState({
      showSingleArticle: false
    })
  }

  render(){
    console.log("article", this.state.userId)
    let articles;
    if (this.state.featuredArticles.length && this.state.showSingleArticle === false) {
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
    } else if (this.state.showSingleArticle === true) {
    articles = <ArticleDetails article={this.state.singleArticle} goBack={this.renderAllArticles} user_id={this.state.userId} />
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
