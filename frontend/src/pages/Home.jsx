import React from "react";
import { TbLockBolt } from "react-icons/tb";
function Home() {
  return (
    <div
      className="hero h-screen w-full"
      style={{
        backgroundImage:
          "url(https://firebasestorage.googleapis.com/v0/b/mentor-61921.appspot.com/o/bg.sss.jpg?alt=media&token=ad55cc4e-613a-47a3-99cf-290db9686502)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-5xl text-white ">
          <span className="text-3xl text-center md:text-6xl flex justify-center font-bold md:mb-24">
          ChainLegit <TbLockBolt className="ml-3" />
          </span>
          <p className="mb-5 font font-semibold md:text-3xl">

          ChainLegit: Transforming legal document exchange with blockchain for secure, efficient transactions. Join us to reshape the legal landscape with seamless, secure exchanges.          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
