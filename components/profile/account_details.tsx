import React from "react";
import { CardContent } from "../ui/card";
import { EditIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { User, fullName } from "@/lib/types/user.types";

function AccountDetails({ user }: { user: User }) {
  const name: fullName = {
    name:
      user?.personalInformation?.name.first +
      " " +
      user?.personalInformation?.name.last,
  };
  return (
    <CardContent>
      <div className="w-full flex justify-between">
        <h1 className="text-2xl">Account Details</h1>
        <EditIcon />
      </div>
      <Separator />
      <div className="mt-6">{name.name}</div>
    </CardContent>
  );
}

export default AccountDetails;
