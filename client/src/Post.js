import React,{useEffect,useState} from 'react'
import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'
import './styles/PostPage.css';
import ColorThief from 'color-thief-browser';
function Post({post}) {
  const [backgroundColor, setBackgroundColor] = useState('#8a2be2'); // Default purple
  const { title, summery, image, createdAt, author } = post;

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = image;
    
    img.onload = () => {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img);
      setBackgroundColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    };
  }, [image]);
  return (
    <div className="post" style={{backgroundColor}}>
      
    <div className="image">
    <Link to={`/post/${post._id}`}>
      <img src={image} alt={title} />
      </Link>
    </div>
    
    <div className="text">
      <div>
        <Link to={`/post/${post._id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <span className="author">{author.fullname}</span>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
      </div>
      <p className="summary">{summery}</p>
    </div>
  </div>
  );
}

export default Post