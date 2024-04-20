import mongoose from "mongoose";
const blogSchema = mongoose.Schema({
  title: String,
  content: String,
  state: {
    type: String,
    unique: true,
    enum: ["draft", "published"],
    default: "draft"
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  description: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  read_count:{
    type: Number,
    default: 0
  },
  reading_time: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
  }],
})

const Blog = mongoose.model("Blog", blogSchema, {
  timestamps: true,
});

export default Blog