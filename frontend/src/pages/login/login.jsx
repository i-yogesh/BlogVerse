import React, { useContext, useRef, useState } from 'react'
import "./login.css"
import {Link} from "react-router-dom"
import { Context } from '../../Context/Context';
import axios from "axios"
const Login = () => {
  const userRef=useRef();
  const passwordRef=useRef();
  const [error,setError]=useState(false);
  const {dispatch,isFetching}=useContext(Context)
  const handleSubmit=async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"})
    try {
      const res=await axios.post("/auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value
      })
      dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    } catch (err) {
      setError(true);
      dispatch({type:"LOGIN_FAILURE"})
    }
  }
  return (
    <div className="login">
    <span className="logintitle">Login</span>
        <form className="loginform" onSubmit={handleSubmit}>
            <label >Username</label>
            <input  className='logininput' type="text" placeholder='Enter your Username' ref={userRef} />
            <label >Password</label>
            <input className='logininput' type="Password" placeholder='Enter your Password' ref={passwordRef}/>
            <button className="loginbtn" type='submit' disabled={isFetching}>Login</button>
            <span className="loginregbtn"><Link className='link' to="/register">New User ? Register</Link></span>
        </form>
        {error && <span className="Error">Wrong Credentials!</span> }
        
    </div>
  )
}

export default Login