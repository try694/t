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

// Custom confirmation toast helper using React Toastify.
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

  return (
    <div className="overflow-hidden">
      <table className="min-w-full table-fixed rounded-lg shadow-lg bg-black-gradient border border-gray-700">
        <thead>
          <tr className="bg-gray-900 text-gray-400 border-b border-gray-700">
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">First Name</th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">Last Name</th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">Phone</th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">Country</th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">Metamask Acc</th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">Email</th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">Group</th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">Admin Fee</th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">Introducer Fee</th>
            <th className="p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="p-3 text-white max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">{user.firstname}</td>
              <td className="p-3 text-white max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">{user.lastname}</td>
              <td className="p-3 text-white max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">{user.phone}</td>
              <td className="p-3 text-white max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">{user.country}</td>
              <td className="p-3 text-white max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">{user.metamask}</td>
              <td className="p-3 text-white max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">{user.email}</td>
              <td className="p-3 text-white max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">{user.groupId || "-"}</td>
              <td className="p-3 text-white max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                {user.adminFee != null ? user.adminFee : "-"}
              </td>
              <td className="p-3 text-white max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                {user.introducerFee != null ? user.introducerFee : "-"}
              </td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditPopup(user)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <FaEdit className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <FaTrash className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Delete</span>
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
