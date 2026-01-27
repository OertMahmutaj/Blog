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
      return state.filter((blog) => blog.id !== action.payload);
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
  return async (dispatch, getState) => {
    const { user } = getState();
    const newBlog = await blogServices.create(content, user.token);
    dispatch(createBlog(newBlog));
  };
};

export const updateBlog = (id, likedBlog) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    const liked = await blogServices.like(id, likedBlog, user.token);
    dispatch(likeBlog(liked));
  };
};

export const removeBlog = (id) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    await blogServices.deleteBlog(id, user.token);
    dispatch(deleteBlog(id));
  };
};


export default blogSlice.reducer;
