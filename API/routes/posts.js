const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
// Create Post
router.post("/", async (req, res) => {
    const newPost=new Post(req.body);
    try {
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Update Post 
router.put("/:id", async (req, res) => {
        try {
            const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            res.status(200).json(updatedPost);
        } catch (err) {
            res.status(500).json(err);
        }
});
// DELETE Post
router.delete("/:id", async (req, res) => {
    try {
      const post=await Post.findById(req.params.id);
    //   console.log(post.username);
    //   console.log(req.body.user);
      if(post.username===req.body.user){
          try {
              await Post.findByIdAndDelete(req.params.id);
              res.status(200).json("Post deleted successfully");
          } catch (err) {
              res.status(500).json(err);
          }
      }else{
          res.status(401).json("You can delete Only Your Post")
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
// Get Post
router.get("/:id",async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})
// Get All Posts 
router.get("/",async(req,res)=>{
    const username=req.query.user;
    const catname=req.query.cat;
    try {
        let posts;
        if(username){
            posts=await Post.find({username})
        }else if(catname){
            posts=await Post.find({categories:{
                $in:[catname]
            }})
        }else{
            posts=await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;
