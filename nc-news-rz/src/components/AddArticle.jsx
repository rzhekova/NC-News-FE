import React, { Component } from "react";
import * as api from "../api";
import SelectUser from "./SelectUser";
import { Redirect } from "react-router-dom";
import PT from "prop-types";

class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: "",
    created_by: "",
    isAdded: false,
    errorCode: null
  };
  render() {
    const { topics } = this.props;
    const { topic, errorCode, isAdded, title, body } = this.state;
    if (errorCode) {
      return (
        <Redirect
          to={{ pathname: `/${errorCode}`, state: { from: "articles" } }}
        />
      );
    }
    if (isAdded) {
      return <Redirect to={`topics/${topic}/articles`} />;
    } else
      return (
        <div className="white-background">
          <form onSubmit={this.handleSubmit}>
            Title:
            <input
              onChange={event => this.handleChange(event.target.value, "title")}
              value={title}
              type="text"
            />
            Username:
            <SelectUser handleChange={this.handleChange} />
            Topic:
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
            Article:
            <textarea
              onChange={event => this.handleChange(event.target.value, "body")}
              value={body}
              type="text"
            />
            <button className="submit">Submit</button>
          </form>
        </div>
      );
  }

  handleChange = (value, key) => {
    this.setState({ [key]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, body, topic, created_by } = this.state;
    if (topic && body && title && created_by) {
      api.addArticle(topic, { title, body, created_by }).then(() => {
        this.setState({
          isAdded: true
        });
      });
      alert("Your article has been posted");
    } else {
      alert("Please fill in all the fields to post an article");
    }
  };
}

AddArticle.propTypes = {
  topics: PT.arrayOf(PT.object).isRequired
};

export default AddArticle;
