"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApproveUserPopupSchema } from "@/schemas"; // Import centralized schema
import { z } from "zod";
import { approveUserWithData } from "@/actions/adminActions";

// ShadCN form components
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type ApproveUserPopupSchemaType = z.infer<typeof ApproveUserPopupSchema>;

interface ApproveUserPopupProps {
  user: { id: string; firstname: string; email: string };
  onClose: () => void;
}

const ApproveUserPopup: React.FC<ApproveUserPopupProps> = ({ user, onClose }) => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<ApproveUserPopupSchemaType>({
    resolver: zodResolver(ApproveUserPopupSchema),
    defaultValues: {
      groupId: "",
      whitelisted: true,
      allowedTradingAmountFrom: 0,
      allowedTradingAmountTo: 0,
      adminFee: 0,
      userProfit: 0,
      introducerFee: 0,
    },
  });

  const onSubmit = (values: ApproveUserPopupSchemaType) => {
    setError("");
    startTransition(async () => {
      const response = await approveUserWithData(user.id, values);
      if (response?.error) {
        setError(response.error);
      } else {
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-900 p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl text-white font-bold mb-4">
          Approve User: {user.firstname} ({user.email})
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Group Select */}
            <FormField
              control={form.control}
              name="groupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group</FormLabel>
                  <FormControl>
                    <select {...field} className="bg-gray-800 text-white w-full p-2 rounded focus:outline-none">
                      <option value="">Select group</option>
                      <option value="1">VIP</option>
                      <option value="2">TRADER 60</option>
                      <option value="3">TRADER 70</option>
                      <option value="4">TRADER 80</option>
                      <option value="5">TRADER 90</option>
                      <option value="6">TRADER 95</option>
                      <option value="7">SPONSOR</option>
                      <option value="8">ANTS</option>
                      <option value="10">HIGH</option>
                      <option value="11">MEDIUM</option>
                      <option value="12">LOW</option>
                    </select>
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.groupId && form.formState.errors.groupId.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Whitelisted Checkbox */}
            <FormField
              control={form.control}
              name="whitelisted"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className="mr-2"
                  />
                  <FormLabel className="m-0">Whitelisted</FormLabel>
                </FormItem>
              )}
            />

            {/* Allowed Trading Amount From */}
            <FormField
              control={form.control}
              name="allowedTradingAmountFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allowed Trading Amount From</FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      {...field}
                      placeholder="Minimum trading amount"
                      className="bg-gray-800 text-white w-full p-2 rounded"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.allowedTradingAmountFrom &&
                      form.formState.errors.allowedTradingAmountFrom.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Allowed Trading Amount To */}
            <FormField
              control={form.control}
              name="allowedTradingAmountTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allowed Trading Amount To</FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      {...field}
                      placeholder="Maximum trading amount"
                      className="bg-gray-800 text-white w-full p-2 rounded"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.allowedTradingAmountTo &&
                      form.formState.errors.allowedTradingAmountTo.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Admin Fee */}
            <FormField
              control={form.control}
              name="adminFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Fee</FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      {...field}
                      placeholder="e.g. 50"
                      className="bg-gray-800 text-white w-full p-2 rounded"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.adminFee && form.formState.errors.adminFee.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* User Profit */}
            <FormField
              control={form.control}
              name="userProfit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Profit (%)</FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      {...field}
                      placeholder="e.g. 20"
                      className="bg-gray-800 text-white w-full p-2 rounded"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.userProfit && form.formState.errors.userProfit.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Introducer Fee */}
            <FormField
              control={form.control}
              name="introducerFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Introducer Fee (%)</FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      {...field}
                      placeholder="e.g. 10"
                      className="bg-gray-800 text-white w-full p-2 rounded"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.introducerFee && form.formState.errors.introducerFee.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ApproveUserPopup;
