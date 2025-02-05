import React from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";

function Layout() {
  return (
    <div className=" h-full bg-slate-800 flex flex-col items-center">
      <div className="flex-[1] flex justify-center items-center min-w-screen-xl">
        <Header />
      </div>
      <div className="flex-[2]  h-full flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
