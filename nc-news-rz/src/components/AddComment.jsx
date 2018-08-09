import React, { Component } from "react";
import * as api from "../api";

class AddComment extends Component {
  state = {
    created_by: "",
    body: ""
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select onChange={this.handleSelect}>
          <option>Choose a username</option>
          <option value="5b6c9b8531e69542532c5b0a">jessjelly</option>
          <option value="5b6c9b8531e69542532c5b07">happyamy2016</option>
          <option value="5b6c9b8531e69542532c5b06">grumpy19</option>
          <option value="5b6c9b8531e69542532c5b08">cooljmessy</option>
          <option value="5b6c9b8531e69542532c5b09">weegembump</option>
          <option value="5b6c9b8531e69542532c5b05">tickle122</option>
        </select>
        <input
          value={this.state.body}
          onChange={this.handleInputChange}
          className="addComment"
          type="text"
          placeholder="add a comment"
        />
      </form>
    );
  }

  handleSelect = event => {
    this.setState({ created_by: event.target.value });
  };

  handleInputChange = event => {
    this.setState({ body: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.body && this.state.created_by) {
      api.addComment(this.props.articleId, this.state);
      this.setState({
        created_by: "",
        body: ""
      });
    }
  };
}

export default AddComment;
