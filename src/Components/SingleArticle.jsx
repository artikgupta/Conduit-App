import React, { Component } from "react";
import Loader from "./Loader";
import { Link, withRouter } from "react-router-dom";
import { articlesURL } from "./utils/constant";
import CommentBox from "./CommentBox";

class SingleArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      error: "",
    };
  }

  fetchComment = () => {
    let slug = this.props.match.params.slug;

    fetch(articlesURL + "/" + slug)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          article: data.article,
        });
      })
      .catch((err) => {
        this.setState({
          error: "Unable to fetch articles!",
        });
      });
  };

  componentDidMount() {
    this.fetchComment();
  }

  render() {
    console.log(this.props.user, "user");
    const { article, error } = this.state;
    console.log(article, "article");
    if (error) {
      return <p>{error}</p>;
    }
    if (!article) {
      return <Loader />;
    }
    return (
      <div>
        <div className="container">
          <div className="flex">
            <span className="">
              <h1 className="text-red">{article.title}</h1>
              <img src={article.author.image} alt="" className="image" />
            </span>
            <div>
              <Link to="/">
                <h3> {article.author.username}</h3>
              </Link>
              <Link to="">
                <date>{article.createdAt}</date>
              </Link>
            </div>
          </div>
          <p>{article.description}</p>
        </div>
        <div>
          <CommentBox
            slug={this.props.match.params.slug}
            user={this.props.user}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(SingleArticle);
