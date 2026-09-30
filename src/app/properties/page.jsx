import { protectedFetch, serverFetch } from "@/lib/core/server";
import PropertiesPage from "./PropertiesPage";

const page = async ({ searchParams }) => {
  const searchQuery = await searchParams;
  const query = new URLSearchParams(searchQuery).toString();
  const properties = await serverFetch(`/api/properties?${query}`);

  return <PropertiesPage properties={properties} filter={searchQuery} />;
};
export default page;
