import React, { useState, ChangeEvent } from "react";
import { auth } from "./Firebase";

import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
interface addpostProps {
  id: string | null;
  name: string | null;
}
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
const AddPost = ({ id, name }: addpostProps) => {
  const navigate = useNavigate();
  const [content, setcontent] = useState<string>("");
  const [imageUrl, setimageUrl] = useState<string>("");

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setcontent(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setimageUrl(e.target.value);

      console.log(imageUrl, "image");
    }
  };

  const handleTagFriends = () => {
    console.log("Tagging friends");
  };
  const { data } = useQuery(GET_USERS);
  console.log(data, "data");
  const handlePost = async () => {
    // Ensure the user is authenticated
    const user = auth.currentUser;
    if (!user) {
      alert("You need to be logged in to post.");
      return;
    }

    // Ensure both content and an image are selected
    if (!content) {
      alert("Please enter content and select an image before posting.");
      return;
    }

    // Create an object with the data to post
    const postData = {
      id: id,
      name: name, // Include the existing item's ID
      content: content,
      imageUrl: imageUrl,
      following: true,
    };

    try {
      // Send a PUT request to the server to update the existing item
      const response = await fetch(
        `https://jsonserver-mm0q.onrender.com/api/users/${id}`, // Use the appropriate URL with the specific item's ID
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.status === 200) {
        // The PUT request was successful (HTTP status 200 OK).
        alert("Data updated successfully.");
        // Clear the input fields after a successful post
        setcontent("");
        setimageUrl("");
      } else {
        // Handle other response status codes as needed.
        alert("Failed to update the data. Please try again.");
      }
    } catch (error) {
      // Handle any network or request errors
      console.error("Error:", error);
      alert("An error occurred while trying to update the data.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-screen-md">
        <div className="w-full max-w-screen-md mx-auto p-4">
          <h2 className="text-2xl font-semibold mb-4">Add Post</h2>
          <textarea
            className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-400 mb-4"
            rows={4}
            placeholder="What's on your mind?"
            value={content}
            onChange={handleTextChange}
          />

          <input
            type="text"
            placeholder="Type image url"
            className="mb-4"
            onChange={handleImageChange}
            value={imageUrl}
          />

          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handlePost}
            >
              Post
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={handleTagFriends}
            >
              Tag Friends
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={() => navigate("/home")}
            >
              Go to Home page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
