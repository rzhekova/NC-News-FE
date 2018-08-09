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
          <option value="5b548c607eb1610ea6bf3fd3">jessjelly</option>
          <option value="5b548c607eb1610ea6bf3fd0">happyamy2016</option>
          <option value="5b548c607eb1610ea6bf3fcf">grumpy19</option>
          <option value="5b548c607eb1610ea6bf3fd1">cooljmessy</option>
          <option value="5b548c607eb1610ea6bf3fd2">weegembump</option>
          <option value="5b548c607eb1610ea6bf3fce">tickle122</option>
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
