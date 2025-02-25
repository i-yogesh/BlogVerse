import React, { useContext } from "react";
import "./post.css";
import { Link } from "react-router-dom";
// import user from "../../../../API/models/user";
import { Context } from "../../Context/Context";
const Post = ({ post }) => {
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  return (
    <div className="post">
      {post.photo ?( <img className="postimage" src={PF + post.photo} alt="" />):(<img src="https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg" alt="" className="writeimage" />)}

      <div className="postinfo">
        <div className="postcategs">
          {post.categories.map((c) => (
            <span className="postcateg">{c.name}</span>
          ))}
        </div>
        <Link className="link" to={user ? `/post/${post._id}` : "/login"}>
          <span className="posttitle">{post.title}</span>
        </Link>
        <hr />
        <span className="posttime">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postdesc">{post.desc}</p>
    </div>
  );
};

export default Post;
