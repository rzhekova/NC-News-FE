import React, { Component } from "react";
import * as api from "../api";
import SelectUser from "./SelectUser";

class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: "",
    created_by: ""
  };
  render() {
    const { topics } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        Title:
        <input
          onChange={event => this.handleChange(event.target.value, "title")}
          value={this.state.title}
          type="text"
        />
        Article:
        <textarea
          onChange={event => this.handleChange(event.target.value, "body")}
          value={this.state.body}
          type="text"
        />
        <SelectUser func={this.handleChange} />
        <select
          onChange={event => this.handleChange(event.target.value, "topic")}
        >
          <option>Choose a topic</option>
          {topics.map(topic => {
            return (
              <option key={topic._id} value={topic.slug}>
                {topic.title}
              </option>
            );
          })}
        </select>
        <button>Submit</button>
      </form>
    );
  }

  handleChange = (value, key) => {
    this.setState({ [key]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, body, topic, created_by } = this.state;
    if (title && body && topic) {
      const articleObject = { title, body, created_by };
      api.addArticle(topic, articleObject);
      this.setState({
        title: "",
        body: "",
        topic: ""
      });
    }
  };
}

export default AddArticle;
