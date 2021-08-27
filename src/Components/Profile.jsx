import React, { Component } from "react";

import ProfileBanner from "./ProfileBanner";

import Posts from "./Posts";

import Pagination from "./Pagination";

import { articlesURL } from "./utils/constant";

import Loader from "./Loader";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "author",
      articles: [],
    };
  }

  fetchData = () => {
    fetch(articlesURL + `/?${this.state.activeTab}=${this.props.user.username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot fetch data for specific user");
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
        });
      })
      .catch((err) => {
        this.setState({
          error: "Unable to fetch articles!",
        });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  handleActive = (label) => {
    this.setState({ activeTab: label }, () => {
      this.fetchData();
    });
  };

  render() {
    const { activeTab } = this.state;
    const { user } = this.props;
    if (!user) {
      return <Loader />;
    }

    return (
      <div>
        <ProfileBanner user={user} />
        <button
          className={activeTab === "author" && "active"}
          onClick={() => this.handleActive("author")}
        >
          My Articles
        </button>
        <button
          className={activeTab === "favorited" && "active"}
          onClick={() => this.handleActive("favorited")}
        >
          Favorited Articles
        </button>
        {this.state.articles.map((article) => (
          <Posts articles={article} />
        ))}

        <Pagination />
      </div>
    );
  }
}

export default Profile;
