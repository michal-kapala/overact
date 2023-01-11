import NavBar from "./NavBar";
import Footer from "./Footer";
import React, { ReactNode } from "react";

interface LayoutProps {
  children? : ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return(
    <>
      {/* Page Container */}
      <div id="page-container" className="flex flex-col mx-auto w-full min-h-screen text-black bg-gray-50">
        <NavBar />
        {children}
        <Footer />
      </div>
    </>
  );
}
