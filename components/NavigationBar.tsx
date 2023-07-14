"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon, ChatBubbleIcon, RocketIcon } from "@radix-ui/react-icons";
import { Users } from "lucide-react";
import GlobalSearch from "./GlobalSearch";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
        {/* Messages */}
        <Sheet>
          <SheetTrigger asChild>
            <ChatBubbleIcon className="h-10 w-10 text-white cursor-pointer hover:text-green-300 hover:border-b-2 p-2 hover:border-green-300" />
          </SheetTrigger>
          <SheetContent className="bg-alt-black border-0">
            <SheetHeader>
              <SheetTitle className="text-white">Messages</SheetTitle>
              <SheetDescription className="text-white">
                See all your messages here.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose asChild></SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        {/* Notifications */}
        <Dialog>
          <DialogTrigger>
            <BellIcon className="h-10 w-10 text-white cursor-pointer hover:text-green-300 hover:border-b-2 p-2 hover:border-green-300" />
          </DialogTrigger>
          <DialogContent className="bg-alt-black border-0 text-white">
            <DialogHeader>
              <DialogTitle>Notifications</DialogTitle>
              <DialogDescription>See your notifications.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="border-4 border-green-500 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Your Name</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default NavigationBar;
