import React, { Component } from "react";
import * as api from "../api";

class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    topicId: ""
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Title:
        <input
          onChange={this.handleInputChange}
          value={this.state.title}
          type="text"
        />
        Article:
        <textarea
          onChange={this.handleBodyChange}
          value={this.state.body}
          type="text"
        />
        <select onChange={this.handleSelect}>
          <option>Choose a topic</option>
          <option value="5b548c607eb1610ea6bf3fcb">Coding</option>
          <option value="5b548c607eb1610ea6bf3fcc">Football</option>
          <option value="5b548c607eb1610ea6bf3fcd">Cooking</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  }

  handleInputChange = event => {
    this.setState({ title: event.target.value });
  };

  handleBodyChange = event => {
    this.setState({ body: event.target.value });
  };

  handleSelect = event => {
    this.setState({ topicId: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, body, topicId } = this.state;
    if (title && body && topicId) {
      const articleObject = { title, body };
      api.addArticle(topicId, articleObject);
      this.setState({
        title: "",
        body: "",
        topicId: ""
      });
    }
  };
}

export default AddArticle;
