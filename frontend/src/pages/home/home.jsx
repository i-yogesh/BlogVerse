import React, { useEffect, useState } from "react";
import "./home.css";
import Header from "../../components/Header/header";
import Sidebar from "../../components/Sidebar/sidebar";
import Posts from "../../components/posts/posts";
import axios from "axios";
import { useLocation } from "react-router-dom";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  console.log(search);
  useEffect(() => {
    const fetchposts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchposts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
