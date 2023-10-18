import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, database } from "./Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, set } from "firebase/database";

interface FormState {
  name: string;
  email: string;
  password: string;
}

function SignUp() {
  const navigate = useNavigate();

  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const isStrongPassword = (password: string) => {
    // Add your password strength criteria here
    return password.length >= 8; // Example: Password should be at least 8 characters long
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const { name, email, password } = values;

    if (name === "" || email === "" || password === "") {
      toast.error("Fill in all fields first", { position: "top-right" });
    } else if (!isStrongPassword(password)) {
      toast.error("Password must be at least 8 characters long", {
        position: "top-right",
      });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          const user = res.user;
          updateProfile(user, {
            displayName: name,
          });
          console.log(auth?.currentUser?.uid, "auth");
          let userId = auth?.currentUser?.uid;

          // Send a POST request to your API to create a user
          const apiUrl = "https://jsonserver-mm0q.onrender.com/api/users"; // Replace with your API URL
          const userData = {
            id: userId,
            username: name,
            email: email,
          };

          fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          })
            .then((response) => {
              if (response.status === 201) {
                toast.success("Registration successful", {
                  position: "top-right",
                });
                console.log("Registration successful");
              } else {
                toast.error("Failed to create the user", {
                  position: "top-right",
                });
                console.error("Failed to create the user");
              }
            })
            .catch((error) => {
              toast.error("Error creating user", { position: "top-right" });
              console.error("Error creating user", error);
            });
        })

        .catch((err) => {
          toast.error(`Registration error: Please enter valid email`, {
            position: "top-right",
          });
          console.error("Registration error:", err.code, err.message);
        });
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="text"
              className="block text-gray-600 text-sm font-medium"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Name"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Email"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Password"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-end">
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Forgot Password?
            </a>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
function handleUserProfile(user: User, arg1: { additionalData: string }) {
  throw new Error("Function not implemented.");
}
