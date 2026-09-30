import { protectedFetch } from "@/lib/core/server";
import AllUsersPage from "./AllUsersPage";

export const metadata = {
  title: "All Users",
};
const page = async () => {
  const users = await protectedFetch("/api/admin/users");
  console.log({ users });
  return <AllUsersPage initialUsers={users} />;
};
export default page;
