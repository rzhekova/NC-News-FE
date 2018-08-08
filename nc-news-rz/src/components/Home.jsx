import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import MostPopularArticlesList from "./MostPopularArticlesList";
import AddArticle from "./AddArticle";
import Topics from "./Topics";
import Articles from "./Articles";
import Users from "./Users";
import axios from "axios";
import Error404 from "./Error404";
import Comments from "./Comments";
import SingleArticle from "./SingleArticle";
class Home extends Component {
  state = {
    articles: [],
    topics: []
  };
  render() {
    return (
      <div className="App">
        <nav>
          <button>
            <Link to="/"> Home</Link>
          </button>
          <button>
            <Link to="/articles">Articles</Link>{" "}
          </button>{" "}
          / Topics:{" "}
          {[...this.state.topics].map(topic => this.createTopicsLinks(topic))}
        </nav>
        <Switch>
          <Route path="/topics/:topic" component={Topics} />
          <Route path="/users/:username" component={Users} />
          <Route path="/articles/:articleId" component={SingleArticle} />
          <Route
            path="/articles"
            render={() => <Articles articles={[...this.state.articles]} />}
          />
          <Route path="/:articleId/comments" component={Comments} />
          <Route
            exact
            path="/"
            render={() => (
              <main>
                <MostPopularArticlesList
                  articles={[...this.state.articles]}
                  func={this.formatPopularArticles}
                />
                <AddArticle />
              </main>
            )}
          />
          <Route path="/*" component={Error404} />
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    this.fetchAllArticles().then(articles => {
      this.setState({ articles });
    });
    this.fetchAllTopics().then(topics => {
      this.setState({ topics });
    });
  }

  fetchAllArticles = () => {
    return axios
      .get("https://rosies-ncnews.herokuapp.com/api/articles")
      .then(({ data }) => {
        return data.articles;
      });
  };

  fetchAllTopics = () => {
    return axios
      .get("https://rosies-ncnews.herokuapp.com/api/topics")
      .then(({ data }) => {
        return data.topics;
      });
  };

  formatPopularArticles = articleObject => {
    return articleObject.comments > 10 && articleObject.title;
  };

  createTopicsLinks = topicsObject => {
    const { slug, title } = topicsObject;
    return (
      <span key={topicsObject._id}>
        <button>
          <Link to={`/topics/${slug}/articles`}>{title}</Link>
        </button>
      </span>
    );
  };
}

export default Home;
