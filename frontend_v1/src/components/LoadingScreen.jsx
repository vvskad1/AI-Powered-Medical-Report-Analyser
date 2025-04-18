import React from "react";
import "./LoadingScreen.css";
import loaderImg from "../assets/load.png";

export default function LoadingScreen({ progress }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white space-y-6">
      {/* Horizontal Row */}
      <div className="flex items-center justify-center gap-6">
        <img src={loaderImg} alt="Loader" className="heart-loader" />
        <h2 className="text-2xl font-bold text-[#1f2937]">
          Analyzing your reports...
        </h2>
      </div>

      <div className="progress-bar-background">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="progress-text">{progress}% Completed</p>
    </div>
  );
}
