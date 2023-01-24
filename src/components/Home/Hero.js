import React from "react";
import {
  AiOutlineInstagram,
  AiFillGithub,
  AiFillLinkedin,
} from "react-icons/ai";
const Hero = () => {
  return (
    <div className="hero">
      <h1>Welcome to the BLOG</h1>
      <p>
        This app is made by MERN stack. Here you can login / register and add
        blogs. Contact me in below icons.
      </p>
      <div className="icons">
        <a href="https://instagram.com/anish_paudel_damn1" target="blank">
          <AiOutlineInstagram />
        </a>
        <a href="https://github.com/Rpaudel379" target="blank">
          <AiFillGithub />
        </a>
        <a href="https://instagram.com/anish_paudel_damn1" target="blank">
          <AiFillLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Hero;
