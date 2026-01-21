import { createSlice } from "@reduxjs/toolkit";
import blogServices from "../../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],

  reducers: {
    createBlog(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      const id = action.payload.id;
      return state.map((blog) => (blog.id !== id ? blog : action.payload));
    },
    deleteBlog(state, action) {
      const id = action.payload.id;
      return state.filter((blog) => blog.id !== id);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

const { createBlog, likeBlog, deleteBlog, setBlogs } = blogSlice.actions;

export const initialiazeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    dispatch(setBlogs(blogs));
    console.log(blogs);
  };
};

export const appendBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogServices.create(content);
    dispatch(createBlog(newBlog));
  };
};

export const updateBlog = (id, likedBlog) => {
  return async (dispatch) => {
    const liked = await blogServices.like(id, likedBlog);
    dispatch(likeBlog(liked));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    const deleted = await blogServices.deleteBlog(id);
    dispatch(deleteBlog(deleted));
  };
};

export default blogSlice.reducer;
