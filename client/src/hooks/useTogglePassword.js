import { useState } from "react";

const useTogglePassword = () => {
  const [inputType, setInputType] = useState("password");

  const togglePassword = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return {
    inputType,
    togglePassword,
  };
};

export default useTogglePassword;
