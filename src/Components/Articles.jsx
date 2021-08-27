import React, { Component } from "react";
import { articlesURL } from "./utils/constant";
import Posts from "./Posts";
import Loader from "./Loader";
import FeedNav from "./FeedNav";

function Articles(props) {
  console.log(props);

  if (props.error) {
    return <p>{props.error}</p>;
  }
  if (!props.data) {
    return <Loader />;
  }

  if (articlesURL.length < 1) {
    return <h2>No Articles Found!</h2>;
  }
  return (
    <div className="flex-60">
      <div>
        <FeedNav activeTab={props.activeTab} removeTab={props.removeTab} />
      </div>
      <div>
        {props.data &&
          props.data.map((article) => {
            return (
              <>
                <Posts {...article} />
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Articles;
