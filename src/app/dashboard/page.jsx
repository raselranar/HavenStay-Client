import { getUserRole } from "@/lib/core/session";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const role = await getUserRole();

  const dashboardUrl = `/dashboard/${role.toLowerCase()}`;

  redirect(dashboardUrl); // Redirect to admin or user dashboard based on role
};
export default Dashboard;
