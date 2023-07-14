import NavigationBar from "@/components/NavigationBar";
import React from "react";

function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full fixed">
        <NavigationBar />
      </div>
      <div className="w-full mt-16 p-4"></div>
    </div>
  );
}

export default HomePage;
