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
      <div className="w-3/4 mt-16 p-4">
        <section className="w-1/4 flex items-center justify-center flex-col">
          <Card>
            <CardHeader>
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
              <CardDescription>Position</CardDescription>
            </CardContent>
          </Card>
        </section>
        <section></section>
      </div>
    </div>
  );
}

export default ProfilePage;
