import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import HighestVotedArticlesList from "./HighestVotedArticlesList";
import AddArticle from "./AddArticle";
import Topics from "./Topics";
import Articles from "./Articles";
import Users from "./Users";
import axios from "axios";
import Error404 from "./Error404";

class Home extends Component {
  state = {
    articles: [],
    topics: []
  };
  render() {
    return (
      <div className="App">
        <Link to="/"> Home</Link> <Link to="/articles"> Articles</Link>{" "}
        <Link to="/topics/coding/articles">Coding</Link>{" "}
        <Link to="/topics/football/articles">Football</Link>
        <Link to="/topics/cooking/articles">Cooking</Link>
        <Switch>
          <Route path="/topics/:topic" component={Topics} />
          <Route path="/users/:username" component={Users} />
          <Route
            path="/articles"
            render={() => <Articles articles={this.state.articles} />}
          />
          <Route
            exact
            path="/"
            render={() => (
              <main>
                <HighestVotedArticlesList articles={this.state.articles} />
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
}

export default Home;
