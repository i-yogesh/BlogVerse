import React from 'react'
import "./header.css"
import  homebgimage  from "../../assets/bgimage.jpg"
const Header = () => {
  return (
    <div className="header">
        <div className="h-titles">
            <span className="titlesm">Explore, Connect, and Share the Remarkable</span>
            <span className="titlebg">BLOG VERSE</span>
        </div>
        <div className="background">
        <img  classname="header-img" src={homebgimage} alt="" />
        </div>
        
    </div>
  )
}

export default Header