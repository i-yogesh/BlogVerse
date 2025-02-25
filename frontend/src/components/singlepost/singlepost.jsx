import React, { useContext, useEffect, useState } from "react";
import "./singlepost.css";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../Context/Context";
const Singlepost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setpost] = useState({});
  const user = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const PF = "https://blogverse-6c6f.onrender.com/images/";
  console.log(user);
  useEffect(() => {
    const getpost = async () => {
      const res = await axios.get("/posts/" + path);
      setpost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getpost();
  }, [path]);
  const handleDelete = async () => {
    // console.log(post._id);
    if(user.user.username === post.username){
      try {
        await axios.delete(`/posts/${post._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("your_token")}`,
          },
          data:{
            user:user.user.username
          }
        });
        window.location.replace("/");
      } catch (err) {}
    }
    
  };
  
  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user?.username,
        title,
        desc,
      });
      setUpdateMode(false);
      window.location.replace(`/post/${post._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="singlepost">
      <div className="singlepostwrapper">
        {post.photo ? (
          <img src={PF + post.photo} alt="" className="singlepostimg" />
        ) : (
          <img
            src="https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg"
            alt=""
            className="singlepostimg"
          />
        )}

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singleposttitleinput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singleposttitle">
            {post.title}
            {post.username === user?.user.username && (
              <div className="singlepostedit">
                <FaRegEdit
                  className="singleposticon"
                  onClick={() => setUpdateMode(true)}
                />
                <AiFillDelete
                  className="singleposticon"
                  onClick={handleDelete}
                />
              </div>
            )}
          </h1>
        )}
        <div className="singlepostinfo">
          <Link className="link" to={`/?user=${post.username}`}>
            <span className="singlepostauthor">
              Author : <b>{post.username}</b>
            </span>
          </Link>

          <span className="singlepostdate">
            <b>{new Date(post.createdAt).toDateString()}</b>
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlepostdescinput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows="10"
          />
        ) : (
          <p className="singlepostdesc">{post.desc}</p>
        )}
        {updateMode && (
          
            <button className="singlepostbutton" onClick={handleUpdate}>
              Update
            </button>
          
        )}
      </div>
    </div>
  );
};

export default Singlepost;
