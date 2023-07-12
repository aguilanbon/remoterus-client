"use client";

import SignInForm from "@/components/forms/signin_form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "@/components/forms/signup_form";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-screen flex items-center justify-center">
        <Card className="w-96">
          <Tabs defaultValue="signin">
            <CardHeader>
              <TabsList className="w-full">
                <TabsTrigger value="signin" className="w-full">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="w-full">
                  Sign Up
                </TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="signin">
                <CardTitle className="mb-6 w-full text-center align-middle">
                  Welcome.
                </CardTitle>
                {/* Sign in Form */}
                <SignInForm />
              </TabsContent>
              <TabsContent value="signup">
                <CardTitle className="mb-6 w-full text-center align-middle">
                  Create your account.
                </CardTitle>
                {/* Sign up Form */}
                <SignUpForm />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
