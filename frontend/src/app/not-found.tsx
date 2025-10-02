import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center flex-col bg-white">
      <h1 className="text-4xl font-bold text-green-600">Oops!</h1>
      <p className="mt-2 text-green-600 text-lg">Page not found</p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
