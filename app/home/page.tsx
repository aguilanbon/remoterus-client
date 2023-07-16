import NavigationBar from "@/components/NavigationBar";
import { USER_PROFILE_URL } from "@/lib/constants/api_constants";
import { User } from "@/lib/types/user.types";
import { cookies } from "next/dist/client/components/headers";
import React from "react";

async function getUserProfile() {
  const nextCookie = cookies();
  const jwtCookie = nextCookie.get("jwt");
  const res = await fetch(USER_PROFILE_URL, {
    headers: {
      Cookie: `jwt=${jwtCookie?.value}`,
    },
  });
  const data = await res.json();
  return data.data;
}

async function HomePage() {
  const data: User = await getUserProfile();
  const nextCookie = cookies();
  const jwtCookie = nextCookie.get("jwt");
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full fixed">
        <NavigationBar userDetails={data} token={jwtCookie?.value ?? ""} />
      </div>
      <div className="w-full mt-16 p-4"></div>
    </div>
  );
}

export default HomePage;
