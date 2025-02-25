import React, { useContext, useState } from "react";
import "./writepage.css";
import { BiImageAdd } from "react-icons/bi";
import axios from "axios";
import { Context } from "../../Context/Context";
const Writepage = () => {
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [file,setFile]=useState(null);
  const {user}=useContext(Context);
  const handleSubmit=async (e)=>{
      e.preventDefault();
      const newPost={
        username:user.username,
        title,desc
      }
      if(file){
        const data=new FormData();
        const filename=Date.now()+file.name;
        data.append("name",filename);
        data.append("file",file);
        newPost.photo=filename;
        try {
          await axios.post("/api/upload",data);
        } catch (err) {
          
        }
      }
      try {
        const res=await axios.post("/api/posts",newPost);
        window.location.replace("/post/"+res.data._id);
      } catch (err) {
        
      }
      

  }
  return (
    <div className="writepage">
    {file?(<img src={URL.createObjectURL(file)} alt="" className="writeimage" />):(<img src="https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg" alt="" className="writeimage" />)}
    
      <form onSubmit={handleSubmit}>
        <div className="writeform">
          <div className="writeformgroup">
            <label htmlFor="inputfile">
              <BiImageAdd className="icon" />
            </label>
            <input type="file" id="inputfile" style={{ display: "none" }} onChange={(e)=>{setFile(e.target.files[0])}} />
            <input
              type="text"
              placeholder="Your Title"
              className="input title"
              autoFocus={true}
              onChange={(e)=>setTitle(e.target.value)}
            />
          </div>
          <div className="writeformgroup">
            <textarea name="" id="" cols="30" rows="10" placeholder="Share your Story" className="input text" type="text" onChange={(e)=>setDesc(e.target.value)}></textarea>
          </div>
        </div>
        <button className="submit" type="submit">PUBLISH</button>
      </form>
    </div>
  );
};

export default Writepage;
