"use client";

import React, { useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import EditApprovedUser from "./EditApprovedUser";
import { deleteUserById } from "@/actions/adminActions";
import { IUser } from "@/interface";
import { getApprovedUsers } from "@/actions/waitinglist-action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const groupMapping: Record<number, string> = {
  1: "VIP",
  2: "TRADER 50",
  3: "TRADER 40",
  4: "TRADER 30",
  5: "TRADER 25",
  6: "TRADER 20",
  7: "TRADER 15",
  8: "TRADER 10",
  9: "TRADER 5",
  10: "ROBOTS",
  11: "WORKERS",
  12: "HIGH",
  13: "MEDIUM",
  14: "LOW",
};


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

const ApprovedUsersComp = () => {
  const { data: users, mutate } = useSWR<IUser[]>("/approveduser", getApprovedUsers);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const openEditPopup = (user: IUser) => setSelectedUser(user);

  const handleDelete = async (userId: string) => {
    const confirmed = await confirmToast("Are you sure you want to delete this user?");
    if (confirmed) {
      const response = await deleteUserById(userId);
      if (response.error) {
        toast.error(response.error, { autoClose: 2000 });
      } else {
        toast.success("User deleted successfully!", { autoClose: 2000 });
        mutate();
      }
    } else {
      toast.info("Deletion cancelled.", { autoClose: 2000 });
    }
  };

  // Returns the group name based on the fetched group id.
  const getGroupName = (groupId?: number | string | null): string => {
    if (!groupId) return "-";
    // Convert to number if it's a string.
    const id = typeof groupId === "string" ? parseInt(groupId, 10) : groupId;
    return groupMapping[id] || "Unknown Group";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed rounded-lg shadow-lg bg-black-gradient border border-gray-700">
        <thead>
          <tr className="bg-gray-900 text-gray-400 border-b border-gray-700">
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
              First Name
            </th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
              Last Name
            </th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
              Phone
            </th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
              Country
            </th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
              Metamask Acc
            </th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
              Email
            </th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
              Group
            </th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="p-3 text-gray-200 max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                {user.firstname}
              </td>
              <td className="p-3 text-gray-200 max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                {user.lastname}
              </td>
              <td className="p-3 text-gray-200 max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                {user.phone}
              </td>
              <td className="p-3 text-gray-200 max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                {user.country}
              </td>
              <td className="p-3 text-gray-200 max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                {user.metamask}
              </td>
              <td className="p-3 text-gray-200 max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                {user.email}
              </td>
              <td className="p-3 text-gray-200 max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                {getGroupName(user.groupId)}
              </td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditPopup(user)}
                    className="p-2 text-blue-500 rounded-full transition-colors duration-200"
                    aria-label="Edit"
                  >
                    <FaEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 text-red-500 rounded-full transition-colors duration-200"
                    aria-label="Delete"
                  >
                    <FaTrash className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <EditApprovedUser 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)}
          mutate={mutate as unknown as KeyedMutator<IUser[]>}
        />
      )}
    </div>
  );
};

export default ApprovedUsersComp;
