import React from "react";
import { FaMountainCity } from "react-icons/fa6";

function Home() {
  return (
    <div
      className="hero h-screen w-full"
      style={{
        backgroundImage:
          "url(https://firebasestorage.googleapis.com/v0/b/test-44e25.appspot.com/o/Picsart_23-09-24_05-46-56-573.jpg?alt=media&token=89e4cc87-2403-4f87-b149-11b4d3c58e76)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-5xl ">
          <span className="text-3xl text-center md:text-6xl flex justify-center font-bold md:mb-24">
            Thrive Urban <FaMountainCity className="ml-3" />
          </span>
          <p className="mb-5 font font-semibold md:text-3xl">
            Welcome to our road repair reporting web app, designed with you in
            mind. Our goal is to enhance the safety and quality of our
            community's roads through seamless collaboration between residents
            and our dedicated road maintenance teams.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
