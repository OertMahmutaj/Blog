import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useContext, useRef } from "react";

import { useField } from "../hooks/customHooks";

import blogServices from "../services/blogs";

import NotificationContext from "../src/NotificationContext";

import { StyledInput } from "../styles/Input.styles";
import { Button } from "../styles/Buttons.styles";

const BlogForm = () => {
  const { setNotification } = useContext(NotificationContext);
  const authorRef = useRef();
  const titleRef = useRef();
  const urlRef = useRef();

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
    onError: (error) => {
      setNotification(error.response.data.error, "error", 3000);
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
  const { reset: authorReset, ...authorInput } = author;
  const { reset: titleReset, ...titleInput } = title;
  const { reset: urlReset, ...urlInput } = url;

  return (
    <form onSubmit={addBlog}>
      <li>
        <StyledInput
          ref={authorRef}
          placeholder="author"
          {...authorInput}
          onMouseEnter={() => authorRef.current.focus()}
        />
      </li>
      <li>
        <StyledInput
          ref={titleRef}
          placeholder="title"
          {...titleInput}
          onMouseEnter={() => titleRef.current.focus()}
        />
      </li>
      <li>
        <StyledInput
          ref={urlRef}
          placeholder="url"
          {...urlInput}
          onMouseEnter={() => urlRef.current.focus()}
        />
      </li>
      <li>
        <Button type="submit" >Submit</Button>
      </li>
    </form>
  );
};

export default BlogForm;
