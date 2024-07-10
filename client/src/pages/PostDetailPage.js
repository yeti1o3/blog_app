import axios from 'axios';
import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router'

function PostDetailPage() {
    const[postDetail,setPostDetail]=useState({});
    
    useEffect(()=>{
        axios.get(`http://localhost:4000/getpost/${id}`).then((res)=>{
            setPostDetail(res.data);
        }).catch((error)=>{
            console.error('Error fetching post',error);
        })
    },[])
    console.log(postDetail);
    const{title,summery,image,content,createdAt,author}=postDetail;
    const{id}= useParams();
  return (
    <div>
        <div>
            <img src={image} alt='not found'></img>
        </div>
        <h2>{title}</h2>
        <p>{summery}</p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default PostDetailPage
