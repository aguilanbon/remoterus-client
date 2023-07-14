import React from "react";

// interface SpinnerProps {
//   size: string;
//   color: string;
// }

const Spinner = () => {
  return (
    <div className="relative">
      <div className={`w-8 h-8 rounded-full`}></div>
      <div
        className={`absolute top-0 left-0 flex items-center justify-center w-8 h-8`}
      >
        <div
          className={`w-8 h-8 rounded-full border-4 border-white border-t-transparent animate-spin`}
        ></div>
      </div>
    </div>
  );
};

export default Spinner;
