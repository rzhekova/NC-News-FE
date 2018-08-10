import React, { Component } from "react";
import * as api from "../api";
import SelectUser from "./SelectUser";

class AddComment extends Component {
  state = {
    created_by: "",
    body: ""
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <SelectUser func={this.handleChange} />
        <input
          value={this.state.body}
          onChange={event => this.handleChange(event.target.value, "body")}
          className="addComment"
          type="text"
          placeholder="add a comment"
        />
      </form>
    );
  }

  handleChange = (value, key) => {
    this.setState({ [key]: value });
  };

  handleSelect = event => {
    this.setState({ created_by: event.target.value });
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
