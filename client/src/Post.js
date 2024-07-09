import React from 'react'
function Post() {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://gratisography.com/wp-content/uploads/2024/03/gratisography-vr-glasses-800x525.jpg"
          alt="not found"
        ></img>
      </div>
      <div className="text">
        <h2>Choose a CMS and set up your blog.</h2>
        <p className="info">
          <a className="author"> sanskar sharma</a>
          <time>04-06-2003</time>
        </p>
        <p className="summery">
          A CMS (content management system) is a software application that
          allows users to build and maintain a website without having to code it
          from scratch. CMS platforms can manage domains (where you create your
          website) and subdomains (where you create a webpage that connects to
          an existing website).
        </p>
      </div>
    </div>
  );
}

export default Post