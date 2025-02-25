import React, { useContext, useState } from "react";
import "./settings.css";
import Sidebar from "../../components/Sidebar/sidebar";
import { FaUserAlt } from "react-icons/fa";
import { Context } from "../../Context/Context";
import axios from "axios";
const Settings = () => {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [success, setSuccess] = useState(false);
  // const [password, setPassword] = useState("");

  const PF = "http://localhost:5000/images/"
  const handleDelete=async ()=>{
    try {
      await axios.delete(`/users/${user._id}`,{data:{username:user.username}});
      dispatch({type:"LOGOUT"});
      window.location.replace("/register");
    } catch (err) {
      
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingswrapper">
        <div className="settingstitle">
          <span className="update">Update your Account</span>
          <span className="delete" onClick={handleDelete}>Delete your Account</span>
        </div>
        <form className="settingsform" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="ppsettings">
          
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileinput">
              <FaUserAlt className="ppsettingsicon" />
            </label>
            <input type="file" id="fileinput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
          </div>
          {/* <label>Name</label>
          <input type="text" placeholder="Siddiq" /> */}
          <label>Username</label>
          <input type="text" value={username}
            onChange={(e) => setUsername(e.target.value)}/>
          <label>Email</label>
          <input  type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          {/* <label>Password</label>
          <input type="password"
            onChange={(e) => setPassword(e.target.value)} /> */}
          <button className="settingssubmit" type="submit">Update</button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
