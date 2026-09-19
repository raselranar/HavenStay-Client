import Link from "next/link";

export default async function CancelPage({ searchParams }) {
  const sessionParams = await searchParams;
  // keep it forgiving: if no session_id, just show a friendly cancel message

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-4 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-background p-10 shadow-xl shadow-slate-200/40">
        <div className="mb-8 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-red-600">
            Payment cancelled
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Payment was cancelled
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Your payment was not completed. No charges were made. You can try
            again or return to the listings to continue browsing.
          </p>
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-red-100 text-red-700">
              ✕
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Next steps</p>
              <p className="mt-1 text-sm text-slate-600">
                You can retry the booking from the property page, or contact
                support if you think this was an error.
              </p>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-background px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
              Browse properties
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
