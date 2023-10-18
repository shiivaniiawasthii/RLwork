import React, { useState } from "react";
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

interface User {
  id: string;
  name: string;
  email: string;
  isFollowed: boolean;
}

interface ExploreProps {
  users: User[];
  onFollowToggle: (userId: string, isFollowed: boolean) => void;
}

function Explore({ users, onFollowToggle }: ExploreProps) {
  const { loading, error, data } = useQuery(GET_USERS);
  console.log(data, "data");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const otherusers = data.users;
  console.log(otherusers);
  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 space-y-4">
      {otherusers.map((user: any) => (
        <div
          key={user.id}
          className="p-4 border border-gray-300 rounded-md shadow-md"
        >
          <div className="mb-2">
            <p className="font-bold">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
          {/* You can add other user details here, such as a profile picture */}
          <div className="flex justify-between items-center">
            <div>
              {user.following ? (
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => onFollowToggle(user.id, false)}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => onFollowToggle(user.id, true)}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "user1",
      name: "John Doe",
      email: "john@example.com",
      isFollowed: false,
    },
    {
      id: "user2",
      name: "Jane Smith",
      email: "jane@example.com",
      isFollowed: true,
    },
    {
      id: "user3",
      name: "Bob Johnson",
      email: "bob@example.com",
      isFollowed: false,
    },
    {
      id: "user4",
      name: "Alice Brown",
      email: "alice@example.com",
      isFollowed: true,
    },
    // Add more users as needed
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mx-auto p-4">Users</h1>
      <Explore users={users} onFollowToggle={handleFollowToggle} />
    </div>
  );

  function handleFollowToggle(userId: string, isFollowed: boolean) {
    // Implement the logic to follow/unfollow a user and update the users array.
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, isFollowed } : user
    );
    setUsers(updatedUsers);
  }
}

export default UsersPage;
