import { Router } from "express";
import * as blogController from "../controllers/blog.controller.js";
import { generateMiddleWare } from "../middleware/route.middleware.js";
import { loginSchema, } from "../validation/user.validation.js";
const blogRoute = Router();

blogRoute.post('/blogs',generateMiddleWare(loginSchema), blogController.createBlog);
blogRoute.patch('/blogs/:id/publish', blogController.publishBlog);
blogRoute.get('/blogs/published', blogController.getPublishedBlogs);
blogRoute.get('/blogs/drafts', blogController.getUserDrafts);
blogRoute.delete("/blogs/:id", blogController.deleteBlog)
blogRoute.get("/blogs/search", blogController.searchBlogs)


export default blogRoute;
