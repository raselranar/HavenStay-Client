import { protectedFetch } from "@/lib/core/server";
import { timeFormat } from "@/lib/utils";

export const metadata = {
  title: "My Bookings",
};

const MyBookingPage = async () => {
  const bookings = (await protectedFetch("/api/properties/bookings/tenant")) || [];
  const hasBookings = Array.isArray(bookings) && bookings.length > 0;

  return (
    <div className="bg-background border border-gray-100 rounded-2xl shadow-xs p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
          My Bookings
        </h2>
      </div>

      {!hasBookings ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 py-14 text-center">
          <p className="text-base font-semibold text-gray-700">
            No bookings yet
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Your confirmed stays and reservation history will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                <th className="py-3 px-4">Property Name</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount Paid</th>
                <th className="py-3 px-4 text-center">Payment Status</th>
                <th className="py-3 px-4 text-center">Booking Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs font-medium text-gray-700">
              {bookings.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    {row.title}
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">
                    {timeFormat(row.createdAt)}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-900">
                    {row.rent}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2.5 py-1 capitalize font-bold ${row?.paymentStatus?.toLowerCase() === "approved"
                        ? " text-emerald-600 border "
                        : row.paymentStatus === "pending"
                          ? " text-amber-600 "
                          : " text-red-600 "
                        }`}>
                      {row.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`capitalize px-2.5 py-1 ${row.bookingStatus?.toLowerCase() === "approved"
                        ? " text-emerald-600 "
                        : row.bookingStatus === "pending"
                          ? " text-amber-600 "
                          : " text-red-600 "
                        }`}>
                      {row.bookingStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default MyBookingPage;
