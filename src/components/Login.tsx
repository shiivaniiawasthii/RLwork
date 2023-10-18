import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./Firebase";
import { toast } from "react-toastify";

interface FormState {
  email: string;
  password: string;
}
function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState<FormState>({
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
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (values.email === "" || values.password === "") {
      toast.error("Enter all the details", { position: "top-right" });
    } else {
      try {
        let res = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = res.user;
        updateProfile(user, {
          displayName: values.email,
        });
        toast.success("Log In successful", { position: "top-right" });
        navigate("/home");
        // Authentication succeeded
      } catch (error) {
        // Handle authentication failure
        toast.error(`Please enter correct credentials`, {
          position: "top-right",
        });
        console.error("Login error: ", error);
      }
    }
  };
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium"
            >
              Email
            </label>
            <input
              onChange={handleInputChange}
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Email"
              required
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
              onChange={handleInputChange}
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Password"
              required
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
            Log In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <a
              onClick={() => navigate("/")}
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
