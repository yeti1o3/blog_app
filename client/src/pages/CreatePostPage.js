import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import Reactquill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const[summery,setSummery]=useState('');
  const[content,setContent]=useState(''); 
  const[files,setFiles]=useState([]); // [file1,file2,file3]
  async function submit(e){
    e.preventDefault();
    const data=new FormData();
    data.set('title',title);
    data.set('summery',summery);
    data.set('content',content);
    data.set('files',files[0]);
    
      try {
        const response= await axios.post('http://localhost:4000/setpost',data,{headers:{
        'Content-Type':'multipart/form-data'
        },withCredentials:true})
        console.log(response.data);
      }
      catch (error){
        console.log(error);
      }}
      return(
    <div>
      <form onSubmit={submit}>
      <input 
            type="text" placeholder="Title" 
            value={title} 
            onChange={(e)=>setTitle(e.target.value)} 
      />
      <input
            type='text' placeholder='Summery' 
            value={summery} 
            onChange={(e)=>setSummery(e.target.value)}
      />
      <input 
            type='file' 
            onChange={(e)=>setFiles(e.target.files)}
      />
      <Reactquill 
            theme='snow' modules={modules} formats={formats}
            value={content} 
            onChange={setContent}
      />
      <button className='createPost'>Create Post</button>
      </form>
    </div>
      )
  
}

export default CreatePostPage
