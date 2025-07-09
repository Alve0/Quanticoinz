import React from "react";
import TiltedCard from "./TiltedCard";

function ListCards({ icons, name }) {
  return (
    <TiltedCard
      overlayContent={
        <div className="flex flex-col items-center justify-center text-black">
          <div className="text-3xl">{icons}</div>
          <div className="font-semibold text-sm mt-1 text-center">{name}</div>
        </div>
      }
      containerHeight="120px"
      containerWidth="120px"
      imageHeight="120px"
      imageWidth="120px"
      scaleOnHover={1.05}
      rotateAmplitude={8}
    />
  );
}

export default ListCards;
