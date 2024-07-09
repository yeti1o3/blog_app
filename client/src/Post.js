import React from 'react'
function Post({post}) {
  console.log(post);
  const{title,summery,image}=post;
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
          <time>04-06-2003</time>
        </p>
        <p className="summery">
          {summery}
        </p>
      </div>
    </div>
  );
}

export default Post