import SignInForm from "@/components/forms/signin_form";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-screen flex items-center justify-center">
        {/* <div className="w-96 bg-white p-10 rounded-md"> */}
        <Card className="w-96 ">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Yo! Welcome back.</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
        {/* </div> */}
      </div>
    </div>
  );
}
