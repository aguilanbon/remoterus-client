"use client";

import React from "react";
import { CardContent } from "../ui/card";
import { EditIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { User, fullName } from "@/lib/types/user.types";
import { Label } from "@radix-ui/react-label";

function AccountDetails({ user }: { user: User }) {
  const date = new Date(Date.parse(user.personalInformation.birthdate));

  let formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <CardContent>
      <div className="w-full flex justify-between">
        <div className="w-full flex justify-between py-2">
          <h1 className="text-2xl">Account Details</h1>
          <div className="">
            <EditIcon
              className="w-8 h-8 p-2 rounded-full bg-green-300 text-alt-black cursor-pointer hover:bg-green-400"
              aria-label="Edit profile"
            />
          </div>
        </div>
      </div>
      <Separator />
      <div className="mt-6">
        <h2 className="text-lg text-slate-400 text-muted">Username</h2>
        <h3 className="text-xl mb-4">{user.username}</h3>
        <h2 className="text-lg text-slate-400 text-muted">First name</h2>
        <h3 className="text-xl mb-4">{user.personalInformation.name.first}</h3>
        <h2 className="text-lg text-slate-400 text-muted">Last name</h2>
        <h3 className="text-xl mb-4">{user.personalInformation.name.last}</h3>
        <h2 className="text-lg text-slate-400 text-muted">Birth date</h2>
        <h3 className="text-xl mb-4">{formattedDate}</h3>
        <h2 className="text-lg text-slate-400 text-muted">Mobile No.</h2>
        <h3 className="text-xl mb-4">{user.personalInformation.mobileNo}</h3>
        <h2 className="text-lg text-slate-400 text-muted">Street</h2>
        <h3 className="text-xl mb-4">
          {user.personalInformation.address.street ?? "N/A"}
        </h3>
        <h2 className="text-lg text-slate-400 text-muted">State</h2>
        <h3 className="text-xl mb-4">
          {user.personalInformation.address.state ?? "N/A"}
        </h3>
        <h2 className="text-lg text-slate-400 text-muted">Zipcode</h2>
        <h3 className="text-xl mb-4">
          {user.personalInformation.address.zipcode ?? "N/A"}
        </h3>
        <h2 className="text-lg text-slate-400 text-muted">Country</h2>
        <h3 className="text-xl mb-4">
          {user.personalInformation.address.country ?? "N/A"}
        </h3>
      </div>
    </CardContent>
  );
}

export default AccountDetails;
