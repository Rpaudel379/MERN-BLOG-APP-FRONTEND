import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="login-line">
      <Link to="/login" className="btn">
        LOGIN
      </Link>
      <p>to post your blog</p>
    </div>
  );
};

export default Login;
