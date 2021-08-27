import React from "react";
import { ROOT_URL } from "./utils/constant";

class PostComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
    fetch(ROOT_URL + `/articles/${this.props.slug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        comment: {
          ...this.state,
        },
      }),
    }).then((res) => {
      this.props.fetchComment();
      this.setState({
        body: "",
      });
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      body: e.target.value,
    });
  };

  render() {
    console.log(this.props.user);
    return (
      <div className="container">
        <div className="comments">
          <h4 className="py-2 text-green-500">Add Comment:</h4>
          <form onSubmit={this.submitHandler}>
            <input
              className="py-2"
              type="text"
              name="body"
              value={this.state.body}
              onChange={this.onChangeHandler}
            />
            <input type="submit" className="py-2" />
          </form>
        </div>
      </div>
    );
  }
}

export default PostComment;
