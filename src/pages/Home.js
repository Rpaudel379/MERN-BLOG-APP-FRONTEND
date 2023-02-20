import React from "react";
/* import Tools from "../Tools";
import { useGlobalContext } from "../context/context"; */
import { useBlogProvider } from "../context/BlogContext";

import Hero from "../components/Home/Hero";
import Line from "../components/Home/Line";
import AllBlogs from "../components/Home/AllBlogs";

const Home = (props) => {
  document.title = "Home";
  const { allBlogs, myBlogs, blogLoading, blogType } = useBlogProvider();

  const handleDeleteBlog = (id) => {
    console.log(id);
  };

  return (
    <div className="home container">
      <Hero />
      <Line />
      <AllBlogs
        blogs={blogType === "all" ? allBlogs : myBlogs}
        loading={blogLoading}
        blogType={blogType}
        handleDeleteBlog={handleDeleteBlog}
      />
    </div>
  );
};

export default Home;
