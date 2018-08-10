import React, { Component } from "react";
import * as api from "./api";
import "./App.css";
import Home from "./components/Home";
import { Route, Switch, Link } from "react-router-dom";
import Topics from "./components/Topics";
import Articles from "./components/Articles";
import User from "./components/User";
import Error404 from "./components/Error404";
import Error400 from "./components/Error400";
import Comments from "./components/Comments";
import SingleArticle from "./components/SingleArticle";
import AddArticle from "./components/AddArticle";

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
          </button>
          <button>
            <Link to="/add-article">Add Article</Link>{" "}
          </button>{" "}
          | Topics:{" "}
          {this.state.topics.map(topic => this.createTopicsLinks(topic))}
        </nav>
        <Switch>
          <Route path="/topics/:topic" component={Topics} />
          <Route path="/users/:username" component={User} />
          <Route path="/articles/:articleId" component={SingleArticle} />
          <Route path="/:articleId/comments" component={Comments} />
          <Route path="/articles" component={Articles} />
          <Route
            path="/add-article"
            render={() => <AddArticle topics={this.state.topics} />}
          />
          <Route exact path="/" component={Home} />
          <Route path={"/400"} component={Error400} />
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
