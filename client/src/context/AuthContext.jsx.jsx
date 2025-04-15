import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);

  const register = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/api/register`,
        data
      );

      if (res.data.success === false) {
        toast.error(res.data.message || "Registration failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          style: {
            backgroundColor: "white",
            color: "red",
            fontWeight: "bold",
            borderRadius: "10px",
            marginTop: "2px",
          },
        });
        return { success: false }; // 👈 return failure
      }

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("currUser", JSON.stringify({ name: user.name }));
      setCurrUser(user);

      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        style: {
          backgroundColor: "white",
          color: "green",
          fontWeight: "bold",
          borderRadius: "10px",
          marginTop: "2px",
        },
      });

      return { success: true }; // 👈 return success
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        style: {
          backgroundColor: "white",
          color: "red",
          fontWeight: "bold",
          borderRadius: "10px",
          marginTop: "2px",
        },
      });
      return { success: false }; // 👈 also return failure on catch
    }
  };

  const login = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/api/login`,
        data
      );
      const { user, token } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("currUser", JSON.stringify({ name: user.name }));
      setCurrUser(user);

      toast.success(res.data.message, {
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
    } catch (error) {
      toast.error(error.message || "An error Occured", {
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
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("currUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ register, currUser, login, setCurrUser }}>
      {children}
    </AuthContext.Provider>
  );
};
