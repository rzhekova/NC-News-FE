import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import HighestVotedArticlesList from "./HighestVotedArticlesList";
import AddArticle from "./AddArticle";
import Topics from "./Topics";
import Articles from "./Articles";
import Users from "./Users";
import ArticlesPerTopic from "./ArticlesPerTopic";

class Homepage extends Component {
  state = {
    articles: [
      { id: 1, article: "article1", votes: 11, belongs_to: "coding" },
      { id: 2, article: "article2", votes: -1, belongs_to: "coding" },
      { id: 3, article: "article3", votes: 3, belongs_to: "football" }
    ]
  };
  render() {
    return (
      <div className="App">
        <Link to="/"> Home</Link> <Link to="/articles"> Articles</Link>{" "}
        <Link to="/topics"> Topics</Link>
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
        <Route path="/topics" component={Topics} />
        <Route
          path="/articles"
          render={() => <Articles articles={this.state.articles} />}
        />
        <Route
          path="/users/:username"
          render={({ match }) => <Users username={match.params.username} />}
        />
        <Route
          path="/topics/:topic_slug/articles"
          render={({ match }) => (
            <ArticlesPerTopic
              topic={match.params.topic_slug}
              articles={this.state.articles}
            />
          )}
        />
      </div>
    );
  }
}

export default Homepage;
