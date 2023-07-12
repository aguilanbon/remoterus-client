"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { errorText } from "../customui/form_error";

const formSchema = z
  .object({
    username: z.string().nonempty({ message: "Username must not be empty." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().nonempty({ message: "Password must not be empty." }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Password must not be empty." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match.",
    path: ["confirmPassword"],
  });

function SignUpForm() {
  const [signUpError, setSignUpError] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignUp = async (values: z.infer<typeof formSchema>) => {
    // try {
    //   const res = await fetch(signInUser, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values),
    //   });
    //   const data = await res.json();
    //   if (data.isError === true) {
    //     setSignUpError("Invalid username or password.");
    //   } else {
    //     router.push("/profile");
    //     form.reset();
    //     setSignUpError("");
    //     toast({
    //       duration: 5000,
    //       variant: "default",
    //       title: "Success!",
    //       description: "Welcome back! What's up?",
    //     });
    //   }
    // } catch (error) {
    //   toast({
    //     duration: 5000,
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description: "There was a problem with your request.",
    //   });
    // }
  };
  return (
    <div className="w-full">
      <Form {...form}>
        {signUpError !== "" ? errorText(signUpError) : <></>}
        <form
          onChange={() => setSignUpError("")}
          onSubmit={form.handleSubmit(handleSignUp)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex items-end justify-end">
            <Button type="submit" className="w-full space-y-4 mb-4">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default SignUpForm;
