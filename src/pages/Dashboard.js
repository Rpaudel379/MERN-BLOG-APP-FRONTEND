import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import Loading from "../components/Loading";

import "../components/Dashboard/dashboard.css";
import { AiOutlineCalendar } from "react-icons/ai";

import axios from "axios";
import ChangeInfo from "../components/Dashboard/ChangeInfo";

const Dashboard = (props) => {
  console.log("dashboard page");
  document.title = "Dashboard";

  // to redirect user to /login page if no token
  const history = useHistory();

  // contextAPI data for user information
  const { userData } = useGlobalContext();

  // loading indicator while using useEffect to check the user
  const [loading, setLoading] = useState(true);

  // loading indicator while updating information about user
  const [updateLoading, setUpdateLoading] = useState(false);

  // check whether user is there or no
  // if not redirect user to /login page
  useEffect(() => {
    const checkDashboard = async () => {
      try {
        // In this request, the request will go to middleware to check if the
        // valid user is present, if not it will send 400 error
        // which will redirect user to the /login page
        // if valid user it wont redirect and continues the page
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/auth/checkUser`
        );

        await response.data;
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
        history.push("/login");

        //? TODO delete cookie and localstorage data
      }
    };
    checkDashboard();
  }, []);

  // loading indicator when using useEffect to check user token
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* loading indicator while updating user information */}
      {/* needed to do two loading indicator because of react error || memory leaks */}
      {updateLoading && <Loading />}

      <div className={`dashboard container ${updateLoading ? "hide" : ""}`}>
        <div className="dashboard-header">
          <h2>
            Welcome <span className="name">{userData.username}</span>
          </h2>
          <p>
            <AiOutlineCalendar /> {new Date().toDateString()}
          </p>
        </div>

        <div className="dashboard-info">
          <h3>Your Info</h3>
          <p>
            USERNAME: <span>{userData.username}</span>
          </p>
          <p>
            EMAIL: <span>{userData.email}</span>
          </p>
        </div>

        {/* component for changing the user information */}
        <ChangeInfo setUpdateLoading={setUpdateLoading} />
      </div>
    </>
  );
};

export default Dashboard;

/*  useEffect(() => {
    const checkAuth = async () => {
      let token = cookie.get("jwt");
      if (token) {
        try {
          const tokenRes = await axios.post(
            "http://localhost:5000/valid",
            null,
            {
              headers: { "x-auth-token": token },
            }
          );
          if (tokenRes.data) {
            console.log(tokenRes.data);
            setUserData(tokenRes.data);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    };
    checkAuth();
  }, [setUserData]); */
