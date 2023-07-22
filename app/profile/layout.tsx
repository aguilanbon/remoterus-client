import React from "react";

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full min-h-screen">{children}</div>;
}

export default ProfileLayout;
