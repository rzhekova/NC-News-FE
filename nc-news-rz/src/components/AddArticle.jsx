import React, { Component } from "react";
import * as api from "../api";
import SelectUser from "./SelectUser";
import { Redirect } from "react-router-dom";

class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: "",
    created_by: "",
    errorCode: null
  };
  render() {
    const { topics, errorCode } = this.props;
    if (errorCode) {
      return (
        <Redirect
          to={{ pathname: `/${errorCode}`, state: { from: "articles" } }}
        />
      );
    }
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
    if (topic && topic && title && created_by) {
      api.addArticle(topic, { title, body, created_by });
      this.setState({
        title: "",
        body: "",
        topic: ""
      });
    } else {
      alert("Please fill in all the fields to post an article");
    }
  };
}

export default AddArticle;
