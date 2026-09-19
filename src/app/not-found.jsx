export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-xl w-full bg-background rounded-2xl shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Page not found</h1>
        <p className="text-sm text-gray-500 mb-6">We couldn’t find the page you were looking for.</p>
        <div className="flex items-center justify-center gap-3">
          <a href="/" className="px-4 py-2 rounded-lg border text-sm text-gray-700">Go home</a>
        </div>
      </div>
    </main>
  );
}
