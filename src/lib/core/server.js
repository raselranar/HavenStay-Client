"use server";
import axios from "axios";
import { redirect } from "next/navigation";
import { authHeaders, getUserSession } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const protectedFetch = async (path) => {
  const session = await getUserSession();
  const url = `${baseUrl}${path}`;
  if (!session) {
    redirect("/login");
  }
  try {
    const response = await axios.get(url, {
      headers: await authHeaders(),
      params:{
        role:session?.user?.role
      }
    });

    return response.data;
  } catch (err) {
    console.log(`protectedFetch failed for ${path}:`, err);
    return null;
  }
};
export const serverFetch = async (path) => {
  const url = `${baseUrl}${path}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const serverMutate = async (path, method = "POST", data = {}) => {
  const url = `${baseUrl}${path}`;

  try {
    const response = await axios({
      method,
      url,
      data,
      headers: await authHeaders(),
    });
    return response.data;
  } catch (err) {
    return null;
  }
};
