import React, { Component } from "react";
import * as api from "./api";
import "./App.css";
import Home from "./components/Home";
import { Route, Switch, Link } from "react-router-dom";
import Topics from "./components/Topics";
import Articles from "./components/Articles";
import Users from "./components/Users";
import Error404 from "./components/Error404";
import Comments from "./components/Comments";
import SingleArticle from "./components/SingleArticle";

class App extends Component {
  state = {
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
          <Route path="/articles" component={Articles} />
          <Route path="/:articleId/comments" component={Comments} />
          <Route exact path="/" component={Home} />
          <Route path="/*" component={Error404} />
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    api.fetchAllTopics().then(topics => {
      this.setState({ topics });
    });
  }

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

export default App;
