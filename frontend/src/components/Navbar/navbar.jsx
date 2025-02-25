import React, { useContext, useEffect} from 'react'
import {
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import "./navbar.css"
import {Link} from "react-router-dom"
import Home from '../../pages/home/home';
import { Context } from '../../Context/Context';

const Navbar = () => {
  const {user,dispatch}=useContext(Context);
  const PF = "http://localhost:5000/images/"
  const handleLogout= ()=>{
      dispatch({type:"LOGOUT"});
      window.location.replace("/login");
  }
  return (
    <div className='navbar'>
        <div className="navleft">
        <a href="https://www.linkedin.com/in/marvelous-one/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="nav-icon" />
          </a>
          <a href="https://github.com/i-yogesh" target="_blank" rel="noopener noreferrer">
              <FaGithub className="nav-icon" />
          </a>
          <a href="https://leetcode.com/the_marvelous_one/" target="_blank" rel="noopener noreferrer">
              <SiLeetcode className="nav-icon" />
          </a>
        </div>
        <div className="navcenter">
            <ul className="navlist">
                <li className="navlist-item"><Link className='link' to="/">HOME</Link></li>
                <li className="navlist-item"><Link className='link' to="/">ALL BLOGS</Link></li>
                <li className="navlist-item"><Link className='link' to={user?(`/?user=${user.username}`):("/login")}>MY POSTS</Link></li>
                <li className="navlist-item"><Link className='link' to="/write">WRITE</Link></li>
                <li className="navlist-item" onClick={handleLogout}>{user && "LOGOUT"}</li>
            </ul>
        </div>
        <div className="navright">
        {
          
          user?(
            <Link to="/settings">
            <img className='nav-img' src={PF+user.profilePic} alt="" />
          </Link>
            ):
          (
            <ul className='navlist'>
            <li className="navlist-item"><Link className='link' to="/login">LOGIN</Link></li>
            <li className="navlist-item"><Link className='link' to="/register">SIGNUP</Link></li>
            </ul>
          )
        }
            
            {/* <FaSearch className='nav-searchicon'/> */}
            {user && (<Link className='link' to="/settings">
            <li className='navlist-item nav-searchicon'>{user?.username}</li>

            </Link>)}
        </div>
    </div>
  )
}

export default Navbar