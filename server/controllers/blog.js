const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogRouter.get("/", async (request, response) => {
  const blog = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blog);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const user = request.user;
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end(); // valid id, not found
    }
  } catch (error) {
    next(error); // CastError will be handled by errorHandler -> 400
  }
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    try {
      const user = request.user;

      if (!user) {
        return response.status(401).json({ error: "token missing or invalid" });
      }
      const blog = await Blog.findById(request.params.id);

      if (!blog) {
        return response.status(404).json({ error: "Blog not found" });
      }

      if (blog.user.toString() !== user.id.toString()) {
        return response
          .status(401)
          .json({ error: "not authorized to delete this blog" });
      }

      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } catch (error) {
      response.status(400).json({ error: "invalid id or token" });
    }
  },
);

blogRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedBlog,
      { new: true, runValidators: true },
    ).populate("user", { username: 1, name: 1 });

    if (!result) {
      return response.status(404).json({ error: "blog not found" });
    }

    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({ error: "invalid id or token" });
  }
});

module.exports = blogRouter;
