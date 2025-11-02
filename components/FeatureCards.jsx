import React from "react";
import FeatureCard from "./FeatureCard";

const FeatureCards = ({
  onFileSelect,
  onVideoSelect,
  onImageUrlSelect,
  onVideoUrlSelect,
  onDeepfakeSelect,
}) => {
  return (
    <div className="flex flex-col items-start w-full px-5 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-1xl">
        {/* Photo Upload */}
        <FeatureCard type="photo" onFileSelect={onFileSelect} />

        {/* Video Upload */}
        <FeatureCard type="video" onVideoSelect={onVideoSelect} />

        {/* Split URL section */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 gap-8">
          <FeatureCard type="image_url" onUrlSelect={onImageUrlSelect} />
          <FeatureCard type="video_url" onUrlSelect={onVideoUrlSelect} />
        </div>

        {/* Deepfake Detection */}
        <div className="md:col-span-2">
          <FeatureCard type="deepfake" onFileSelect={onDeepfakeSelect} />
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
