import React, { useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout({ children, notHome, toggleTheme }) {
  return (
    <div>
      <Nav notHome={notHome} toggleTheme={toggleTheme} />
      {children}
    </div>
  );
}
