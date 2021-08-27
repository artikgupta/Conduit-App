import React from "react";

function ProfileBanner(props) {
  let { image, username } = props.user;
  return (
    <div>
      <img src={image || "/images/smiley.jpg"} />
      <h1 className>{username}</h1>
      <p>
        +Follow <span>{username}</span>
      </p>
    </div>
  );
}

export default ProfileBanner;
