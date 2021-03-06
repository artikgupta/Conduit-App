import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./Components/Header";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Home from "./Components/Home";
import SingleArticle from "./Components/SingleArticle";
import FullPageSpinner from "./Components/FullPageSpinner";
import NoMatch from "./Components/NoMatch";
import { localStorageKey } from "./Components/utils/constant";
import { userVerifyURL } from "./Components/utils/constant";
import NewPosts from "./Components/NewPosts";
import Settings from "./Components/Settings";
import Profile from "./Components/Profile";
import Logout from "./Components/Logout";
import Loader from "./Components/Loader";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null,
      isVerifying: true,
    };
  }

  componentDidMount() {
    let storageKey = localStorage[localStorageKey]; // token undefined || "afdhfjds"
    if (storageKey) {
      fetch(userVerifyURL, {
        method: "GET",
        headers: {
          authorization: ` Token ${storageKey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => this.updateUser(user))
        .catch((errors) => console.log(errors));
    } else {
      this.setState({
        isVerifying: false,
      });
    }
  }

  updateUser = (user) => {
    console.log(user);
    this.setState({ isLoggedIn: true, user, isVerifying: false });
    localStorage.setItem(localStorageKey, user.token);
  };

  render() {
    if (this.state.isVerifying) {
      return <FullPageSpinner />;
    }
    return (
      <div>
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp
            user={this.state.user}
            setState={(state) => this.setState(state)}
          />
        ) : (
          <UnauthenticatedApp
            updateUser={this.updateUser}
            user={this.state.user}
          />
        )}
      </div>
    );
  }
}

function AuthenticatedApp(props) {
  // console.log(props, "sdsdfs");
  if (!props.user) {
    return <Loader />;
  }
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/new-post">
          <NewPosts user={props.user} />
        </Route>
        <Route path="/settings">
          <Settings currentUser={props.user} />
        </Route>
        <Route path="/profile/:username">
          <Profile currentUser={props.user} />
        </Route>
        <Route path="/profile">
          <Profile currentUser={props.user} />
        </Route>
        <Route
          path="/article/:slug"
          component={() => <SingleArticle user={props.user} />}
        />
        <Route
          path="/logout"
          component={(defaultProps) => (
            <Logout
              {...defaultProps}
              user={props.user}
              setUser={(user) => props.setState({ user })}
              setIsLoggedIn={(isLoggedIn) => props.setState({ isLoggedIn })}
            />
          )}
        ></Route>
        <Route path="/signin">
          <Redirect to="/" />
        </Route>
        <Route path="/signup">
          <Redirect to="/" />
        </Route>
        <Route path="*" component={NoMatch} />
      </Switch>
    </div>
  );
}

function UnauthenticatedApp(props) {
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin">
          <SignIn updateUser={props.updateUser} />
        </Route>
        <Route path="/signup">
          <SignUp updateUser={props.updateUser} />
        </Route>
        <Route path="/article/:slug">
          <SingleArticle user={props.user} />
        </Route>
        <Route path="*" component={NoMatch} />
      </Switch>
    </div>
  );
}

export default App;
