import React from "react";
import { TbLockBolt } from "react-icons/tb";

import { Link, useLocation, useNavigate } from "react-router-dom";

//context
// import { useUserAuth } from "../context/UserAuthContext";
function Navbar() {
  const navigate = useNavigate();
  // const { logOut, user } = useUserAuth();

  // const handleLogout = async () => {
  //   try {
  //     await logOut();

  //     navigate("/");
  //   } catch (error) {
  //     // console.log(error.message)
  //   }
  // };

  const user = []

  return (
    <div className="navbar fixed bg-gray-100 z-30 top-0">
      <div className="flex-1">
   <Link to={"/"}>     <span className="btn btn-ghost normal-case text-xl">  ChainLegit <TbLockBolt className="-ml-1" /> </span>
     </Link> </div>
      <div className="flex-none">
        .{" "}
        <button className=" ">
        
        </button>
        <Link
          className="hover:text-green-500 hidden sm:block text-lg  font-semibold mr-6 "
          to={"/viewDocs"}
        >
          View Docs
        </Link>
        <Link
          className="hover:text-green-500 text-lg font-semibold mr-6 "
          to={"/createPost"}
        >
          Upload Doc
        </Link>

        <w3m-button className="bg-slate-700 text-red-900" />

        {
          //if user is not logged in
          !user && (
            <>
              <Link
                className="hover:text-green-500 hidden sm:block text-lg font-semibold mr-6 "
                to={"/login"}
              >
                Login
              </Link>
              <Link
                className="hover:text-green-500 hidden sm:block text-lg font-semibold mr-6 "
                to={"/signUp"}
              >
                Sign UP
              </Link>
             
            </>
          )
        }
        {user?.uid && (
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
               
                <li></li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
