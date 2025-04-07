"use client";

import React, { useState } from "react";
import ApproveUserPopup from "./ApproveUserPopup";

interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  country: string;
  metamask: string;
  email: string;
  approved: boolean;
}

interface WaitingListCompProps {
  allUsers: IUser[];
}

const WaitingListComp: React.FC<WaitingListCompProps> = ({ allUsers }) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>(allUsers);

  const openApprovePopup = (user: IUser) => {
    setSelectedUser(user);
  };

  const closeApprovePopup = () => {
    setSelectedUser(null);
    // Optionally re-fetch users or filter local state
    // For example, remove the approved user from local state:
    setUsers(prevUsers => prevUsers.filter(u => !u.approved));
  };

  // Only render pending users (approved: false)
  const pendingUsers = users.filter(u => !u.approved);

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
          {pendingUsers.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-700 hover:bg-gray-800"
            >
              <td className="p-3 text-white">{user.firstname}</td>
              <td className="p-3 text-white">{user.lastname}</td>
              <td className="p-3 text-white">{user.phone}</td>
              <td className="p-3 text-white">{user.country}</td>
              <td className="p-3 text-white">{user.metamask}</td>
              <td className="p-3 text-white">{user.email}</td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => openApprovePopup(user)}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded">
                    Reject
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
