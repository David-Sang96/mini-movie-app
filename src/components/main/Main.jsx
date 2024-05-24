import React from "react";
import ListBox from "./leftBox/ListBox";
import WatchBox from "./rightBox/WatchBox";

const Main = ({ tempMovieData, tempWatchedData }) => {
  return (
    <main className="main">
      <ListBox tempMovieData={tempMovieData} />
      <WatchBox tempWatchedData={tempWatchedData} />
    </main>
  );
};

export default Main;
