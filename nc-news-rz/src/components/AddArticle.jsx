import React, { Component } from "react";
import * as api from "../api";

class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: "",
    created_by: ""
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
        <select onChange={this.handleSelectUser}>
          <option>Choose a username</option>
          <option value="5b6c9b8531e69542532c5b0a">jessjelly</option>
          <option value="5b6c9b8531e69542532c5b07">happyamy2016</option>
          <option value="5b6c9b8531e69542532c5b06">grumpy19</option>
          <option value="5b6c9b8531e69542532c5b08">cooljmessy</option>
          <option value="5b6c9b8531e69542532c5b09">weegembump</option>
          <option value="5b6c9b8531e69542532c5b05">tickle122</option>
        </select>
        <select onChange={this.handleSelect}>
          <option>Choose a topic</option>
          <option value="coding">Coding</option>
          <option value="football">Football</option>
          <option value="cooking">Cooking</option>
        </select>
        <button>Submit</button>
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
    this.setState({ topic: event.target.value });
  };
  handleSelectUser = event => {
    this.setState({ created_by: event.target.value });
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
