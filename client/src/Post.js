import React from 'react'
import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'
function Post({post}) {
  console.log(post);
  const{title,summery,image,createdAt,author}=post;
  return (
    
    <div className="post">

      <div className="image">
      <img src={image} alt={title} />
      </div>
      <div className="text">
        <Link to={`/post/${post._id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author"> {author.fullname}</a>
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