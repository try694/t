"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
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
import { login } from "@/actions/login";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

    const onSubmit = (values: z.infer<typeof LoginSchema>) =>{
      setError("");
      setSuccess("");
      startTransition(() => {
        login(values)
         .then((data) => {
          setError(data.error);
          setSuccess(data.success)
         })
      })
    }
  return (
    <div>
      <CardWrapper
        headerLabel="Welcome!"
        backButtonLabel="Don’t have an account?"
        backButtonHref="/auth/register"
        showSocial
      >
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
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
              Login
            </button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
