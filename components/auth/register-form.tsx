"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
import { PhoneInput } from "react-international-phone";
import { useRouter } from "next/navigation";

import "react-international-phone/style.css"
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
import router from "next/router";

export const RegisterForm: React.FC = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
      country: "",
      metamask: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    // Clear previous messages
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const data = await register(values);
        // Assuming your register action returns an object with error and success keys
        if (data.error) {
          setError(data.error);
        } else if (data.success) {
          setSuccess(data.success);
          setTimeout(() => {
            router.push("/auth/login");
      }, 2000);
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again later.");
      }
    });
  };

  return (
    <div>
      <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        disabled={isPending}
                        placeholder="John"
                        className="bg-gray-900 w-full rounded-md p-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        disabled={isPending}
                        placeholder="Doe"
                        className="bg-gray-900 w-full rounded-md p-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                 control={form.control}
                 name="phone"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Phone Number</FormLabel>
                     <FormControl>
                       <PhoneInput
                         {...field}
                         defaultCountry="ng"
                         inputClassName="bg-gray-900 text-white w-full rounded-md p-2"
                         countrySelectorStyleProps={{
                           buttonClassName: "bg-gray-900 text-white rounded-l-md p-2",
                           dropdownStyleProps: {
                             className: "bg-gray-900 text-white"
                           }
                         }}
                         inputStyle={{ width: "100%" }}
                         disabled={isPending}
                         placeholder="812 345 6789"
                         onChange={(phone) => field.onChange(phone)}
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
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        disabled={isPending}
                        placeholder="Country"
                        className="bg-gray-900 w-full rounded-md p-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metamask"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metamask Wallet Address</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        disabled={isPending}
                        placeholder="0x..."
                        className="bg-gray-900 w-full rounded-md p-2"
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
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        disabled={isPending}
                        placeholder="john@example.com"
                        type="email"
                        className="bg-gray-900 w-full rounded-md p-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        disabled={isPending}
                        placeholder="********"
                        type="password"
                        className="bg-gray-900 w-full rounded-md p-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <button
              disabled={isPending}
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-2xl p-2 transition"
            >
              Create an account
            </button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
