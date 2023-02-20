import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "./context";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blogLoading, setBlogLoading] = useState(true);
  const [allBlogs, setAllBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  const [blogType, setBlogType] = useState("all");

  const { userData } = useGlobalContext();

  /*  const getAllBlogs = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND + "/api/blogs/getblogs"
      );

      const data = await response.data;
      console.log(data);

      localStorage.setItem("allBlogs", JSON.stringify(data));
      setAllBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyBlogs = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND + "/api/blogs/userBlog",
        {
          userId: userData.id,
        }
      );
      const data = await response.data;
      console.log(data);
      localStorage.setItem("myBlogs", JSON.stringify(data));
      setMyBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  // get all blogs
  useEffect(() => {
    setTimeout(() => {
      setBlogLoading(true);
      const localAllBlogs = JSON.parse(localStorage.getItem("allBlogs"));

      if (localAllBlogs) {
        setAllBlogs(localAllBlogs);
      } else {
        getAllBlogs();
      }

      setBlogLoading(false);
    }, [2000]);
  }, []);

  // get user specific blogs
  useEffect(() => {
    if (userData) {
      setBlogLoading(true);
      const localMyBlogs = JSON.parse(localStorage.getItem("myBlogs"));

      if (localMyBlogs) {
        setMyBlogs(localMyBlogs);
      } else {
        getMyBlogs();
      }

      setBlogLoading(false);
    }
  }, [userData]); */

  // ALL BLOGS
  const getAllBlogs = async () => {
    setBlogLoading(true);
    try {
      const fetch = await axios.get(
        process.env.REACT_APP_BACKEND + "/api/blogs/getblogs"
      );
      const response = await fetch.data;
      if (response) {
        setAllBlogs(response);
        setBlogLoading(false);
      }
    } catch (err) {
      setBlogLoading(false);
    }
  };

  // MY BLOGS
  const getMyBlogs = async () => {
    try {
      const fetch = await axios.post(
        process.env.REACT_APP_BACKEND + "/api/blogs/userBlog",
        {
          userId: userData.id,
        }
      );
      const response = await fetch.data;
      console.log(response);
      setMyBlogs(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    if (userData) {
      getMyBlogs();
    }
  }, [userData]);

  return (
    <BlogContext.Provider
      value={{
        allBlogs,
        blogLoading,
        myBlogs,
        blogType,
        setBlogType,
        getAllBlogs,
        getMyBlogs,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogProvider = () => {
  return useContext(BlogContext);
};

export { BlogProvider };
