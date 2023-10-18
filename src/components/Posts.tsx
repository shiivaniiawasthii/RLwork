import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  {
    users {
      id
      name
      email
      imageUrl
      content
    }
  }
`;

function Posts() {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  useEffect(() => {
    refetch(); // Refetch data when the component mounts
  }, [refetch]);
  console.log(data, "data");
  console.log(data, "post data");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data.users;

  // console.log(users, "users");

  return (
    <div className="space-y-4">
      {users.map((user: any) => (
        <div
          key={user.id}
          className="p-4 border border-gray-300 rounded-md shadow-md mb-4"
        >
          <div className="mb-2">
            <p className="font-bold">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <img
            src={user.imageUrl}
            alt="Post Image"
            className="w-full h-48 object-cover mb-2"
          />
          <p className="text-lg mb-2">{user.content}</p>
          <div className="flex justify-between items-center">
            <div>
              <button className="text-blue-500 hover:underline">Like</button>
              <span className="text-gray-500 mx-2">2 Likes</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
