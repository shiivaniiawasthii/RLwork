import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase"; // Import your Firebase authentication instance
import Explore from "./Explore";
import { toast } from "react-toastify";
import Posts from "./Posts";

interface HomeProps {
  name: string | null;
  id: string | null;
}

function Home({ name }: HomeProps) {
  const [profile, setProfile] = useState<string | null>(null);
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("myfeed"); // 'myfeed' or 'explore'

  const switchToMyFeed = () => {
    setActiveComponent("myfeed");
  };

  const switchToExplore = () => {
    setActiveComponent("explore");
  };
  useEffect(() => {
    setProfile(name);
  }, []);
  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Log Out successful", { position: "top-right" }); // Sign the user out
      navigate("/login"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div className="w-full max-w-screen-xl mx-auto flex justify-center p-4">
      {/* Sidebar */}
      <div className="w-1/4 p-4 border-r border-gray-300">
        <div className="space-y-4">
          <p
            className={`w-full py-2 px-4 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400`}
          >
            {profile}
          </p>
          <button
            onClick={() => navigate("/addpost")}
            className={`w-full py-2 px-4 bg-gray-200 text-gray-600 rounded-md hover:bg-blue-800 hover:text-white focus:ring-2 focus:ring-white-600`}
          >
            Add Post
          </button>
          <button
            onClick={switchToMyFeed}
            className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-${
              activeComponent === "myfeed" ? "blue" : "gray"
            }-400 mb-4 ${
              activeComponent === "myfeed"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            My Feed
          </button>
          <button
            onClick={switchToExplore}
            className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-${
              activeComponent === "explore" ? "blue" : "gray"
            }-400 ${
              activeComponent === "explore"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Explore
          </button>
          <button
            onClick={handleLogout}
            className={`w-full py-2 px-4 bg-gray-200 text-gray-600 rounded-md hover:bg-blue-800 hover:text-white focus:ring-2 focus:ring-white-600`}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold mb-2">Home</h1>
          <div className="flex space-x-4">
            <button
              className="text-blue-500 hover:underline"
              onClick={switchToMyFeed}
            >
              My Feed
            </button>
            <button
              className="text-gray-600 hover:underline"
              onClick={switchToExplore}
            >
              Explore
            </button>
          </div>
        </div>

        {/* Post List */}
        {activeComponent === "myfeed" ? <Posts /> : <Explore />}
      </div>
    </div>
  );
}

export default Home;
