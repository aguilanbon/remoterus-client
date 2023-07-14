import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon, ChatBubbleIcon, RocketIcon } from "@radix-ui/react-icons";
import { Users } from "lucide-react";
import GlobalSearch from "./GlobalSearch";

function NavigationBar() {
  return (
    <div className="w-full h-16 flex p-4">
      <div className="w-full flex items-center justify-start">
        <RocketIcon className="h-8 w-8 text-white" />
      </div>
      <div className="w-full flex items-center justify-center">
        <GlobalSearch />
      </div>
      <div className="w-full flex items-center justify-end space-x-8">
        <Users className="h-10 w-10 text-white cursor-pointer hover:text-green-300 hover:border-b-2 p-2 hover:border-green-300" />
        <ChatBubbleIcon className="h-10 w-10 text-white cursor-pointer hover:text-green-300 hover:border-b-2 p-2 hover:border-green-300" />
        <BellIcon className="h-10 w-10 text-white cursor-pointer hover:text-green-300 hover:border-b-2 p-2 hover:border-green-300" />
        <Avatar className="border-4 border-green-500 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default NavigationBar;
