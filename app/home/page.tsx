import NavigationBar from "@/components/NavigationBar";
import React from "react";

// async function getUserProfile() {
//   const nextCookie = cookies();
//   const jwtCookie = nextCookie.get("jwt");
//   const res = await fetch(USER_PROFILE_URL, {
//     headers: {
//       Cookie: `jwt=${jwtCookie?.value}`,
//     },
//     cache: "no-store",
//   });
//   const data = await res.json();
//   const userData: User = {
//     ...data.data,
//   };
//   if (res.ok) {
//     return userData;
//   } else {
//     throw new Error("Auth is required to access this page.");
//   }
// }

async function HomePage() {
  // const data: User = await getUserProfile();
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full fixed">
        <NavigationBar />
      </div>
      <div className="w-full mt-16 p-4"></div>
    </div>
  );
}

export default HomePage;
