import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import {useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './context/UserContext';

function Header() {
  const {userInfo,setUserInfo}=useContext(UserContext);
  useEffect(()=>{
    axios.get('http://localhost:4000/profile',{withCredentials:true}).then(response=>{
      setUserInfo(response.data);
    } ).catch(error=>{
      console.error("Error occurred:",error);
    })
  },[])

  function logout() {
    axios.post('http://localhost:4000/logout', {}, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        setUserInfo(null);
      })
      .catch(error => {
        console.error("Error occurred:", error);
      });
  }

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      {userInfo&&<nav>
        <Link to="/create">Create</Link>
        <Link to="/" onClick={logout}>Logout</Link>
      </nav>}
      {!userInfo && <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>}
      
    </header>
  );
}

export default Header