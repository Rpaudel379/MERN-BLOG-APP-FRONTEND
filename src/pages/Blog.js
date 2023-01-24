import React, { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { IoIosArrowDropleft } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "./Error";

const Blog = () => {
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const getBlog = async () => {
      try {
        const fetch = await axios.get(
          process.env.REACT_APP_BACKEND + "/api/blogs/singleblog",
          {
            headers: { blogId: id },
          }
        );
        const response = await fetch.data;
        if (response) {
          setBlog(response);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getBlog();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!blog) {
    const message = {
      first: "no blog found ",
      second: "go back",
      link: "/",
    };

    return <Error title="no blog found" textContent={message} />;
  }

  const { image, title, body, createdAt, name } = blog;

  const handleImage = () => {
    let newTab = window.open();
    newTab.document.body.innerHTML = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>image</title>
    
        <style>
            img {
                object-fit: contain;
                height: 100vh;
                width: 100vw;
            }
        </style>
    </head>
    
    <body>
    
        <img src='${image}' alt='${name}'>
    
    </body>
    
    </html>`;
    /*  let imageTab = new Image();
    imageTab.src = image;
    newTab.document.body.appendChild(imageTab) 
    */
    //?     newTab.document.write(imageTab.outerHTML);
  };
  return (
    <>
      <div className="go-back">
        <Link to="/">
          <IoIosArrowDropleft />
        </Link>
      </div>
      <section className="section-blog container">
        <div className="img-cont">
          <img src={image} alt="img" onClick={handleImage} />
        </div>
        <div className="content">
          <div className="date">
            <p>
              <BiCalendar />
            </p>
            <p>
              {new Date(createdAt).toDateString()} by <span>{name}</span>
            </p>
          </div>
          <h3>{title}</h3>
          <p className="text">{body}</p>
        </div>
      </section>
    </>
  );
};

export default Blog;
