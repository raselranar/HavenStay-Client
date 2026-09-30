import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
   
  return session;
};

export const getUserRole = async () => {
  const session = await getUserSession();
  return session?.user?.role || null;
};

export const getUserToken = async () => {
  const result = await auth.api.getToken({
    headers: await headers(),
  });
  return result?.token || null;
};

export const authHeaders = async () => {
  const token = await getUserToken();
  const header = token ? { authorization: `Bearer ${token}` } : {};
  return header;
};
