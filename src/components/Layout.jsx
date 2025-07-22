import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />
      <main className="container mx-auto px-4 py-6">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
