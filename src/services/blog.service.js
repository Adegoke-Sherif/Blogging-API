import Blog from "../database/blog.schema.js"; // Adjust path as necessary; Ensure your models are using ES6 exports

class BlogService {
    static async createBlog(data, userId) {
        const { title, description, body, tags } = data;
        const blog = new Blog({
            title,
            description,
            body,
            author: userId,
            tags
        });
        return blog.save();
    }

    static async publishBlog(blogId, userId) {
        const update = { state: 'published' };
        const conditions = { _id: blogId, author: userId, state: 'draft' };
        return Blog.findOneAndUpdate(conditions, update, { new: true, runValidators: true });
    }

    static async getPublishedBlogs() {
        return Blog.find({ state: 'published' }).populate('author', 'name');
    }

    static async getUserDrafts(userId) {
        return Blog.find({ author: userId, state: 'draft' });
    }

    static async deleteBlog(blogId, userId) {
        const blog = await Blog.findOne({ _id: blogId, author: userId });
        if (!blog) {
            throw new Error('Blog not found or user not authorized to delete this blog');
        }
        return Blog.deleteOne({ _id: blogId });
    }
    static async searchBlogs({ author, title, tags }) {
        let query = { state: 'published' };
        
        if (author) {
            query.author = author;
        }
        if (title) {
            query.title = { $regex: title, $options: 'i' }; // case-insensitive searching
        }
        if (tags) {
            if (Array.isArray(tags)) {
                query.tags = { $in: tags }; // Matching any of the tags provided
            } else {
                query.tags = { $in: [tags] }; // Single tag, ensure it is treated as an array
            }
        }

        return Blog.find(query).populate('author', 'name');
    }
}

export default BlogService;