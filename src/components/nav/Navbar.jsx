import React from "react";
import Logo from "./Logo";
import NumResults from "./NumResults";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults />
    </nav>
  );
};

export default Navbar;
