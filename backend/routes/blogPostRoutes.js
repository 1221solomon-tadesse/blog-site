const router=require("express").Router()
const blogModel=require("../models/blogsmodel")

router.post("/add", async (req, res) => {
  try {
    const { data, userId } = req.body;
    const newBlog = new blogModel({
      ...data, 
      userId: userId,
    });
    await newBlog.save();
    res.status(200).json({ message: "Added successfully" });
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ message: "Error adding blog" });
  }
});

router.get("/getUserBlogs/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const blogs = await blogModel.find({ userId }).populate("userId");

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found for this user" });
    }

    res.status(200).json({ blogs });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/latestPosts", async (req, res) => {
  try {
    const latestBlogs = await blogModel.find()
      .sort({ createdAt: -1 }) 
      .limit(5);  
    res.status(200).json({ blogs: latestBlogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching latest posts" });
  }
});
router.get("/getBlogs",async(req,res)=>{
try{
blogs=await blogModel.find()
res.status(200).json({blogs})
}
catch(error){ 
    console.log(error)
}
})
router.get("/getBlogs/:id", async (req, res) => {
  const { id } = req.params; 
  try {
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ blog }); 
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/updateBlogs/:id", async (req, res) => {
  const id = req.params.id;
  const { blogname, description,  image} = req.body;

  try {
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { blogname, description,  image },
      { new: true, runValidators: true } 
    );

    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }

    res.status(200).json({ message: "Data updated successfully.", blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.delete("/deleteBlog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await blogModel.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports=router
