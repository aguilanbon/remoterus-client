import SignInForm from "@/components/forms/signin_form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-96 bg-white p-10 rounded-md">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
