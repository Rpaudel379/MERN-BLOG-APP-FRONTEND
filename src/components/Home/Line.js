import React from "react";
import { useGlobalContext } from "../../context/context";
import Add from "../Home/Add";
import Login from "./Login";
const Line = () => {
  const { userData } = useGlobalContext();

  if (!userData) {
    return (
      <div className="line">
        <Login />
      </div>
    );
  }

  return (
    <div className="line">
      <Add />
    </div>
  );
};

export default Line;
