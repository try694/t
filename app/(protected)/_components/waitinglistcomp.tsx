"use client";

import React, { useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import ApproveUserPopup from "./ApproveUserPopup";
import { IUser } from "@/interface";
import { getAllUsers } from "@/actions/waitinglist-action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Custom confirmation toast helper using React Toastify
const confirmToast = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const toastId = toast.info(
      <div>
        <p>{message}</p>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <button
            onClick={() => {
              resolve(true);
              toast.dismiss(toastId);
            }}
            style={{
              backgroundColor: "green",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              resolve(false);
              toast.dismiss(toastId);
            }}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  });
};

const WaitingListComp: React.FC = () => {
  const { data: users, mutate } = useSWR<IUser[]>("/pendingusers", getAllUsers);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  // Filter pending users (approved === false)
  const pendingUsers = users?.filter((u) => !u.approved) || [];

  const openApprovePopup = (user: IUser) => setSelectedUser(user);

  // Custom reject handler using react-toastify for confirmation
  const handleReject = async (userId: string) => {
    const confirmed = await confirmToast("Are you sure you want to reject this user?");
    if (confirmed) {
      // Here, replace this with your actual reject action if available.
      // For demonstration, we simply remove the rejected user from local state.
      if (users) {
        mutate(users.filter((u) => u.id !== userId));
      }
      toast.success("User rejected successfully!", { autoClose: 2000 });
    } else {
      // toast.info("Rejection cancelled.", { autoClose: 2000 });
    }
  };

  const closeApprovePopup = () => {
    setSelectedUser(null);
    mutate(); // Revalidate pending users list after approval/rejection
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed rounded-lg shadow-lg bg-black-gradient border border-gray-700 ">
        <thead>
          <tr className="bg-gray-900 text-gray-400 border-b border-gray-700">
            {/* Each header cell has a maximum width of about 15 characters */}
            <th className="p-3 text-left max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">First Name</th>
            <th className="p-3 text-left max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">Last Name</th>
            <th className="p-3 text-left max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">Phone</th>
            <th className="p-3 text-left max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">Country</th>
            <th className="p-3 text-left max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">Email</th>
            <th className="p-3 text-left max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">Group</th>
            <th className="p-3 text-left max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">Admin Fee</th>
            <th className="p-3 text-left max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">Introducer Fee</th>
            <th className="p-3 text-left max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.map((user) => (
            <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="p-3 text-white max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">{user.firstname}</td>
              <td className="p-3 text-white max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">{user.lastname}</td>
              <td className="p-3 text-white max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">{user.phone}</td>
              <td className="p-3 text-white max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">{user.country}</td>
              <td className="p-3 text-white max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">{user.email}</td>
              <td className="p-3 text-white max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">{user.groupId || "-"}</td>
              <td className="p-3 text-white max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">{user.adminFee != null ? user.adminFee : "-"}</td>
              <td className="p-3 text-white max-w-[15ch] overflow-hidden whitespace-nowrap text-ellipsis">{user.introducerFee != null ? user.introducerFee : "-"}</td>
              <td className="p-3">
  <div className="flex space-x-2">
    <button
      onClick={() => openApprovePopup(user)}
      className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      <FaCheckCircle className="h-5 w-5 mr-2" />
      <span className="hidden sm:inline">Approve</span>
    </button>
    <button
      onClick={() => handleReject(user.id)}
      className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      <FaTimesCircle className="h-5 w-5 mr-2" />
      <span className="hidden sm:inline">Reject</span>
    </button>
  </div>
</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <ApproveUserPopup user={selectedUser} onClose={closeApprovePopup} />
      )}
    </div>
  );
};

export default WaitingListComp;
