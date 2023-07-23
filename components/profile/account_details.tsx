"use client";

import React, { useState } from "react";
import { CardContent } from "../ui/card";
import { EditIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { User } from "@/lib/types/user.types";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const formSchema = z.object({
  username: z.string().nonempty({ message: "Username must not be empty." }),
  firstName: z.string().nonempty({ message: "First name must not be empty." }),
  lastName: z.string().nonempty({ message: "Last name must not be empty." }),
  birthdate: z.date(),
  mobile: z.number(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
  country: z.string(),
});

function AccountDetails({ user }: { user: User }) {
  const [isEditForm, setIsEditForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      firstName: user.personalInformation.name.first,
      lastName: user.personalInformation.name.last,
      birthdate: new Date(user.personalInformation.birthdate),
      mobile: user.personalInformation.mobileNo,
      street: user.personalInformation.address.street,
      city: user.personalInformation.address.city,
      state: user.personalInformation.address.state,
      zipcode: user.personalInformation.address.zipcode,
      country: user.personalInformation.address.country,
    },
  });

  const toDate = new Date();
  const fromDate = new Date(
    toDate.getFullYear() - 100,
    toDate.getMonth(),
    toDate.getDate()
  );

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
              onClick={() => setIsEditForm((val) => !val)}
            />
          </div>
        </div>
      </div>
      <Separator />
      {!isEditForm ? (
        <div className="mt-6">
          <h2 className="text-lg text-slate-400 text-muted">Username</h2>
          <h3 className="text-xl mb-4">{user.username}</h3>
          <h2 className="text-lg text-slate-400 text-muted">First name</h2>
          <h3 className="text-xl mb-4">
            {user.personalInformation.name.first}
          </h3>
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
      ) : (
        <div className="mt-6">
          <Form {...form}>
            <form className="flex flex-col">
              <div className="w-full flex sm:flex-row flex-col justify-evenly">
                <div className="flex flex-col">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            autoFocus
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
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Firstname</FormLabel>
                        <FormControl>
                          <Input placeholder="Firstname" {...field} />
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
                        <FormLabel>Lastname</FormLabel>
                        <FormControl>
                          <Input
                            className="md:w-72 sm:64"
                            type="text"
                            placeholder="Lastname"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                                  "md:w-72 sm:64 pl-3 text-left font-normal bg-alt-black",
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
                              defaultMonth={
                                field.value ? field.value : undefined
                              }
                              disabled={(date: Date) => date > new Date()}
                              initialFocus
                              captionLayout="dropdown-buttons"
                              fromDate={fromDate}
                              toDate={toDate}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Your date of birth is used to calculate your age.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Mobile No.</FormLabel>
                        <FormControl>
                          <Input
                            className="md:w-72 sm:64"
                            placeholder="Mobile No."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-col">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input
                            className="md:w-72 sm:64"
                            placeholder="Street"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            className="md:w-72 sm:64"
                            placeholder="City"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input
                            className="md:w-72 sm:64"
                            placeholder="State"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipcode"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Zipcode</FormLabel>
                        <FormControl>
                          <Input
                            className="md:w-72 sm:64"
                            placeholder="Zipcode"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input
                            className="md:w-72 sm:64"
                            placeholder="Country"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full flex items-center justify-center mt-4 ">
                <Button
                  variant={"secondary"}
                  type="submit"
                  className="w-1/4 space-y-4 mb-4"
                >
                  Update
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </CardContent>
  );
}

export default AccountDetails;
