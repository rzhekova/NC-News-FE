import React, { Component } from "react";
import SelectUser from "./SelectUser";
import PT from "prop-types";

class AddComment extends Component {
  state = {
    created_by: "",
    body: ""
  };
  render() {
    return (
      <form onSubmit={this.handleAddArticle}>
        Username:
        <SelectUser handleChange={this.handleChange} />
        Comment:
        <textarea
          value={this.state.body}
          onChange={event => this.handleChange(event.target.value, "body")}
          type="text"
        />
        <button className="submit">Submit</button>
      </form>
    );
  }

  handleChange = (value, key) => {
    this.setState({ [key]: value });
  };

  handleAddArticle = event => {
    const { created_by, body } = this.state;
    this.props.handleSubmit(event, created_by, body);
    this.setState({
      created_by: "",
      body: ""
    });
  };
}

AddComment.propTypes = {
  handleSubmit: PT.func.isRequired
};

export default AddComment;
