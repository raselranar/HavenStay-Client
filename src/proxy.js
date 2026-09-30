import { NextResponse } from "next/server";
import { getUserSession } from "./lib/core/session";

export async function proxy(request) {
  const url = request.nextUrl;
  const session = await getUserSession();
  // if user not logged in
  if (!session) return NextResponse.redirect(new URL("/login", request.url));

  //   if (url.pathname.startsWith("/properties")) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
}
export const config = {
  matcher: ["/properties/:path+", "/dashboard/:path*"],
};
