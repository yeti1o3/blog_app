import React from 'react'
import {formatISO9075} from 'date-fns'
function Post({post}) {
  console.log(post);
  const{title,summery,image,createdAt}=post;
  return (
    <div className="post">
      <div className="image">
        <img
          src={image}
          alt="not found"
        ></img>
      </div>
      <div className="text">
        <h2>{title}</h2>
        <p className="info">
          <a className="author"> sanskar sharma</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summery">
          {summery}
        </p>
      </div>
    </div>
  );
}

export default Post