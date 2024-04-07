
import { useSDK } from "@metamask/sdk-react";
import React, { useState } from "react";
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
  const [account, setAccount] = useState('');
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
      try {
          const accounts = await sdk?.connect();
          setAccount(accounts?.[0]);
      } catch (err) {
          console.warn("failed to connect..", err);
      }
  };

  const user = []

  return (
    <div className="navbar fixed bg-gray-100 z-30">
      <div className="flex-1">
        <span className="btn btn-ghost normal-case text-xl"> Thrive Urban</span>
      </div>
      <div className="flex-none">
        .{" "}
        <button className=" ">
        <w3m-button />
        </button>
        <div className="App">
            <button style={{ padding: 10, margin: 10 }} onClick={connect}>
                Connect
            </button>
            {connected && (
                <div>
                    <>
                        {chainId && `Connected chain: ${chainId}`}
                        <p></p>
                        {account && `Connected account: ${account}`}
                    </>
                </div>
            )}
        </div>
        <Link
          className="hover:text-green-500 hidden sm:block text-lg  font-semibold mr-6 "
          to={"/posts"}
        >
          View Posts
        </Link>
        <Link
          className="hover:text-green-500 text-lg font-semibold mr-6 "
          to={"/createPost"}
        >
          Create Post
        </Link>
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
