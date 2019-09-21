import React from "react";
import './Board.css';
import Poster from "./Poster";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Board = props => {
  const responsive=   {
    0: {
        items: 3
    },
    720: {
      items: 4
    },
    1024: {
        items: 6
    },
    1440: {
      items: 7
    }
}

  const posterComponents = props.data.map(poster => (
    <Poster title={poster.title} images={poster.images} key={poster.id} id={poster.id}/>
  ));

  return (
    <div>
      <h2>{props.name}</h2>
      <AliceCarousel
        responsive={responsive}
        fadeOutAnimation={true}
        mouseDragEnabled={true}
        dotsDisabled={true}
        infinite={true}
      >
        {posterComponents}
      </AliceCarousel>

      <hr className="dashingred" />
    </div>
  );
};

export default Board;
