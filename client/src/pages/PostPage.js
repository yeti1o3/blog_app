import React, { useContext, useEffect } from 'react'
import Post from '../Post'
import axios from 'axios';
import { PostContext } from '../context/PostContext';

function PostPage() {
  const {postInfo,setPostInfo} = useContext(PostContext);
  useEffect(() => {
    axios.get('http://localhost:4000/getpost').then((response) => {
      setPostInfo(response.data);
    }).catch((error) => {
      console.log(error);
    });
  },[]);
 
  return (
    <div>
      {postInfo ? postInfo.map((post) => <Post key={post._id} post={post} />) : <div>Not found</div>}
    </div>
  );
}

export default PostPage