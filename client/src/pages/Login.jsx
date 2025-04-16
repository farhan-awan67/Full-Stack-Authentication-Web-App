import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import useTogglePassword from "../hooks/useTogglePassword.js";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { inputType, togglePassword } = useTogglePassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validating form data
    let isValid = validateForm(data);
    if (!isValid) {
      return;
    }

    setLoading(true);
    //sending data to login
    const result = await login(data);
    setLoading(false);

    if (result.success) {
      setData({ email: "", password: "" });
      navigate("/"); // 👈 only navigate on success
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const validateConfig = {
    email: [{ required: true, message: "email is required" }],
    password: [{ required: true, message: "password is required" }],
  };

  const validateForm = (data) => {
    const errorData = {};
    let isValid = true;
    Object.entries(data).forEach(([key, value]) => {
      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          toast.error(rule.message, {
            position: "top-right", // Position of the toast
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false, // Hide progress bar
            closeOnClick: true, // Close on click
            pauseOnHover: true, // Pause on hover
            draggable: false, // Allow drag
            style: {
              backgroundColor: "white", // Set background color (Tomato red)
              color: "red", // Set text color (white)
              fontWeight: "bold", // Set font weight
              borderRadius: "10px", // Rounded corners
              marginTop: "2px", // margin top
            },
          });
          isValid = false;
        }
      });
    });
    setError(errorData);
    return isValid;
  };

  return (
    <div className="flex justify-center items-center bg-[#5b1980] h-screen">
      <div>
        <h1 className="text-[25px] font-medium text-white mb-3">Login</h1>
        <form onSubmit={handleSubmit} action="" className="flex flex-col">
          <div className="bg-[#333A5C] rounded-full flex justify-start items-center px-5 py-2 mb-4 gap-3">
            <img src={assets.person_icon} alt="user" />
            <input
              className="bg-transparent outline-none text-white"
              type="text"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="bg-[#333A5C] rounded-full flex justify-center items-center px-5 py-2 mb-4 gap-3">
            <img src={assets.lock_icon} alt="user" />
            <input
              className="bg-transparent outline-none text-white"
              type={inputType}
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              autoComplete="off"
            />
            {inputType === "password" ? (
              <i
                onClick={togglePassword}
                className="fa-solid fa-eye-slash text-[#B3C0FF] cursor-pointer"
              />
            ) : (
              <i
                onClick={togglePassword}
                className="fa-solid fa-eye text-[#B3C0FF] cursor-pointer"
              />
            )}
          </div>
          <button
            className={`bg-[#333A5C] text-white rounded-full py-2 px-4 flex items-center justify-center`}
          >
            {loading ? <span className="spinner" /> : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
