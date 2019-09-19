import React from "react";

import Poster from "./Poster";

const Board = props => {
  const posterComponents = props.data.map(poster => (
    <Poster title={poster.title} images={poster.images} key={poster.id} />
  ));
  return (
    <div>
      <h2>{props.name}</h2>
      {posterComponents}
      <hr></hr>
    </div>
  );
};

export default Board;
