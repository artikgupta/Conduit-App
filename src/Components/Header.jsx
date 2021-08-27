import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <div className="flex-box">
          <div>
            <h1 className="brand">conduit</h1>
          </div>
          <nav>
            {this.props.isLoggedIn ? <AuthHeader /> : <NonAuthHeader />}
          </nav>
        </div>
      </div>
    );
  }
}

function NonAuthHeader() {
  return (
    <div>
      <ul className="flex-box">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signin">SignIn</Link>
        </li>
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
      </ul>
    </div>
  );
}

// export default NonAuthHeader

function AuthHeader() {
  return (
    <div>
      <ul className="flex-box">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/new-post">New Article</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
}
