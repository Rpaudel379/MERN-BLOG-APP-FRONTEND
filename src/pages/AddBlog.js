import React, { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useGlobalContext } from "../context/context";
import Loading from "../components/Loading";
import Error from "./Error";
import Tools from "../Tools";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useBlogProvider } from "../context/BlogContext";

const AddBlog = (props) => {
  document.title = "Add Your Blog";
  const history = useHistory();

  const { userData } = useGlobalContext();
  const { getAllBlogs, getMyBlogs } = useBlogProvider();

  const [imgName, setImgName] = useState("");
  const [img64, setImg64] = useState("");
  const [error, setError] = useState("");
  const [userErrors, setUserErrors] = useState();
  const [redirect, setRedirect] = useState(false);

  // loading indicator while using useEffect to check the user
  const [loading, setLoading] = useState(true);
  const [blogUploading, setBlogUploading] = useState(false);

  const handleImageChange = (e) => {
    const types = ["image/jpeg", "image/jpg", "image/png"];
    const selected = e.target.files[0];
    if (!types.includes(selected.type)) {
      setError("file type of jpeg jpg and png only");
      return;
    }
    setImgName(selected.name);
    let reader = new FileReader();
    reader.onerror = (e) => {
      setError(e.target.error);
    };
    reader.readAsDataURL(selected);
    reader.onload = (e) => {
      setImg64((prev) => e.target.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBlogUploading(true);

    const title = e.target.title.value;
    const body = e.target.body.value;

    try {
      const request = await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/blogs/addblog`,
        {
          title,
          body,
          image: img64,
          userId: userData.id,
          name: userData.username,
        }
      );

      const { success, newBlog } = await request.data;
      console.log(newBlog);

      if (success) {
        getAllBlogs();
        getMyBlogs();
        setRedirect(true);
        setTimeout(() => {
          history.push("/");
        }, 1000);
      } else {
        console.log("error");
      }

      /*   if (response) {
        setRedirect(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } */
    } catch (err) {
      //? if some errors while adding blog
      console.log(err.response);
      err.response.data && setUserErrors(err.response.data);
    }
    setBlogUploading(false);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        // In this request, the request will go to middleware to check if the
        // valid user is present, if not it will send 400 error
        // which will redirect user to the /login page
        // if valid user it wont redirect and continues the page

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/auth/checkUser`
        );

        const { validUser } = await response.data;

        if (validUser) {
          setLoading(false);
        } else {
          history.push("/login");
        }
      } catch (error) {
        console.log(error.response.data);
        history.push("/login");
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {redirect && (
        <div className="model">
          <div className="model-content">
            Blog added successfuly. now redirecting to Home page.
          </div>
        </div>
      )}

      <div className="add-blog container">
        <form
          onSubmit={handleSubmit}
          className={`${blogUploading ? "disable" : ""}`}
        >
          {error && <div className="blog-error">{error}</div>}
          <div className="form-error">{userErrors && userErrors.image}</div>
          <div className="input image">
            <label htmlFor="image">
              <FiUploadCloud className="icon" />
              <p>{imgName ? imgName : "select an image"}</p>
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-error">{userErrors && userErrors.title}</div>

          <div className="input">
            <input type="text" name="title" required placeholder="title" />
          </div>
          <div className="form-error">{userErrors && userErrors.body}</div>

          <div className="input">
            <textarea
              name="body"
              cols="30"
              rows="10"
              placeholder="body"
              required
            ></textarea>
          </div>
          <div className="input">
            <button className="add-button">
              {blogUploading ? "Uploading" : "Add Your Blog"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBlog;

/* 

 const textContent = {
    first: "unauthorized login ",
    second: "Login here",
  };


  if (!loading && !userData) {
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
    return (
      <Error title="content blocked" bg="#284b63" textContent={textContent} />
    );
  }
 */
