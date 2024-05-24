import React, { useState } from "react";
import WatchedList from "./WatchedList";
import WatchedSummary from "./WatchedSummary";

const WatchBox = ({ tempWatchedData }) => {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </>
      )}
    </div>
  );
};

export default WatchBox;
