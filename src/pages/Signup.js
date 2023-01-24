import React, { useState } from "react";
import Tools from "../Tools";
import { useGlobalContext } from "../context/context";
import axios from "axios";
import { useHistory } from "react-router-dom";
axios.defaults.withCredentials = true;

const Signup = (props) => {
  // react router dom for redirecting to homepage
  const history = useHistory();

  Tools(props); // title and background color

  const { userData, setUserData } = useGlobalContext();

  const [userErrors, setUserErrors] = useState();
  const [logged, setLogged] = useState(false);

  // ? handlesubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND + "/api/auth/signup",
        {
          username,
          email,
          password,
        }
      );

      const data = await response.data;
      console.log(data);
      setUserData(data);
      setLogged(true);
      setTimeout(() => {
        history.push("/");
      }, 2000);

      // axios
      //   .post(process.env.REACT_APP_BACKEND + "/signup", {
      //     username,
      //     email,
      //     password,
      //   })
      //   .then((res) => {
      //     const data = res.data;
      //     if (data) {
      //       // setUserData({ token: data.token, user: data.user });
      //       cookie.set("jwt", data.token, { expires: 5 });
      //       setLogged(true);
      //       setTimeout(() => {
      //         window.location.href = "/";
      //       }, 2000);
      //     }
      //   })
      //   .catch((err) => {
      //     // if error in signing up
      //     err.response.data && setUserErrors(err.response.data);
      //   });
    } catch (err) {
      console.log(err);
      err.response.data && setUserErrors(err.response.data);
    }
  };

  return (
    <div className="signup-page">
      {logged && (
        <div className="model">
          <div className="model-content">
            Registered successfuly. now redirecting to homepage.
          </div>
        </div>
      )}

      <h1 className="page-title">Signup page</h1>

      <div className="form-container">
        {userData ? (
          <p className="user-exists">Please logout first</p>
        ) : (
          <>
            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>
              <div className="form-error">
                {userErrors && userErrors.username}
              </div>

              <div className="input">
                <input type="text" name="username" required />
                <label>username</label>
              </div>
              <div className="form-error">{userErrors && userErrors.email}</div>
              <div className="input">
                <input type="text" name="email" required />
                <label>email</label>
              </div>
              <div className="form-error">
                {userErrors && userErrors.password}
              </div>
              <div className="input">
                <input type="password" name="password" required />
                <label>password</label>
              </div>
              <div className="input">
                <button className="signup-button">Signup</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
