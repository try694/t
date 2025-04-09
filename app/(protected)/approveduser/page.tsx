// app/(protected)/approveduser/page.tsx
"use server";

import ApprovedUsersComp from "../_components/ApprovedUsersComp";

export default async function ApprovedUsersPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl text-green-600 mb-4">Approved Users</h1>
      <ApprovedUsersComp />
    </div>
  );
}
