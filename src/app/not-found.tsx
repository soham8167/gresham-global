import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">

      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/images/logo/logo.png"
          alt="Gresham Global Logo"
          width={200}
          height={80}
          className="h-14 w-auto mx-auto"
        />
      </div>

      {/* 404 */}
      <h1 className="text-8xl sm:text-9xl font-extrabold text-red-600 leading-none mb-4">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        Page Not Found
      </h2>
      <p className="text-gray-500 text-base sm:text-lg max-w-md mb-10">
        The page you are looking for does not exist or has been moved.
      </p>

      {/* Back home button */}
      <Link
        href="/"
        className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-8 py-3 rounded-lg transition-colors duration-300"
      >
        Back to Home
      </Link>

    </main>
  );
}