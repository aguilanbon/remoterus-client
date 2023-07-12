"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInUser } from "@/lib/constants/api_constants";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().nonempty({ message: "Username must not be empty." }),
  password: z.string().nonempty({ message: "Password must not be empty." }),
});

const errorText = (text: String) => {
  return (
    <div className="w-full flex items-center justify-center text-red-500 mb-4">
      {text}
    </div>
  );
};

function SignInForm() {
  const [signInError, setSignInError] = useState("");
  const router = useRouter();

  const signInForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSignIn = async (values: z.infer<typeof formSchema>) => {
    const res = await fetch(signInUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (data.isError === true) {
      setSignInError("Invalid username or password.");
    } else {
      router.push("/profile");
      signInForm.reset();
      setSignInError("");
    }
  };

  return (
    <Form {...signInForm}>
      {signInError !== "" ? errorText(signInError) : <></>}
      <form
        onChange={() => setSignInError("")}
        onSubmit={signInForm.handleSubmit(handleSignIn)}
      >
        <FormField
          control={signInForm.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Username or Email</FormLabel>
              <FormControl>
                <Input placeholder="Username or Email" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signInForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex items-end justify-end">
          <Button type="submit" className="w-full space-y-4 mb-4">
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SignInForm;
