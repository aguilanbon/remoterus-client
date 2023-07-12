import React from "react";

interface SpinnerProps {
  size: string;
  color: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size, color }) => {
  return (
    <div className="relative">
      <div className={`w-${size} h-${size} rounded-full`}></div>
      <div
        className={`absolute top-0 left-0 flex items-center justify-center w-${size} h-${size}`}
      >
        <div
          className={`w-${size} h-${size} rounded-full border-4 border-${color} border-t-transparent animate-spin`}
        ></div>
      </div>
    </div>
  );
};

export default Spinner;
