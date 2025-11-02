import React from 'react';
import FeatureCard from './FeatureCard';

const FeatureCards = ({onFileSelect, onVideoSelect, onUrlSelect, onResult, onLoading}) => {
  return (
    <div className="flex flex-col items-start w-full px-5 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-1xl">
        <FeatureCard type="photo" onFileSelect={onFileSelect}/>
        <FeatureCard type="video"  onVideoSelect={onUrlSelect}/>
        <div className="md:col-span-2 -mt-0">
          <FeatureCard type="link" onUrlSelect={onUrlSelect}/>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;