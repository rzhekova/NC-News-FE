import React, { Component } from "react";
import List from "./List";
import { Route, Link } from "react-router-dom";

class Topics extends Component {
  state = {
    topics: [{ id: 1, topic_slug: "coding" }, { id: 2, topic_slug: "football" }]
  };
  render() {
    const { topics } = this.state;
    return (
      <main>
        <header>
          <h2>Topics</h2>
        </header>
        {topics.map(topic => {
          return (
            <Link to={`/topics/${topic.topic_slug}/articles`}>
              <p>{topic.topic_slug}</p>
            </Link>
          );
        })}
      </main>
    );
  }
}

export default Topics;
