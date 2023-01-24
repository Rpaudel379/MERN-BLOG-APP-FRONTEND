import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import LoadingNav from "./LoadingNav";
const NavbarLinks = ({ setBars, handleLogout }) => {
  const { userData, loading } = useGlobalContext();

  const loggedIn = [
    {
      id: 1,
      link: "/dashboard",
      text: "dashboard",
    },
    {
      id: 2,
      link: "/",
      text: "logout",
    },
  ];
  const notLoggedIn = [
    {
      id: 1,
      link: "/",
      text: "home",
    },
    {
      id: 2,
      link: "/login",
      text: "login",
    },
    {
      id: 3,
      link: "/signup",
      text: "register",
    },
  ];

  if (loading) {
    return <LoadingNav />;
  }

  if (!loading && !userData) {
    return (
      <>
        {notLoggedIn.map((links) => {
          return (
            <li key={links.id}>
              <Link to={links.link} onClick={() => setBars(false)}>
                {links.text}
              </Link>
            </li>
          );
        })}
      </>
    );
  }

  return (
    <>
      {" "}
      <li>
        <Link
          to="/"
          className="navbar-username"
          onClick={() => setBars(false)}
          title={userData.username}
        >
          {userData.username > 10
            ? userData.username.slice(0, 10) + "..."
            : userData.username}
        </Link>
      </li>
      {loggedIn.map((links) => {
        return (
          <li key={links.id}>
            <Link
              to={links.link}
              onClick={(e) => {
                handleLogout(e);
                setBars(false);
              }}
            >
              {links.text}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default NavbarLinks;
