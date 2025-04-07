// ApprovedUsersComp.tsx
"use client";

import React, { useState } from "react";
import EditApprovedUser from "./EditApprovedUser";
import { deleteUserById } from "@/actions/adminActions";
import { IUser } from "@/interface";


interface ApprovedUsersCompProps {
  allUsers: IUser[];
}

const ApprovedUsersComp: React.FC<ApprovedUsersCompProps> = ({ allUsers }) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>(allUsers);

  const openEditPopup = (user: IUser) => {
    setSelectedUser(user);
  };

  const closeEditPopup = () => {
    setSelectedUser(null);
    // Optionally re-fetch or update state
  };

  const handleDelete = async (userId: string) => {
    const response = await deleteUserById(userId);
    if (!response.error) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } else {
      console.error(response.error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-lg shadow-lg bg-black-gradient border border-gray-700">
        <thead>
          <tr className="bg-gray-900 text-white border-b border-gray-700">
            <th className="p-3 text-left">First Name</th>
            <th className="p-3 text-left">Last Name</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Country</th>
            <th className="p-3 text-left">Metamask Acc</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="p-3 text-white">{user.firstname}</td>
              <td className="p-3 text-white">{user.lastname}</td>
              <td className="p-3 text-white">{user.phone}</td>
              <td className="p-3 text-white">{user.country}</td>
              <td className="p-3 text-white">{user.metamask}</td>
              <td className="p-3 text-white">{user.email}</td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditPopup(user)}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <EditApprovedUser user={selectedUser} onClose={closeEditPopup} />
      )}
    </div>
  );
};

export default ApprovedUsersComp;
