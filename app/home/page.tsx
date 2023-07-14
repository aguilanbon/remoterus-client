import NavigationBar from "@/components/NavigationBar";
import { NavigationMenuDemo } from "@/components/NavigationMenu";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import React from "react";

function HomePage() {
  return (
    <div className="w-full h-full flex ">
      <div className="w-full fixed">
        <NavigationBar />
      </div>
      <div className="w-full mt-16 p-4"></div>
    </div>
  );
}

export default HomePage;
