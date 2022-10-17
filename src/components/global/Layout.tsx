import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import React, { ReactNode, FC } from "react";

export const Layout: FC<{children?: ReactNode}> = ({ children }) => {
    return(
        <>
        {/* Page Container */}
        <div id="page-container" className="flex flex-col mx-auto w-full min-h-screen bg-gray-50">
            <NavBar />
            {children}
            <Footer />
        </div>
        </>
    );
}