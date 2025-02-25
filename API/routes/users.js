const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
// UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const tuser= await User.findById(req.params.id);
      try {
        await Post.updateMany({username:tuser.username},{$set:{username:req.body.username}});
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      
    }
      
  } else {
    res.status(401).json("You can update only your Account");
  }
});
// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    try {
      await Post.deleteMany({ username: user.username });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been Deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    console.log(err);
    res.status(404).json("User Not Found");
  }
});
// Get One user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
