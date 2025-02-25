import React, { useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import CoverPhoto from "../../assets/cover.jpeg"
import {
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Sidebar = () => {
  const [cats,setcats]=useState([]);
  useEffect(()=>{
    const getcats=async()=>{
      const res=await axios.get("/categories")
      setcats(res.data);
    }
    getcats();
  },[])
  return (
    <div className="sidebar">
      <div className="sidebaritem">
        <span className="sidebartitle">ABOUT ME</span>
        <img src={CoverPhoto} alt="" />
        <p>
          Yogesh Mishra is a final year student with good problem solving skills and proficiency in MERN,NEXT.js,Javascript/Typescript,PostgreSQL,Java,Springboot
        </p>
      </div>
      {/* <div className="sidebaritem">
        <span className="sidebartitle">CATEGORIES</span>
        <ul className="sidebarlist">
        {cats.map((c)=>(
          <Link to={`/?cat=${c.name}`} className="link">
          <li className="sidebarlistitem">{c.name}</li>
          </Link>
          
        ))}
          
          
        </ul>
      </div> */}
      <div className="sidebaritem">
        <span className="sidebartitle">FOLLOW US</span>
        <div className="sidebarsocial">
          <a href="https://www.linkedin.com/in/marvelous-one/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="sidebar-icon" />
          </a>
          <a href="https://github.com/i-yogesh" target="_blank" rel="noopener noreferrer">
              <FaGithub className="sidebar-icon" />
          </a>
          <a href="https://leetcode.com/the_marvelous_one/" target="_blank" rel="noopener noreferrer">
              <SiLeetcode className="sidebar-icon" />
          </a>

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
