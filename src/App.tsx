import { useState, useEffect } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { auth } from "./components/Firebase";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPost from "./components/AddPost";

interface User {
  displayName: string | null;
  uid: string | null;

  // You can include other user properties if needed
}
interface HomeProps {
  name: string | null;
  id: string | null;
}
interface addpostProps {
  id: string | null;
  name: string | null;
}

function App() {
  const [userName, setUserName] = useState<string | null>("");
  const [id, setid] = useState<string | null>("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        console.log(user, "user");
        setUserName(user.displayName);
        setid(user.uid);
      }
    });

    return () => unsubscribe(); // Unsubscribe when the component unmounts
  }, []);
  console.log(userName, id);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        <Route element={<SignUp />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<AddPost id={id} name={userName} />} path="/addpost" />

        <Route element={<Home name={id} id={id} />} path="/home" />
      </Routes>
    </div>
  );
}

export default App;
