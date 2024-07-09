import axios from 'axios';
import React ,{useState}from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
function LoginPage() {
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const[isredirect,setRedirect]=useState(false);
  const{setUserInfo}=useContext(UserContext);
  function Login(e) {
    e.preventDefault(); 
    
    axios.post('http://localhost:4000/login', {
      username,
    password
    },{withCredentials:true}).then(response => {
      if(response.data==='ok')
      {
        setRedirect(true);
        setUserInfo({username});

      }
      else
      {
        alert('Invalid username or password');
      }
    }).catch(error => {
      console.error("Error occurred:", error);
    })}
  if(isredirect)
  {
    return <Navigate to={'/'}/>
  }
  return (
    <form className='login' onSubmit={Login}>
        <h1>Login </h1>
        <input type='text' placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
        <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
        <button>Login</button>
    </form>
  )
}

export default LoginPage;