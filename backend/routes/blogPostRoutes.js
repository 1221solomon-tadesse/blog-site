const router=require("express").Router()
const blogModel=require("../models/blogsmodel")
router.post('/add',async(req,res)=>{
 try{
const data =req.body
const newBlog=new blogModel(data)
await newBlog.save().then(()=>{
    res.status(200).json({message:" added succcessfuly"})
})
 }
 catch(error){
 console.log(error)
 }
})
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
books=await blogModel.find()
res.status(200).json({blogs})
}
catch(error){
    console.log(error)
}
})
router.get('/getBlogs/search', async (req, res) => {
  try {
    const searchQuery = req.query.q;
    if (!searchQuery) {
      return res.status(200).json({ blogs: [] });
    }
    const escapedQuery = searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    const books = await blogModel.find({
      $or: [
        { blogname: { $regex: new RegExp(escapedQuery, 'i') } },
        { description: { $regex: new RegExp(escapedQuery, 'i') } },
      ],
    });

    return res.status(200).json({ blogs });
  } catch (error) {
    console.error('Error fetching search results:', error);
    return res.status(500).json({ error: 'Error fetching search results' });
  }
});
router.get("/getBlogs/:id", async (req, res) => {
  const { id } = req.params; 
  try {
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ blog }); 
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/updateBooks/:id", async (req, res) => {
  const id = req.params.id;
  const { blogname, description,  image} = req.body;

  try {
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { blogname, description,  image },
      { new: true, runValidators: true } 
    );

    if (!book) {
      return res.status(404).json({ message: "blog not found" });
    }

    res.status(200).json({ message: "Data updated successfully.", blog });
  } catch (error) {
    console.error("Error updating book:", error);
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
