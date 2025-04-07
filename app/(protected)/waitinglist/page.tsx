import { getAllUsers } from "@/actions/waitinglist-action";
import WaitingListComp from "../_components/waitinglistcomp";

export default async function WaitingListPage() {

  const users = await getAllUsers();

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white mb-4">Waiting List</h1>
      <WaitingListComp allUsers={users} />
    </div>
  );
}
