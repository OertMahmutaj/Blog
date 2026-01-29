import { useState, useContext } from "react";
import ViewUsersContext from "../src/ViewUsersContext";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import userServices from "../services/users";

const ViewUsers = () => {
  //   const { users, setUsers } = useContext(ViewUsersContext);

  //   const usersMutation = useMutation({
  //     mutationFn: userServices.getAll(),
  //     onSuccess: (res) => {
  //       setUsers(res);
  //     },
  //   });

    // const handleClick = async (event) => {
    //   event.preventDefault();
    //   usersMutation.mutate({ users });
    // };

  const result = useQuery({
    queryKey: ["users"],
    queryFn: userServices.getAll,
    refetchOnWindowFocus: false,
  });
  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  const users = result.data;

  console.log(users[0]);
  return (
    <div>
      {/* <button onClick={handleClick}>View</button> */}
      <ol>{users[0].name}</ol>
    </div>
  );
};

export default ViewUsers;
