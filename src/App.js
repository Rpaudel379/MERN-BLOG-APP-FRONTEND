import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.scss";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";

import Dashboard from "./pages/Dashboard";

// context
import { useGlobalContext } from "./context/context";

import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import AddBlog from "./pages/AddBlog";
// import LoadingMain from "./pages/LoadingMain";

import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
  // const { loading } = useGlobalContext();

  /*  if (loading) {
    return <LoadingMain />;
  } */

  return (
    <>
      <Router>
        <Navbar />
        <CacheSwitch>
          <CacheRoute exact path="/">
            <Home title="Home" bg="#fff" />
          </CacheRoute>
          <Route path="/login">
            <Login title="Login" bg="#284b63" />
          </Route>
          <Route path="/signup">
            <SignUp
              title="Signup"
              bg="linear-gradient(to right, #485563, #29323c)"
            />
          </Route>

          <Route path="/dashboard">
            <Dashboard title="Dashboard" bg="#fff" />
          </Route>
          <Route path="/addblog">
            <AddBlog title="Add Blog" />
          </Route>
          <Route path="/blog/:id">
            <Blog />
          </Route>

          <Route path="*">
            <Error title="404 error" />
          </Route>
        </CacheSwitch>
        <Footer />
      </Router>
    </>
  );
};

export default App;
