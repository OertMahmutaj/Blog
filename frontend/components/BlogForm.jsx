import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import { useField } from "../hooks/customHooks";
import blogServices from "../services/blogs";

// import { appendBlog } from "../src/reducers/blogReducer";
// import { useDispatch } from "react-redux";

const BlogForm = () => {
  // const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const author = useField("text");
  const title = useField("text");
  const url = useField("text");
  const queryClient = useQueryClient();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setTimeout(() => setUser(user), 0);
    }
  }, []);

  const newBlogMutation = useMutation({
    mutationFn: blogServices.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const addBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      author: author.value,
      title: title.value,
      url: url.value,
    };

    newBlogMutation.mutate(newBlog);

    author.reset();
    title.reset();
    url.reset();
  };

  return (
    <form onSubmit={addBlog}>
      <input placeholder="author" type="author" {...author} />
      <input placeholder="title" type="title" {...title} />
      <input placeholder="url" type="url" {...url} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BlogForm;
