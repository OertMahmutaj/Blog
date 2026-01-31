import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userServices from "../services/users";

const User = () => {
  const { id } = useParams();
  // console.log(id);
  

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => userServices.getUser(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
  // console.log(user);
  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>failed to load user</div>;

  return (
    <div>
      <h1>{user.name}</h1>     
      <h2>added blogs</h2>
      <ol>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default User;
