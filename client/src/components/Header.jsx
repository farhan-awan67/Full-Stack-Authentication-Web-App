import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { currUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const name = currUser && currUser.name ? currUser.name : "";
  const firstLetter = name.charAt(0).toUpperCase();
  return (
    <div className="flex justify-between items-center py-1 px-2 sm:px-11">
      <h1 className="font-bold text-[35px] leading-tight">
        Mern Auth
      </h1>

      {currUser ? (
        <button className="rounded-[60px] py-1.5 px-3 sm:py-2 sm:px-3.5 font-bold text-white border-none bg-green-800 text-[16px] text-center">
          {firstLetter}
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="text-[18px] rounded-3xl px-4 py-0.5 font-semibold border border-black hover:scale-105 ease-in-out flex justify-evenly items-center gap-2 transition duration-300"
        >
          Login
          <img
            className="object-cover w-3"
            src={assets.arrow_icon}
            alt="arrow"
          />
        </button>
      )}
    </div>
  );
};

export default Header;
