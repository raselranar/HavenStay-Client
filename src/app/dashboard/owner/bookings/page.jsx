import { protectedFetch } from "@/lib/core/server";
import OwnerBookings from "./OwnerBookings";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Booking Requests",
};

const page = async () => {
  const userSession = await getUserSession();
  const ownerId = userSession?.user?.id;
  // Expect backend route to return bookings for owner
  const bookings = await protectedFetch(`/api/owner/bookings/${ownerId}`);


  return <OwnerBookings initialBookings={bookings || []} />;
};

export default page;
