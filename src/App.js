import React, { Component } from "react";
import * as api from "./api";
import "./App.css";
import Home from "./components/Home";
import { Route, Switch, Link } from "react-router-dom";
import Topics from "./components/Topics";
import User from "./components/User";
import Error404 from "./components/Error404";
import Error400 from "./components/Error400";
import Comments from "./components/Comments";
import SingleArticle from "./components/SingleArticle";
import AddArticle from "./components/AddArticle";
import TopicLinks from "./components/TopicLinks";

class App extends Component {
  state = {
    topics: [],
    isLoading: true
  };

  render() {
    const { topics } = this.state;
    return (
      <div className="App">
        <nav className="laptop">
          <Link to="/">
            <span className="title">Northcoders NEWS </span>
          </Link>
          <section id="nav">
            <span>
              <button>
                <Link to="/add-article">Add Content</Link>
              </button>
            </span>
            {" | "}
            Topics:
            <TopicLinks
              topics={topics}
              createTopicsLinks={this.createTopicsLinks}
            />
          </section>
          <label htmlFor="show-menu" className="show-menu">
            <i className="fas fa-bars" />
          </label>
          <input type="checkbox" id="show-menu" role="button" />

          <div id="mobile">
            <br />
            <button>
              <Link to="/add-article">Add Content</Link>
            </button>
            <p style={{ textDecoration: "underline" }}>Topics:</p>
            <TopicLinks
              topics={topics}
              createTopicsLinks={this.createTopicsLinks}
            />
          </div>
        </nav>

        <Switch>
          <Route path="/topics/:topic" component={Topics} />
          <Route path="/users/:username" component={User} />
          <Route path="/articles/:articleId" component={SingleArticle} />
          <Route path="/:articleId/comments" component={Comments} />
          <Route
            path="/add-article"
            render={() => <AddArticle topics={this.state.topics} />}
          />
          <Route exact path="/" component={Home} />
          <Route path={"/400"} component={Error400} />
          <Route path="/*" component={Error404} />
        </Switch>
        <footer>
          <p>
            <i>coded by </i>
            Rosie Zhekova
          </p>
        </footer>
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
          <Link to={`/topics/${slug}/articles`}>{title.toUpperCase()}</Link>
        </button>
      </span>
    );
  };
}

export default App;
