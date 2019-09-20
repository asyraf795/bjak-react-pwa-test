import React from "react";
import "./Poster.css"

const Poster = props => {
  const filterImage = () => {
    var result = props.images.filter(image => image.type === "POSTER");
    return result;
  };

  const href = "https://localhost:3000/movie?id=" + props.id;
  const handleOnDragStart = e => e.preventDefault()

  return (
    <a href={href} onDragStart={handleOnDragStart}>
      <div className="imgMax">
        <img src={filterImage()[0].url} alt={props.title} />
        <h3 className="fontSize">{props.title}</h3>
      </div>
    </a>
  );
};

export default Poster;
