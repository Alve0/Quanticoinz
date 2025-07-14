import React from "react";
import video from "../../Assets/videobannerloop.mp4";

function VibeCode() {
  return (
    <div className="mx-4 md:mx-10 lg:mx-30 text-white">
      <div className="card lg:card-side bg-gradient-to-t p-5 from-[#a14d65] to-[#C55E7C] shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-2xl md:text-4xl">Stuck at vibe coding?</h2>
          <p className="text-lg md:text-xl">
            Get matched with the right expert to turn your prototype into a{" "}
            <br />
            real, working product.
          </p>
          <div className="card-actions justify-start">
            <button className="btn">Find an expert</button>
          </div>
        </div>
        <figure className="w-full lg:w-1/2">
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="rounded-2xl w-full h-full object-cover"
          ></video>
        </figure>
      </div>
    </div>
  );
}

export default VibeCode;
