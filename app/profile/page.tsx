import NavigationBar from "@/components/NavigationBar";
import { USER_PROFILE_URL } from "@/lib/constants/api_constants";
import { User, fullName } from "@/lib/types/user.types";
import { cookies } from "next/dist/client/components/headers";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ActivityLogIcon,
  BackpackIcon,
  GearIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getUserProfile() {
  const nextCookie = cookies();
  const jwtCookie = nextCookie.get("jwt");
  const res = await fetch(USER_PROFILE_URL, {
    headers: {
      Cookie: `jwt=${jwtCookie?.value}`,
    },
    cache: "no-store",
  });
  const data = await res.json();
  const userData: User = {
    ...data.data,
    accessToken: jwtCookie?.value,
  };
  if (res.ok) {
    return userData;
  } else {
    throw new Error("Auth is required to access this page.");
  }
}

async function ProfilePage() {
  const data: User = await getUserProfile();
  const name: fullName = {
    name:
      data?.personalInformation?.name.first +
      " " +
      data?.personalInformation?.name.last,
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full fixed">
        <NavigationBar userDetails={data} />
      </div>
      <div className="w-3/4 mt-16 p-4 flex">
        <Tabs defaultValue="feed" className="w-full flex">
          <section className="w-1/4 flex items-center justify-center flex-col mr-4">
            <Card className="bg-primary text-white outline-none border-none w-[300px]">
              <CardHeader className="flex items-center justify-center">
                <Avatar className="w-36 h-36">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </CardHeader>
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
            </Card>
          </section>
          <section className="w-full flex items-center justify-start flex-col">
            <Card className="bg-alt-black text-white outline-none border-none w-full p-4 shadow-lg">
              <CardContent>
                <TabsContent value="feed">feed</TabsContent>
                <TabsContent value="jobs">jobs</TabsContent>
                <TabsContent value="account">account</TabsContent>
                <TabsContent value="settings">settings</TabsContent>
              </CardContent>
            </Card>
          </section>
        </Tabs>
      </div>
    </div>
  );
}

export default ProfilePage;

//  <Button
//                 variant={"ghost"}
//                 className="w-full mb-2 border border-slate-800 flex items-start justify-start"
//               >
//                 <ActivityLogIcon className="mr-2" />
//                 Feed
//               </Button>
//               <Button
//                 variant={"ghost"}
//                 className="w-full mb-2 border border-slate-800 flex items-start justify-start"
//               >
//                 <BackpackIcon className="mr-2" />
//                 Jobs
//               </Button>
//               <Button
//                 variant={"ghost"}
//                 className="w-full mb-2 border border-slate-800 flex items-start justify-start"
//               >
//                 <PersonIcon className="mr-2" />
//                 Account Details
//               </Button>
//               <Button
//                 variant={"ghost"}
//                 className="w-full mb-2 border border-slate-800 flex items-start justify-start"
//               >
//                 <GearIcon className="mr-2" />
//                 Settings
//               </Button>
