import React, { useState } from "react";
import { useGlobalContext } from "../../context/context";
import axios from "axios";

const ChangeInfo = ({ setUpdateLoading }) => {
  /* user data */
  const { userData, setUserData } = useGlobalContext();

  // form

  // three user states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // error while updating the user info
  // three errors for three states
  // username, email and password
  const [error, setError] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
  });
  // form

  // checks for username validity rest will be done from backend
  // also send username type and username value to another function
  // while will then send the api request to the backend
  const handleSubmitUsername = (e) => {
    e.preventDefault();
    if (!username) {
      setError({ usernameError: "must provide name" });
    } else {
      handleAPI("username", username);
    }
  };

  // checks for email valdity rest will be done from backend
  // also send username type and username value to another function
  // while will then send the api request to the backend
  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (!email) {
      setError({ emailError: "must provide email" });
    } else {
      handleAPI("email", email);
    }
  };

  // checks for password validity rest will be done from backend
  // also send username type and username value to another function
  // while will then send the api request to the backend
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (!password) {
      setError({ passwordError: "must provide password" });
    } else if (password.length < 6) {
      setError({ passwordError: "password must be minimum 6 characters" });
    } else {
      handleAPI("password", password);
    }
  };

  // this function will send the request to the backend
  // if errors from backend it try/catch will catch error
  // and display error in error state in three types
  const handleAPI = async (type, value) => {
    try {
      setUpdateLoading(true);

      // sending the userId. Backend will compare this userId with middleware
      // token id
      const request = await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/auth/change`,
        {
          userId: userData.id,
          type,
          value,
        }
      );

      // console.log(request.data);

      // by removing localStorage userContext.js will do some logic in there
      localStorage.removeItem("user");

      // setting new userData
      setUserData(request.data);

      // if error from backend
      setError({
        usernameError: "",
        emailError: "",
        passwordError: "",
      });
    } catch (error) {
      console.log(error.response.data);

      // if error from backend
      setError({ [`${type}Error`]: error.response.data.error });
    }

    setUpdateLoading(false);

    // will clear any red error messages in 2 seconds
    setTimeout(() => {
      setError({
        usernameError: "",
        emailError: "",
        passwordError: "",
      });
    }, 2000);
    // try {
    //   let token = cookie.get("jwt");

    //   const request = await axios.post(
    //     `${process.env.REACT_APP_BACKEND}/change`,
    //     {
    //       userId: userData.id,
    //       name: userData.username,
    //       type,
    //       value,
    //     },
    //     {
    //       headers: { "x-auth-token": token },
    //     }
    //   );

    //   const response = await request.data;
    //   if (response.success) {
    //     window.location.reload();
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="dashboard-change">
      <h3>Change Your Info</h3>
      {/* username */}
      <div className="dashboard-change-content">
        <p>
          Username: <span>{userData.username}</span>
        </p>
        <form className="dashboard-input" onSubmit={handleSubmitUsername}>
          <p>Change your username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {<span className="dashboard-error">{error.usernameError}</span>}
          <button type="submit">Save Changes</button>
        </form>
      </div>

      {/* email */}
      <div className="dashboard-change-content">
        <p>
          Email: <span>{userData.email}</span>
        </p>
        <form className="dashboard-input" onSubmit={handleSubmitEmail}>
          <p>Change your email</p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {<span className="dashboard-error">{error.emailError}</span>}

          <button type="submit">Save Changes</button>
        </form>
      </div>
      {/* password */}
      <div className="dashboard-change-content">
        <p>Password </p>
        <form className="dashboard-input" onSubmit={handleSubmitPassword}>
          <p>Change your password</p>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {<span className="dashboard-error">{error.passwordError}</span>}

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default ChangeInfo;
