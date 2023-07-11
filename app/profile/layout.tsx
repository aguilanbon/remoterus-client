import React from "react";

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
}

export default ProfileLayout;
