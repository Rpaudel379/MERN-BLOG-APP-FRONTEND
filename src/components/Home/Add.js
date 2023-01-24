import React from "react";
import { Link } from "react-router-dom";
import { useBlogProvider } from "../../context/BlogContext";
import { useGlobalContext } from "../../context/context";
import axios from "axios";

const Add = () => {
  const { setBlogType } = useBlogProvider();

  return (
    <div className="add-line">
      <div className="add">
        <Link to="/addBlog" className="btn">
          ADD
        </Link>
        <p>your blog</p>
      </div>
      <div className="blogs-btns">
        <button className="btn" onClick={() => setBlogType("all")}>
          ALL BLOGS
        </button>
        <button className="btn" onClick={() => setBlogType("user")}>
          MY BLOGS
        </button>
      </div>
    </div>
  );
};

export default Add;
