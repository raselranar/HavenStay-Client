import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-xl w-full bg-background rounded-3xl shadow-lg p-10 text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
          <span className="text-3xl font-bold">!</span>
        </div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">
          Unauthorized
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          You do not have permission to access this page. If you think this is
          an error, please sign in with an account that has the correct access
          rights.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Back to Home
          </Link>
          <Link
            href="/login"
            className="px-5 py-3 rounded-xl bg-primary text-sm font-medium text-white hover:bg-primary/90">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
