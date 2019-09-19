// import React, { useState } from "react";
import React from "react";

const Poster = props => {

  const filterImage = () => {
    var result = props.images.filter((image) => image.type === "POSTER");
    return result
  }
  return (
    <div>
      <img src={filterImage()[0].url} alt={props.title}/>
      <h3>{props.title}</h3>
    </div>
  );
};

export default Poster;
