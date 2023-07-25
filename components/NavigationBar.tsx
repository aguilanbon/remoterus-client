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
import { User, fullName } from "@/lib/types/user.types";
import { SIGNOUT_URL, USER_PROFILE_URL } from "@/lib/constants/api_constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import { useAtom } from "jotai";
import { strAtomWithPersistence, userAtom } from "@/lib/store/user.store";

// const fetcher = (url: RequestInfo | URL, jwt: String) =>
//   fetch(url, {
//     credentials: "include",
//     headers: {
//       Cookie: `jwt=${jwt}`,
//     },
//   }).then((r) => r.json());

function NavigationBar() {
  const [userDetails] = useAtom(strAtomWithPersistence);
  const jwt = userDetails?.authentication.accessToken;
  // const { data } = useSWR([USER_PROFILE_URL, jwt], ([url, jwt]) =>
  //   fetcher(url, jwt ?? "token")
  // );

  const router = useRouter();

  const name: fullName = {
    name:
      userDetails?.personalInformation?.name.first +
      " " +
      userDetails?.personalInformation?.name.last,
  };

  const handleLogout = async () => {
    await fetch(SIGNOUT_URL, {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: `jwt=${jwt}`,
      },
    });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="w-full h-16 flex p-4">
      <div className="w-full flex items-center justify-start">
        <Link href={"/home"}>
          <RocketIcon className="h-8 w-8 text-white" />
        </Link>
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
            <DropdownMenuLabel>
              {/* Your Name */}
              {name.name}{" "}
              <span className="opacity-50">{`@${userDetails?.username}`}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/profile"}>
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default NavigationBar;
