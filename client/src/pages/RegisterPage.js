import React, { useState } from 'react'
import axios from 'axios';
function RegisterPage() {
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const[fullname,setFullname]=useState('');
  const[email,setEmail]=useState('');
async function register(e) {
  e.preventDefault(); // Prevent default form submission
  try {
    const response = await axios.post('http://localhost:4000/register', {
      fullname:fullname,
      username: username,
      email:email,
      password: password,

    })
    console.log(response.data); // Log the response data
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text" placeholder="fullname"
      value={fullname} 
      onChange={e=>setFullname(e.target.value)}/>
      <input type="text" placeholder="username" 
      value={username}
      onChange={e=>setUsername(e.target.value)}/>
      <input type='email' placeholder='email'
      value={email}
      onChange={e=>setEmail(e.target.value)}/> 
      <input type="password" placeholder="password" 
      value={password}
      onChange={e=>setPassword(e.target.value)}/>
      <button>Register</button>
    </form>
  );
}

export default RegisterPage