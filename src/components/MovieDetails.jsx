import React from "react";

const MovieDetails = ({ selectedId, onCloseMovie }) => {
  return (
    <div className="details">
      {selectedId}
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
    </div>
  );
};

export default MovieDetails;