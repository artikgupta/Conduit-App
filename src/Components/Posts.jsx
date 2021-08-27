import React from "react";
import { Link } from "react-router-dom";

function Posts(props) {
  console.log(props);
  return (
    <div>
      <div>
        <div className="flex justify-between bg-gray-100 p-4 my-2  rounded-sm">
          <div className="col-1">
            <div className="flex my-2">
              <span className="image">
                <img src={props.author.image} alt="" />
              </span>
              <div className="mx-2">
                <Link to="/">
                  <h3> {props.author.username}</h3>
                </Link>
                <Link to="">
                  <date>{props.createdAt}</date>
                </Link>
              </div>
            </div>
            <Link to={`/article/${props.slug}`}>
              <h1 className="text-blue-600 capitalize text-xl">
                {props.title}
              </h1>
            </Link>
            <Link to={`/article/${props.slug}`}>
              <p>{props.description.slice(0, 150) + "..."}</p>
            </Link>
            <Link
              to={`/article/${props.slug}`}
              className="bg-blue-400 p-2 my-2 inline-block"
            >
              Read More
            </Link>
          </div>
          <div className="like-btn">
            <span>&hearts;</span>
            <span>{props.favoritesCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
