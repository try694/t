"use server";
import { getApprovedUsers } from "@/actions/waitinglist-action";
import ApprovedUsersComp from "../_components/ApprovedUsersComp";

export default async function ApprovedUsersPage() {
  const users = await getApprovedUsers();

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white mb-4">Approved Users</h1>
      <ApprovedUsersComp allUsers={users} />
    </div>
  );
}
