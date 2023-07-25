"use client";

import React from "react";
import { CardContent, CardDescription } from "../ui/card";
import { TabsList, TabsTrigger } from "../ui/tabs";
import {
  ActivityLogIcon,
  BackpackIcon,
  GearIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { strAtomWithPersistence, userAtom } from "@/lib/store/user.store";
import { fullName } from "@/lib/types/user.types";

function AvatarCard() {
  const [user] = useAtom(strAtomWithPersistence);

  const name: fullName = {
    name:
      user?.personalInformation?.name.first +
      " " +
      user?.personalInformation?.name.last,
  };
  return (
    <CardContent className="w-full flex items-center justify-center flex-col">
      <h1 className="text-lg font-semibold">{name.name}</h1>
      <CardDescription className="mb-4">Position</CardDescription>
      <TabsList className="w-full h-full flex flex-col space-y-4 bg-primary">
        <TabsTrigger
          value="feed"
          className="w-full flex items-center justify-start text-md"
        >
          <ActivityLogIcon className="mr-2" />
          Feed
        </TabsTrigger>
        <TabsTrigger
          value="jobs"
          className="w-full flex items-center justify-start text-md"
        >
          <BackpackIcon className="mr-2" />
          Jobs
        </TabsTrigger>
        <TabsTrigger
          value="account"
          className="w-full flex items-center justify-start text-md"
        >
          <PersonIcon className="mr-2" />
          Account Details
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="w-full flex items-center justify-start text-md"
        >
          <GearIcon className="mr-2" />
          Settings
        </TabsTrigger>
      </TabsList>
      <CardContent></CardContent>
    </CardContent>
  );
}

export default AvatarCard;
