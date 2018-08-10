import React, { Component } from "react";
import SelectUser from "./SelectUser";

class AddComment extends Component {
  state = {
    created_by: "",
    body: ""
  };
  render() {
    return (
      <form
        onSubmit={event =>
          this.props.handleSubmit(event, this.state.created_by, this.state.body)
        }
      >
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
}

export default AddComment;
