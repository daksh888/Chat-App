import React, { useState } from "react";
import { useRegisterUserMutation } from "../../services/chatApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const [error, setError] = useState("");
  const [registerUser, { isLoading, data,isSuccess, isError }] = useRegisterUserMutation();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic: Check if passwords match
    if (formData.password !== formData.re_password) {
      setError("Password and Confirm Password doesn't match!");
      return;
    }
    console.log("Form Data Submitted: ", formData);
    try {
      const result = await registerUser(formData).unwrap(); 
      console.log("User registered successfully:", result);
      navigate("/activation-email-send", {
        state: { email: result.email },
      });
      setFormData({
        name: "",
        email: "",
        password: "",
        re_password: "",
      });
      if (isError) {
        return setError("Registration Failed!");
      }
    } catch (error) {
      console.error("Failed to register user:", error);
    }

    
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Register
          </h2>
          {error ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          ) : (
            ""
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="re_password"
              >
                Confirm Password
              </label>
              <input
                id="re_password"
                type="password"
                name="re_password"
                value={formData.re_password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {isLoading ? <div>Loading...</div> : <div>Register</div>}
            </button>
            <p className="my-2">
              Are you already registered?{" "}
              <u className="cursor-pointer" onClick={() => navigate("/")}>
                Login
              </u>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
