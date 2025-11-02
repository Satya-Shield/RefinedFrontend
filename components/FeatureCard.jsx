import React, { useState } from "react";
import { FaImage, FaLink, FaVideo, FaRobot } from "react-icons/fa";

const FeatureCard = ({ type, onFileSelect, onUrlSelect, onVideoSelect }) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const cardConfig = {
    photo: {
      icon: <FaImage className="w-8 h-8 text-gray-800 mb-3" />,
      title: "Add a photo to verify",
      description: "Upload an image that supports your claim.",
    },
    video: {
      icon: <FaVideo className="w-8 h-8 text-gray-800 mb-3" />,
      title: "Add a video to verify",
      description: "Upload a video file that supports your claim.",
    },
    image_url: {
      icon: <FaLink className="w-8 h-8 text-gray-800 mb-3" />,
      title: "Verify via Image URL",
      description: "Paste an image URL to check authenticity.",
    },
    video_url: {
      icon: <FaLink className="w-8 h-8 text-gray-800 mb-3" />,
      title: "Verify via Video URL",
      description: "Paste a video URL to verify its source.",
    },
    deepfake: {
      icon: <FaRobot className="w-8 h-8 text-gray-800 mb-3" />,
      title: "Detect Deepfake",
      description: "Upload a video to detect deepfake content.",
    },
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect?.(selectedFile);
    }
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    onUrlSelect?.(value);
  };

  const handleVideoFileChange = (e) => {
    const selectedVideoFile = e.target.files[0];
    if (selectedVideoFile) {
      setVideoFile(selectedVideoFile);
      onVideoSelect?.(selectedVideoFile);
    }
  };

  const config = cardConfig[type];
  if (!config) return null;

  const CustomFileInput = ({
    id,
    accept,
    onChange,
    selectedFile,
    buttonText,
  }) => (
    <div className="flex items-center mt-3">
      <label
        htmlFor={id}
        className="px-4 py-2 bg-gradient-to-r from-red-900 to-blue-900 text-white text-sm font-medium rounded-l-lg cursor-pointer hover:opacity-90 transition-all duration-300"
      >
        {buttonText}
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        onChange={onChange}
        className="hidden"
      />
      <span className="flex-grow px-3 py-2 text-sm text-gray-800 border border-l-0 border-gray-300 rounded-r-lg bg-white/60 backdrop-blur-sm truncate">
        {selectedFile ? selectedFile.name : "No file chosen"}
      </span>
    </div>
  );

  return (
    <div className="p-6 rounded-3xl bg-white/30 backdrop-blur-xl border border-gray-200/40 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {config.icon}
      <h5 className="mb-1 text-lg font-semibold text-gray-800">{config.title}</h5>
      <p className="mb-3 text-sm text-gray-600">{config.description}</p>

      {type === "photo" && (
        <CustomFileInput
          id="photo-upload"
          accept="image/*"
          onChange={handleFileChange}
          selectedFile={file}
          buttonText="Choose File"
        />
      )}

      {type === "video" && (
        <CustomFileInput
          id="video-upload"
          accept="video/*"
          onChange={handleVideoFileChange}
          selectedFile={videoFile}
          buttonText="Choose File"
        />
      )}

      {(type === "image_url" || type === "video_url") && (
        <input
          type="text"
          placeholder="Enter the URL"
          value={url}
          onChange={handleUrlChange}
          className="w-full p-3 bg-white/30 backdrop-blur-xl border border-gray-200/30 rounded-xl text-gray-800 placeholder:text-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all duration-300 hover:shadow-lg"
        />
      )}

      {type === "deepfake" && (
        <CustomFileInput
          id="deepfake-upload"
          accept="image/*"
          onChange={handleFileChange}
          selectedFile={file}
          buttonText="Upload Image"
        />
      )}
    </div>
  );
};

export default FeatureCard;
