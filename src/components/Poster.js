import React from "react";
import { Link } from "react-router-dom"
import "./Poster.css"

const Poster = props => {
  const filterImage = () => {
    var result = props.images.filter(image => image.type === "POSTER");
    return result;
  };

  const href = "/movie/" + props.id;

  const handleOnDragStart = e => e.preventDefault()

  return (
    <div className="d-flex justify-content-center" onDragStart={handleOnDragStart}>
      <Link to={href} className="btn btn-link text-light">
        <img className="img-fluid" src={filterImage()[0].url} alt={props.title} />
        <h3 className="fontSize">{props.title}</h3>
      </Link>    
    </div>
  );
  
};

export default Poster;
