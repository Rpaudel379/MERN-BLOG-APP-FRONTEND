/* import { createContext } from "react";

export default createContext(null); */

import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();

  const localUser = localStorage.getItem("user");

  if (userData && !localUser) {
    localStorage.setItem("user", JSON.stringify(userData));
  } else if (!userData && localUser) {
    setUserData(JSON.parse(localUser));
  }

  if (!localUser) {
    localStorage.removeItem("myBlogs");
  }

  const checkUser = async () => {
    try {
      // In this request, the request will go to middleware to check if the
      // user token is valid, if token is valid nothing will change
      // but if token is invalid or no user it will clear cookie
      // from the backend and remove localStorage values from here
      await axios.get(`${process.env.REACT_APP_BACKEND}/api/auth/checkUser`);
    } catch (error) {
      // backend will remove invalid cookie token
      console.log(error.response.data);
      // history.push("/login");
      localStorage.removeItem("user");
      localStorage.removeItem("myBlogs");
      setUserData(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // if (userData && !localUser) {
  //   localStorage.setItem("user", JSON.stringify(userData));
  // } else {
  //   console.log("no userdata");
  // }

  // useEffect(() => {
  //   const checkCookie = async () => {
  //     let token = cookie.get("jwt");
  //     if (token) {
  //       setLoading(true);
  //       try {
  //         const tokenRes = await axios.post(
  //           process.env.REACT_APP_BACKEND + "/valid",
  //           null,
  //           {
  //             headers: { "x-auth-token": token },
  //           }
  //         );
  //         if (tokenRes.data) {
  //           setUserData(tokenRes.data);
  //           setLoading(false);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //         setLoading(false);
  //       }
  //     } else {
  //       setLoading(false);
  //     }
  //   };
  //   checkCookie();
  // }, [setUserData]);

  return (
    <AppContext.Provider value={{ loading, userData, setUserData, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
