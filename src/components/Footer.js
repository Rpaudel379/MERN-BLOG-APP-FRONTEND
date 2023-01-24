import React from "react";
import { IoIosArrowDropup } from "react-icons/io";
const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Made by <span>Anish Paudel</span> . 20 Jan 2020
      </p>
      <div onClick={(e) => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <IoIosArrowDropup className="up" />
      </div>
    </footer>
  );
};

export default Footer;
