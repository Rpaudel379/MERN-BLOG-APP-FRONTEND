import React from "react";

const SeperateImg = ({ image, name }) => {
  if (!name) {
    return <h1>no img</h1>;
  }

  return (
    <div>
      <img
        src={image}
        alt={name}
        style={{ height: "100vh", width: "100vw", objectFit: "contain" }}
      />
    </div>
  );
};

export default SeperateImg;
