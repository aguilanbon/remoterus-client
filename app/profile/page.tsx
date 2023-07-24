import NavigationBar from "@/components/NavigationBar";
import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import AccountDetails from "@/components/profile/account_details";
import AvatarCard from "@/components/profile/avatar_card";

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
//     accessToken: jwtCookie?.value,
//   };
//   if (res.ok) {
//     return userData;
//   } else {
//     throw new Error("Auth is required to access this page.");
//   }
// }

async function ProfilePage() {
  // const data: User = await getUserProfile();
  // const name: fullName = {
  //   name:
  //     data?.personalInformation?.name.first +
  //     " " +
  //     data?.personalInformation?.name.last,
  // };
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full fixed">
        <NavigationBar />
      </div>
      <div className="w-3/4 mt-16 p-4 flex">
        <Tabs defaultValue="feed" className="w-full flex">
          <section className="w-1/4 flex items-center justify-start flex-col mr-4">
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
              <AvatarCard />
            </Card>
          </section>
          <section className="w-full flex items-center justify-start flex-col">
            <Card className="bg-alt-black text-white outline-none border-none w-full p-4 shadow-lg">
              <TabsContent value="feed">feed</TabsContent>
              <TabsContent value="jobs">jobs</TabsContent>
              <TabsContent value="account">
                <AccountDetails />
              </TabsContent>
              <TabsContent value="settings">settings</TabsContent>
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
