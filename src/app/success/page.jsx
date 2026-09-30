import { protectedFetch, serverMutate } from "@/lib/core/server";
import { stripe } from "@/lib/stripe";
import { line } from "better-auth/types";
import Link from "next/link";

export default async function SuccessPage({ searchParams }) {
  const sessionParams = await searchParams;
  if (!sessionParams?.session_id) {
    throw new Error("No session id found");
  }

  const session = await stripe.checkout.sessions.retrieve(
    sessionParams?.session_id,
    { expand: ["payment_intent", "line_items"] },
  );

  const booking = session?.metadata;


  const bookingsData = await protectedFetch(
    "/api/properties/bookings?transactionId=" + session.payment_intent.id,
  );

  if (!bookingsData || bookingsData.length === 0) {

    await serverMutate("/api/properties/bookings", "POST", {
      ...booking,
      ownerInfo: JSON.parse(booking.ownerInfo),
      bookingStatus: "pending",
      transactionId: session.payment_intent.id,
      paymentStatus: session.payment_status,
    });
  }


  return (
    <main className="min-h-screen bg-slate-50 py-20 px-4 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-background p-3 shadow-xl shadow-slate-200/40">
        <div className="mb-8 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-indigo-600">
            Booking received
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Thank you — your payment was successful
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            We received your payment for{" "}
            <strong className="text-slate-900">{booking.title}</strong>. A
            booking confirmation will be sent to your email shortly.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Booking summary
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Below are the details for your booking.
              </p>
            </div>
          </div>

          <div className="">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs text-slate-500">Property</p>
                <p className="font-medium text-slate-900">{booking.title}</p>
                <p className="mt-1 text-xs text-slate-500 break-all">
                  ID: {booking.propertyId}
                </p>
              </div>

              <div className="overflow-hidden">
                <p className="text-xs text-slate-500">Tenant</p>
                <p className="font-medium text-slate-900 text-wrap  ">
                  User ID: <br className="sm:hidden" /> {booking.userId}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Contact: {booking.contactNumber}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Move-in date</p>
                <p className="font-medium text-slate-900">
                  {booking.moveInDate}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Rent</p>
                <p className="font-medium text-slate-900">${booking.rent}</p>
              </div>

              {/* <div>
                <p className="text-xs text-slate-500">Payment status</p>
                <p className="font-medium text-slate-900">
                  {booking.paymentStatus}
                </p>
              </div> */}

              {/* <div>
                <p className="text-xs text-slate-500">Booking status</p>
                <p className="font-medium text-slate-900">
                  {booking.bookingStatus}
                </p>
              </div> */}
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/dashboard/tenant/my-bookings"
              className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-background px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
              View your bookings
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              Return home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
