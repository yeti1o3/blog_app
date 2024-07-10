import axios from 'axios';
import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router'
import ColorThief from 'color-thief-browser';
import '../styles/PostDetailPage.css';
function PostDetailPage() {
    const[postDetail,setPostDetail]=useState({});
    const [color, setTitleColor] = useState('#8a2be2'); // Default purple

    useEffect(()=>{
        axios.get(`http://localhost:4000/getpost/${id}`).then((res)=>{
            setPostDetail(res.data);
        }).catch((error)=>{
            console.error('Error fetching post',error);
        })
    },[])
    const{title,summery,image,content,createdAt,author}=postDetail;
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = image;
        
        img.onload = () => {
          const colorThief = new ColorThief();
          const color = colorThief.getColor(img);
          setTitleColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        };
      }, [image]);
    
    const{id}= useParams();
  return (
    <div className="DetailPage">
    <div className='DetailPage_Image'>
      <img src={image} alt='not found'></img>
    </div>
    <h1 className='DetailPage_h1' style={{color}}>{title}</h1>
    <p className='DetailPage_summary'>{summery}</p>
    <div className='DetailPage_content' dangerouslySetInnerHTML={{ __html: content }} />
  </div>
  )
}

export default PostDetailPage
