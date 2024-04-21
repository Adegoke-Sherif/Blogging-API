import * as BlogService from '../services/blog.service.js'; // Update path as needed

export const createBlog = async (req, res) => {
    try {
        const blog = await BlogService.createBlog(req.body, req.user._id);
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: "Error creating blog", error: error.message });
    }
};

export const publishBlog = async (req, res) => {
    try {
        const blog = await BlogService.publishBlog(req.params.id, req.user._id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found or already published.' });
        }
        res.json(blog);
    } catch (error) {
        res.status(400).json({ message: "Error publishing blog", error: error.message });
    }
};

export const getPublishedBlogs = async (req, res) => {
    try {
        const blogs = await BlogService.getPublishedBlogs();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error: error.message });
    }
};

export const getUserDrafts = async (req, res) => {
    try {
        const blogs = await BlogService.getUserDrafts(req.user._id);
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching drafts", error: error.message });
    }
};

export const searchBlogs = async (req, res) => {
    try {
        const { author, title, tags } = req.query;
        const blogs = await BlogService.searchBlogs({ author, title, tags });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error searching blogs", error: error.message });
    }    
};
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id; // Assuming req.user is set by your authentication middleware
        await BlogService.deleteBlog(id, userId);
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog", error: error.message });
    }

}