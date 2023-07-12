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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { errorText } from "../customui/form_error";
import { Separator } from "../ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { SignUpProps } from "@/lib/types/form.types";
import { registerUser } from "@/lib/constants/api_constants";

const formSchema = z
  .object({
    username: z.string().nonempty({ message: "Username must not be empty." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .nonempty({ message: "Password must not be empty." })
      .min(8, { message: "Password must be atleast 8 characters." }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Password must not be empty." }),
    firstName: z
      .string()
      .nonempty({ message: "First name must not be empty." }),
    lastName: z.string().nonempty({ message: "Last name must not be empty." }),
    birthdate: z.date(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match.",
    path: ["confirmPassword"],
  });

const toDate = new Date();
const fromDate = new Date(
  toDate.getFullYear() - 100,
  toDate.getMonth(),
  toDate.getDate()
);

function SignUpForm() {
  const [signUpError, setSignUpError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  const handleSignUp = async (values: z.infer<typeof formSchema>) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDate = values.birthdate.toLocaleDateString("en-US", options);

    const payload: SignUpProps = {
      username: values.username,
      email: values.email,
      authentication: {
        password: values.password,
      },
      personalInformation: {
        name: {
          first: values.firstName,
          last: values.lastName,
        },
        birthdate: formattedDate,
      },
    };

    try {
      const res = await fetch(registerUser, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log(data);

      if (data.isError === true) {
        setSignUpError(data.message);
      } else {
        router.push("/profile");
        form.reset();
        setSignUpError("");
      }
    } catch (error) {}
  };
  return (
    <div className="w-full">
      <Form {...form}>
        {signUpError !== "" ? errorText(signUpError) : <></>}
        <form
          onChange={() => setSignUpError("")}
          onSubmit={form.handleSubmit(handleSignUp)}
          className="flex flex-col"
        >
          <div className="w-full flex sm:flex-row flex-col">
            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-72 sm:64"
                        placeholder="Username"
                        {...field}
                      />
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
                      <Input
                        className="md:w-72 sm:64"
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-72 sm:64"
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6"></div>
            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-72 sm:64"
                        placeholder="First name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-72 sm:64"
                        placeholder="Last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "md:w-72 sm:64 pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(date);
                            }
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Birth date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "md:w-72 sm:64 pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? field.value : undefined}
                          onSelect={(date: Date | undefined) => {
                            if (date) field.onChange(date);
                          }}
                          defaultMonth={field.value ? field.value : undefined}
                          disabled={(date: Date) => date > new Date()}
                          initialFocus
                          captionLayout="dropdown-buttons"
                          fromDate={fromDate}
                          toDate={toDate}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>A sample date of sorts.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex items-end justify-end mt-4">
            <Button type="submit" className="w-full space-y-4 mb-4 ">
              Sign up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default SignUpForm;
