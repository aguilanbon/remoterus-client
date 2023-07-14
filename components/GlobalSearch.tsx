"use client";

import React from "react";
import { Input } from "./ui/input";

function GlobalSearch() {
  return (
    <div className="flex justify-center items-center py-4 w-full">
      <Input
        placeholder="Search for something..."
        value={""}
        onChange={(event) => console.log(event.target.value)}
        className="lg:w-[600px] sm:w-96 w-full text-white"
      />
    </div>
  );
}

export default GlobalSearch;
