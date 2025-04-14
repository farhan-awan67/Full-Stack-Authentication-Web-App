import React, { useContext } from "react";
import { assets } from "../assets/assets";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Home = () => {
  const { currUser, setCurrUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[url('/bg_img.png')] bg-cover">
      <Header />
      <div className="flex justify-center items-center flex-col min-h-screen">
        <img
          className="object-fit w-36 h-36 rounded-full mb-6"
          src={assets.header_img}
          alt="head"
        />
        <h1 className="text-xl sm:text-3xl flex justify-center items-center gap-2 font-semibold m-0">
          Hey {currUser?.name || "Developer"}
          <img
            className="w-8 aspect-square"
            src={assets.hand_wave}
            alt="handwave"
          />
        </h1>
        <div className="text-center p-3 sm:p-0">
          <h2 className="text-3xl sm:text-5xl font-semibold m-0 leading-tighter sm:tracking-normal">
            Welcome to our app
          </h2>
          <p className="text-[17px] mt-2 font-semibold leading-tight sm:max-md sm:tracking-normal">
            lets start with a quick product tour and we will have you up and
            running in no time!
          </p>
        </div>
        {currUser ? (
          <button
            onClick={() => {
              localStorage.removeItem("currUser");
              localStorage.removeItem("token");
              setCurrUser(null);
              navigate("/");
            }}
            className="rounded-full px-4 py-1.5 text-[20px] font-semibold border border-black hover:scale-105 ease-in-out transition duration-300 mt-3"
          >
            Log out
          </button>
        ) : (
          <button
            onClick={() => navigate("/register")}
            className="rounded-full px-4 py-1.5 text-[20px] font-semibold border border-black hover:scale-105 ease-in-out transition duration-300 mt-3"
          >
            Get Started
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
