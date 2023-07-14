"use client";

import React from "react";
import { Input } from "./ui/input";

function GlobalSearch() {
  return (
    <div className="flex justify-center items-center py-4 w-full">
      <Input
        placeholder="Search for something..."
        onChange={(event) => console.log(event.target.value)}
        className="w-96 text-white"
      />
    </div>
  );
}

export default GlobalSearch;
