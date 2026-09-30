import { protectedFetch } from "@/lib/core/server";
import MyPropertiesPage from "./MyProperties";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "My Properties",
};

const page = async () => {
  const userSession = await getUserSession();
  const ownerProperties = await protectedFetch(
    `/api/owner/properties/${userSession?.user?.id}`,
  );

  return <MyPropertiesPage ownerProperties={ownerProperties} />;
};
export default page;
