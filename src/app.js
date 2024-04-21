import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.routes.js"
import userRoute from "./routes/users.route.js";
import blogRoute from "./routes/blog.route.js";

dotenv.config();
const app = express();
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3300 
app.use(express.json());

//Routes
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/blogs", blogRoute)
//all Routes
app.all("*", (req, res) => {
  res.status(404);
  res.json({
    message: "Not found",
  })
})

mongoose.connect(MONGODB_URI).then(() => {
  console.log("Connected to DB")
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
})
